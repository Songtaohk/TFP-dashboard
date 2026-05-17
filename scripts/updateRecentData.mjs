import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "data", "tfpDashboard.ts");
const defaultInputPath = path.join(root, "data", "recent-official-updates.json");
const inputPath = path.resolve(process.argv[2] ?? defaultInputPath);
const years = Array.from({ length: 28 }, (_, index) => String(1999 + index));
const publicEconomies = new Set(["us", "eu", "jp", "kr", "in"]);
const publicTfpEconomies = new Set(["us", "cn", "jp", "kr", "tw", "in"]);
const autoRefreshEnabled = !process.argv.includes("--manual-only");
const currentYear = new Date().getFullYear();
const lastDashboardYear = Number(years.at(-1));
const refreshEndYear = Math.min(currentYear, lastDashboardYear);
const fredFxSeries = {
  cny: "DEXCHUS",
  eur: "DEXUSEU",
  jpy: "DEXJPUS",
  krw: "DEXKOUS",
  twd: "DEXTAUS",
  inr: "DEXINUS",
};
const fredNominal10YSeries = {
  us: "GS10",
  eu: "IRLTLT01EZM156N",
  jp: "IRLTLT01JPM156N",
  kr: "IRLTLT01KRM156N",
  in: "INDIRLTLT01STM",
};
const worldBankCpiCountries = {
  us: "USA",
  eu: "EMU",
  cn: "CHN",
  jp: "JPN",
  kr: "KOR",
  in: "IND",
};

const readJson = (filePath) => (fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf8")) : { items: [] });
const formatNumber = (value) => (value === null ? null : Number(Number(value).toFixed(6)));
const isSameValue = (left, right) => {
  if (left === null || right === null) return left === right;
  return Math.abs(Number(left) - Number(right)) < 0.000001;
};

const extractConstExpression = (source, name, suffixPattern) => {
  const pattern = new RegExp(`const ${name}[^=]*= ([\\s\\S]*?)${suffixPattern};`);
  const match = source.match(pattern);
  if (!match) throw new Error(`Cannot find const ${name}`);
  return match[1];
};

const replaceConstExpression = (source, name, suffixPattern, expression) =>
  source.replace(new RegExp(`(const ${name}[^=]*= )[\\s\\S]*?(${suffixPattern};)`), `$1${expression}$2`);

const parseObjectExpression = (expression) => Function(`"use strict"; return (${expression});`)();

const updateArray = (series, year, value) => {
  const index = years.indexOf(String(year));
  if (index === -1) throw new Error(`Year ${year} is outside the dashboard range`);
  const nextValue = formatNumber(value);
  const previous = series[index] ?? null;
  if (isSameValue(previous, nextValue)) return false;
  series[index] = nextValue;
  return true;
};

const applyUpdate = (state, item) => {
  const metric = item.metric;
  const year = Number(item.year);
  const isTfp = metric === "tfp.rtfpna" || metric === "tfp.ctfp";
  const earliestRefreshYear = isTfp ? 2024 : 2025;

  if (year < earliestRefreshYear) return null;
  if (!Number.isFinite(Number(item.value)) && item.value !== null) throw new Error(`Invalid value for ${metric} ${year}`);

  if (metric === "tfp.rtfpna") {
    if (!publicTfpEconomies.has(item.economy) && item.economy !== "eu") throw new Error(`Unsupported TFP economy: ${item.economy}`);
    const series = item.economy === "eu" ? state.germanyTfpIndex : state.publicCountryData.tfp[item.economy];
    return updateArray(series, year, item.value) ? (item.economy === "eu" ? "germanyTfpIndex" : "publicCountryData") : false;
  }

  if (metric === "tfp.ctfp") {
    if (!state.pwtCtfpIndex[item.economy]) throw new Error(`Unsupported ctfp economy: ${item.economy}`);
    return updateArray(state.pwtCtfpIndex[item.economy], year, item.value) ? "pwtCtfpIndex" : false;
  }

  if (metric === "cpi") {
    if (item.economy === "cn") return updateArray(state.chinaCpiInflation, year, item.value) ? "chinaCpiInflation" : false;
    if (item.economy === "tw") return updateArray(state.taiwanCpiInflation, year, item.value) ? "taiwanCpiInflation" : false;
    if (!publicEconomies.has(item.economy)) throw new Error(`Unsupported CPI economy: ${item.economy}`);
    return updateArray(state.publicCountryData.cpi[item.economy], year, item.value) ? "publicCountryData" : false;
  }

  if (metric === "nominal10y") {
    if (item.economy === "cn") return updateArray(state.chinaNominal10Y, year, item.value) ? "chinaNominal10Y" : false;
    if (item.economy === "tw") return updateArray(state.taiwanNominal10Y, year, item.value) ? "taiwanNominal10Y" : false;
    if (!publicEconomies.has(item.economy)) throw new Error(`Unsupported 10Y economy: ${item.economy}`);
    return updateArray(state.publicCountryData.nominal[item.economy], year, item.value) ? "publicCountryData" : false;
  }

  if (metric === "fx") {
    if (!state.officialFx[item.currency]) throw new Error(`Unsupported FX currency: ${item.currency}`);
    return updateArray(state.officialFx[item.currency], year, item.value) ? "officialFx" : false;
  }

  throw new Error(`Unsupported metric: ${metric}`);
};

const serializeObject = (value) => JSON.stringify(value);
const serializeArray = (value) => JSON.stringify(value);
const updateLatestLog = (source, runDate, changes) => {
  const entries = changes.map((item) => ({
    date: runDate,
    scope: item.scope,
    detail: item.detail,
  }));
  return source.replace(
    /export const latestRawDataUpdates: LatestUpdate\[] = [\s\S]*?;/,
    `export const latestRawDataUpdates: LatestUpdate[] = ${JSON.stringify(entries, null, 2)};`,
  );
};

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: {
      "user-agent": "tfp-dashboard-data-refresh/1.0",
      accept: "text/csv,text/plain,application/json,text/html,*/*",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
};

const parseCsvLine = (line) => {
  const fields = [];
  let current = "";
  let quoted = false;

  for (const char of line) {
    if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields.map((field) => field.trim());
};

const annualAverage = (observations, startYear) => {
  const buckets = new Map();

  for (const { date, value } of observations) {
    const year = Number(date.slice(0, 4));
    if (year < startYear || year > refreshEndYear || !Number.isFinite(value)) continue;
    const bucket = buckets.get(year) ?? { sum: 0, count: 0 };
    bucket.sum += value;
    bucket.count += 1;
    buckets.set(year, bucket);
  }

  return [...buckets.entries()]
    .filter(([, bucket]) => bucket.count > 0)
    .map(([year, bucket]) => ({ year, value: Number((bucket.sum / bucket.count).toFixed(4)) }));
};

const fetchFredAnnualAverages = async (seriesId, startYear) => {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(seriesId)}`;
  const csv = await fetchText(url);
  const lines = csv.trim().split(/\r?\n/);
  const observations = lines.slice(1).map((line) => {
    const [date, rawValue] = parseCsvLine(line);
    const value = rawValue === "." || rawValue === "" ? Number.NaN : Number(rawValue);
    return { date, value };
  });
  return annualAverage(observations, startYear);
};

const fetchWorldBankCpi = async (countryCode, startYear) => {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100&date=${startYear}:${refreshEndYear}`;
  const payload = JSON.parse(await fetchText(url));
  const rows = Array.isArray(payload) ? payload[1] ?? [] : [];

  return rows
    .map((row) => ({ year: Number(row.date), value: row.value === null ? null : Number(Number(row.value).toFixed(4)) }))
    .filter((row) => row.year >= startYear && row.year <= refreshEndYear && row.value !== null && Number.isFinite(row.value));
};

const inspectPwtCoverage = async () => {
  const page = await fetchText("https://www.rug.nl/ggdc/productivity/pwt/?lang=en");
  const version = page.match(/PWT version ([0-9.]+)/i)?.[1] ?? "unknown";
  const endYear = Number(page.match(/between\s+\d{4}\s+and\s+(\d{4})/i)?.[1] ?? 0);
  return { version, endYear };
};

const collectAutomaticUpdates = async () => {
  const items = [];
  const warnings = [];

  const runSource = async (label, task) => {
    try {
      await task();
    } catch (error) {
      warnings.push(`${label}: ${error.message}`);
    }
  };

  await runSource("PWT coverage check", async () => {
    const pwt = await inspectPwtCoverage();
    if (pwt.endYear > 2023) {
      warnings.push(`PWT ${pwt.version} reports coverage through ${pwt.endYear}; automatic XLSX parsing is not enabled yet, so TFP values were not changed.`);
    }
  });

  for (const [currency, seriesId] of Object.entries(fredFxSeries)) {
    await runSource(`FRED FX ${currency.toUpperCase()} ${seriesId}`, async () => {
      const rows = await fetchFredAnnualAverages(seriesId, 2025);
      for (const row of rows) {
        items.push({
          metric: "fx",
          currency,
          year: row.year,
          value: row.value,
          source: `FRED ${seriesId} annual average`,
          status: row.year === currentYear ? "partial-year official source" : "official",
        });
      }
    });
  }

  for (const [economy, seriesId] of Object.entries(fredNominal10YSeries)) {
    await runSource(`FRED 10Y ${economy.toUpperCase()} ${seriesId}`, async () => {
      const rows = await fetchFredAnnualAverages(seriesId, 2025);
      for (const row of rows) {
        items.push({
          metric: "nominal10y",
          economy,
          year: row.year,
          value: row.value,
          source: `FRED ${seriesId} annual average`,
          status: row.year === currentYear ? "partial-year official source" : "official",
        });
      }
    });
  }

  for (const [economy, countryCode] of Object.entries(worldBankCpiCountries)) {
    await runSource(`World Bank CPI ${economy.toUpperCase()} ${countryCode}`, async () => {
      const rows = await fetchWorldBankCpi(countryCode, 2025);
      for (const row of rows) {
        items.push({
          metric: "cpi",
          economy,
          year: row.year,
          value: row.value,
          source: `World Bank FP.CPI.TOTL.ZG ${countryCode}`,
          status: "official",
        });
      }
    });
  }

  return { items, warnings };
};

let source = fs.readFileSync(sourcePath, "utf8");
const input = readJson(inputPath);
const runDate = input.runDate ?? new Date().toISOString().slice(0, 10);

const state = {
  publicCountryData: JSON.parse(extractConstExpression(source, "publicCountryData", " as const")),
  officialFx: parseObjectExpression(extractConstExpression(source, "officialFx", " as const")),
  pwtCtfpIndex: parseObjectExpression(extractConstExpression(source, "pwtCtfpIndex", "")),
  germanyTfpIndex: parseObjectExpression(extractConstExpression(source, "germanyTfpIndex", "")),
  chinaNominal10Y: parseObjectExpression(extractConstExpression(source, "chinaNominal10Y", "")),
  chinaCpiInflation: parseObjectExpression(extractConstExpression(source, "chinaCpiInflation", "")),
  taiwanNominal10Y: parseObjectExpression(extractConstExpression(source, "taiwanNominal10Y", "")),
  taiwanCpiInflation: parseObjectExpression(extractConstExpression(source, "taiwanCpiInflation", "")),
};

const changes = [];
const warnings = [];
const dirtyConstants = new Set();
const automatic = autoRefreshEnabled ? await collectAutomaticUpdates() : { items: [], warnings: [] };
warnings.push(...automatic.warnings);

for (const item of [...automatic.items, ...(input.items ?? [])]) {
  const changed = applyUpdate(state, item);
  if (!changed) continue;
  dirtyConstants.add(changed);
  const target = item.economy ? item.economy.toUpperCase() : item.currency.toUpperCase();
  changes.push({
    scope: `${target} ${item.metric} ${item.year}`,
    detail: `${item.source ?? "official source"} updated value to ${item.value}${item.status ? ` (${item.status})` : ""}.`,
  });
}

if (dirtyConstants.has("publicCountryData")) source = replaceConstExpression(source, "publicCountryData", " as const", serializeObject(state.publicCountryData));
if (dirtyConstants.has("officialFx")) source = replaceConstExpression(source, "officialFx", " as const", serializeObject(state.officialFx));
if (dirtyConstants.has("pwtCtfpIndex")) source = replaceConstExpression(source, "pwtCtfpIndex", "", serializeObject(state.pwtCtfpIndex));
if (dirtyConstants.has("germanyTfpIndex")) source = replaceConstExpression(source, "germanyTfpIndex", "", serializeArray(state.germanyTfpIndex));
if (dirtyConstants.has("chinaNominal10Y")) source = replaceConstExpression(source, "chinaNominal10Y", "", serializeArray(state.chinaNominal10Y));
if (dirtyConstants.has("chinaCpiInflation")) source = replaceConstExpression(source, "chinaCpiInflation", "", serializeArray(state.chinaCpiInflation));
if (dirtyConstants.has("taiwanNominal10Y")) source = replaceConstExpression(source, "taiwanNominal10Y", "", serializeArray(state.taiwanNominal10Y));
if (dirtyConstants.has("taiwanCpiInflation")) source = replaceConstExpression(source, "taiwanCpiInflation", "", serializeArray(state.taiwanCpiInflation));
source = updateLatestLog(source, runDate, changes);

fs.writeFileSync(sourcePath, source);

if (changes.length === 0) {
  console.log("No raw data updates were applied.");
} else {
  console.log(`Applied ${changes.length} raw data update(s).`);
}
if (warnings.length > 0) {
  console.warn(`Refresh warnings:\n- ${warnings.join("\n- ")}`);
}
