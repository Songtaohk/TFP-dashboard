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

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
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
    return updateArray(series, year, item.value);
  }

  if (metric === "tfp.ctfp") {
    if (!state.pwtCtfpIndex[item.economy]) throw new Error(`Unsupported ctfp economy: ${item.economy}`);
    return updateArray(state.pwtCtfpIndex[item.economy], year, item.value);
  }

  if (metric === "cpi") {
    if (item.economy === "cn") return updateArray(state.chinaCpiInflation, year, item.value);
    if (item.economy === "tw") return updateArray(state.taiwanCpiInflation, year, item.value);
    if (!publicEconomies.has(item.economy)) throw new Error(`Unsupported CPI economy: ${item.economy}`);
    return updateArray(state.publicCountryData.cpi[item.economy], year, item.value);
  }

  if (metric === "nominal10y") {
    if (item.economy === "cn") return updateArray(state.chinaNominal10Y, year, item.value);
    if (item.economy === "tw") return updateArray(state.taiwanNominal10Y, year, item.value);
    if (!publicEconomies.has(item.economy)) throw new Error(`Unsupported 10Y economy: ${item.economy}`);
    return updateArray(state.publicCountryData.nominal[item.economy], year, item.value);
  }

  if (metric === "fx") {
    if (!state.officialFx[item.currency]) throw new Error(`Unsupported FX currency: ${item.currency}`);
    return updateArray(state.officialFx[item.currency], year, item.value);
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

for (const item of input.items ?? []) {
  const changed = applyUpdate(state, item);
  if (!changed) continue;
  const target = item.economy ? item.economy.toUpperCase() : item.currency.toUpperCase();
  changes.push({
    scope: `${target} ${item.metric} ${item.year}`,
    detail: `${item.source ?? "official source"} updated value to ${item.value}${item.status ? ` (${item.status})` : ""}.`,
  });
}

source = replaceConstExpression(source, "publicCountryData", " as const", serializeObject(state.publicCountryData));
source = replaceConstExpression(source, "officialFx", " as const", serializeObject(state.officialFx));
source = replaceConstExpression(source, "pwtCtfpIndex", "", serializeObject(state.pwtCtfpIndex));
source = replaceConstExpression(source, "germanyTfpIndex", "", serializeArray(state.germanyTfpIndex));
source = replaceConstExpression(source, "chinaNominal10Y", "", serializeArray(state.chinaNominal10Y));
source = replaceConstExpression(source, "chinaCpiInflation", "", serializeArray(state.chinaCpiInflation));
source = replaceConstExpression(source, "taiwanNominal10Y", "", serializeArray(state.taiwanNominal10Y));
source = replaceConstExpression(source, "taiwanCpiInflation", "", serializeArray(state.taiwanCpiInflation));
source = updateLatestLog(source, runDate, changes);

fs.writeFileSync(sourcePath, source);

if (changes.length === 0) {
  console.log("No raw data updates were applied.");
} else {
  console.log(`Applied ${changes.length} raw data update(s).`);
}
