import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import { BarChart3, BookOpen, Download, LineChart, Mail, Table2 } from "lucide-react";
import {
  copy,
  dashboardData,
  economyData,
  economyLabels,
  groupBaseEconomies,
  groupLabels,
  hasSpreadData,
  pairGroups,
  pairLabels,
  years,
  type ChartMode,
  type EconomyKey,
  type GroupKey,
  type Locale,
  type PairKey,
  type TfpMode,
} from "./data/tfpDashboard";

type TabId = "analysis" | "explorer" | "rawdata";
type ChartDataset = {
  name: string;
  data: Array<number | null>;
  yAxisIndex: 0 | 1;
  color: string;
  lineStyle?: { type: "dashed" };
  isFx?: boolean;
};
type SelectionKey = PairKey | EconomyKey;

const pairKeySet = new Set<string>(Object.keys(pairLabels));
const economyKeys = Object.keys(economyLabels) as EconomyKey[];
const allPairKeys = Object.values(pairGroups).flat() as PairKey[];
const isPairKey = (value: SelectionKey): value is PairKey => pairKeySet.has(value);

const getAxisBounds = (values: Array<number | null>) => {
  const finiteValues = values.filter((value): value is number => value !== null && Number.isFinite(value));

  if (finiteValues.length === 0) {
    return {};
  }

  const minValue = Math.min(...finiteValues);
  const maxValue = Math.max(...finiteValues);
  const rawRange = maxValue - minValue;
  const fallbackRange = Math.max(Math.abs(maxValue), 1) * 0.2;
  const paddedRange = (rawRange || fallbackRange) * 1.3;
  const center = (minValue + maxValue) / 2;
  const paddedMin = center - paddedRange / 2;
  const paddedMax = center + paddedRange / 2;
  const roughStep = paddedRange / 5;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const niceStep = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;

  return {
    min: Math.floor(paddedMin / niceStep) * niceStep,
    max: Math.ceil(paddedMax / niceStep) * niceStep,
  };
};

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const [group, setGroup] = useState<GroupKey>("usd");
  const [selection, setSelection] = useState<SelectionKey>("us");
  const [chartMode, setChartMode] = useState<ChartMode>("spread");
  const [tfpMode, setTfpMode] = useState<TfpMode>("rtfpna");
  const [rawEconomy, setRawEconomy] = useState<EconomyKey>("us");
  const [rawPair, setRawPair] = useState<PairKey>("usdcny");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const t = copy[locale];
  const selectedPair = isPairKey(selection) ? selection : null;
  const selectedEconomy: EconomyKey = selectedPair ? pairLabels[selectedPair].base : (selection as EconomyKey);
  const effectiveTfpMode: TfpMode = selectedPair ? tfpMode : "rtfpna";

  const chartOptions = useMemo(() => {
    const leftAxisText = locale === "zh" ? "左轴" : "Left axis";
    const rightAxisText = locale === "zh" ? "右轴" : "Right axis";
    const axisName = (side: string, label: string) => `${side}: ${label}`;
    const seriesName = (side: string, label: string) => `${side} · ${label}`;
    const datasets: ChartDataset[] = [];
    const tfpLabel = `${t.labels.tfp} (${t.tfpModes[effectiveTfpMode]})`;
    const leftAxisLabel = selectedPair ? (chartMode === "tfp-real" ? tfpLabel : pairLabels[selectedPair].fx) : t.tfpModes.rtfpna;
    const rightAxisLabel = selectedPair
      ? chartMode === "spread"
        ? `${t.labels.nominal} / ${t.labels.real}`
        : chartMode === "tfp-fx"
          ? tfpLabel
          : t.labels.real
      : `${t.labels.nominalRate} / ${t.labels.realRate}`;
    const axis = {
      type: "value",
      nameTextStyle: { color: "#cbd5e1", fontWeight: 700, padding: [0, 0, 6, 0] },
      splitLine: { lineStyle: { color: "#1e293b" } },
      axisLabel: { color: "#94a3b8" },
    };

    if (!selectedPair) {
      datasets.push(
        { name: seriesName(leftAxisText, t.tfpModes.rtfpna), data: economyData[selectedEconomy].rtfpna, yAxisIndex: 0, color: "#3b82f6" },
        { name: seriesName(rightAxisText, t.labels.nominalRate), data: economyData[selectedEconomy].nominal10y, yAxisIndex: 1, color: "#f59e0b", lineStyle: { type: "dashed" } },
        { name: seriesName(rightAxisText, t.labels.realRate), data: economyData[selectedEconomy].realRate, yAxisIndex: 1, color: "#fb7185" },
      );
    }

    if (selectedPair && chartMode === "spread") {
      datasets.push(
        { name: seriesName(leftAxisText, pairLabels[selectedPair].fx), data: dashboardData.fx[selectedPair], yAxisIndex: 0, color: "#10b981", isFx: true },
        { name: seriesName(rightAxisText, t.labels.nominal), data: dashboardData.nomSpread[selectedPair], yAxisIndex: 1, color: "#f59e0b", lineStyle: { type: "dashed" } },
        { name: seriesName(rightAxisText, t.labels.real), data: dashboardData.realSpread[selectedPair], yAxisIndex: 1, color: "#fb7185" },
      );
    }

    if (selectedPair && chartMode === "tfp-fx") {
      datasets.push(
        { name: seriesName(leftAxisText, pairLabels[selectedPair].fx), data: dashboardData.fx[selectedPair], yAxisIndex: 0, color: "#10b981", isFx: true },
        { name: seriesName(rightAxisText, tfpLabel), data: dashboardData.tfp[effectiveTfpMode][selectedPair], yAxisIndex: 1, color: "#3b82f6" },
      );
    }

    if (selectedPair && chartMode === "tfp-real") {
      datasets.push(
        { name: seriesName(leftAxisText, tfpLabel), data: dashboardData.tfp[effectiveTfpMode][selectedPair], yAxisIndex: 0, color: "#3b82f6" },
        { name: seriesName(rightAxisText, t.labels.real), data: dashboardData.realSpread[selectedPair], yAxisIndex: 1, color: "#fb7185" },
      );
    }

    const leftAxisBounds = getAxisBounds(datasets.filter((item) => item.yAxisIndex === 0).flatMap((item) => item.data));
    const rightAxisBounds = getAxisBounds(datasets.filter((item) => item.yAxisIndex === 1).flatMap((item) => item.data));

    return {
      backgroundColor: "transparent",
      color: datasets.map((item) => item.color),
      tooltip: { trigger: "axis", backgroundColor: "#0f172a", borderColor: "#334155", textStyle: { color: "#f8fafc" } },
      legend: { top: 0, textStyle: { color: "#f1f5f9", fontWeight: 700 } },
      grid: { top: 72, right: 72, bottom: 42, left: 72, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: years,
        axisLabel: { color: "#94a3b8" },
        axisLine: { lineStyle: { color: "#334155" } },
      },
      yAxis: [
        { ...axis, ...leftAxisBounds, scale: true, name: axisName(leftAxisText, leftAxisLabel), position: "left" },
        { ...axis, ...rightAxisBounds, scale: true, name: axisName(rightAxisText, rightAxisLabel), position: "right", splitLine: { show: false } },
      ],
      series: datasets.map((item) => ({
        ...item,
        type: "line",
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: item.isFx ? 4 : 3, ...item.lineStyle },
      })),
    };
  }, [chartMode, effectiveTfpMode, locale, selectedEconomy, selectedPair, t.labels.nominal, t.labels.nominalRate, t.labels.real, t.labels.realRate, t.labels.tfp, t.tfpModes]);

  useEffect(() => {
    if (activeTab !== "explorer" || !chartRef.current) {
      return;
    }

    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption(chartOptions);

    const resize = () => chartInstance.current?.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [activeTab, chartOptions]);

  useEffect(() => {
    if (activeTab === "explorer") {
      chartInstance.current?.setOption(chartOptions, true);
    }
  }, [activeTab, chartOptions]);

  const tableRows = years.map((year, index) => ({
      pair: rawPair,
      year,
      fx: dashboardData.fx[rawPair][index],
      tfpRtfpna: dashboardData.tfp.rtfpna[rawPair][index],
      tfpCtfp: dashboardData.tfp.ctfp[rawPair][index],
      nominal: dashboardData.nomSpread[rawPair][index],
      real: dashboardData.realSpread[rawPair][index],
    }));
  const economyRows = years.map((year, index) => ({
      economy: rawEconomy,
      year,
      rtfpna: economyData[rawEconomy].rtfpna[index],
      ctfp: economyData[rawEconomy].ctfp[index],
      cpi: economyData[rawEconomy].cpi[index],
      nominal10y: economyData[rawEconomy].nominal10y[index],
      realRate: economyData[rawEconomy].realRate[index],
    }));

  const handleExportExcel = () => {
    const format = (value: number | null) => (value === null ? "" : String(value));
    const table = (title: string, headers: string[], rows: Array<Array<string | number | null>>) => `
      <h2>${title}</h2>
      <table border="1">
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell ?? ""}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    `;
    const pairRows = allPairKeys.flatMap((pairKey) =>
      years.map((year, index) => [
        year,
        pairLabels[pairKey].fx,
        format(dashboardData.fx[pairKey][index]),
        format(dashboardData.tfp.rtfpna[pairKey][index]),
        format(dashboardData.tfp.ctfp[pairKey][index]),
        format(dashboardData.nomSpread[pairKey][index]),
        format(dashboardData.realSpread[pairKey][index]),
      ]),
    );
    const rawRows = economyKeys.flatMap((economy) =>
      years.map((year, index) => [
        year,
        economyLabels[economy].currency,
        format(economyData[economy].rtfpna[index]),
        format(economyData[economy].ctfp[index]),
        format(economyData[economy].cpi[index]),
        format(economyData[economy].nominal10y[index]),
        format(economyData[economy].realRate[index]),
      ]),
    );
    const html = `
      <html>
        <head><meta charset="utf-8" /></head>
        <body>
          ${table(t.pairTable, ["Year", "Pair", "FX", "TFP rtfpna spread", "TFP ctfp spread", "Nominal Spread", "Real Spread"], pairRows)}
          ${table(t.economyTable, ["Year", "Economy", "RTFPNA 2010=1", "CTFP USA=1", "CPI", "10Y", "Real Rate"], rawRows)}
        </body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tfp-dashboard-data.xls";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const onGroupChange = (nextGroup: GroupKey) => {
    setGroup(nextGroup);
    setSelection(groupBaseEconomies[nextGroup]);
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="title-block">
            <p className="eyebrow">Global Productivity & FX Valuation · {t.sourceVersion}</p>
          <h1>
            {t.title}
          </h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <div className="header-actions">
          <div className="locale-switch" aria-label="Language">
            <button className={locale === "zh" ? "active" : ""} type="button" onClick={() => setLocale("zh")}>
              中文
            </button>
            <button className={locale === "en" ? "active" : ""} type="button" onClick={() => setLocale("en")}>
              EN
            </button>
          </div>
          <a className="contact-link" href="mailto:songtaozhang@gmail.com">
            <Mail size={16} />
            {t.contact}
          </a>
          <nav className="tabs" aria-label="Dashboard sections">
            {[
              ["analysis", BookOpen, t.tabs.analysis],
              ["explorer", LineChart, t.tabs.explorer],
              ["rawdata", Table2, t.tabs.rawdata],
            ].map(([id, Icon, label]) => (
              <button key={id as string} className={activeTab === id ? "active" : ""} type="button" onClick={() => setActiveTab(id as TabId)}>
                <Icon size={16} />
                {label as string}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {activeTab === "analysis" && (
        <main className="analysis-panel">
          <section className="analysis-overview">
            <p className="analysis-lead">{t.analysisIntro}</p>
            <div className="analysis-section-grid">
              {t.analysisSections.map(([number, title, body]) => (
                <article className="essay-block" key={number}>
                  <h3>
                    <span>{number}</span>
                    {title}
                  </h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="tfp-card-grid">
              {t.tfpCards.map(([title, body]) => (
                <article className="logic-card" key={title}>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeTab === "explorer" && (
        <main className="explorer-panel">
          <aside className="control-panel">
            <label>
              <span>{t.explorerStep1}</span>
              <select value={group} onChange={(event) => onGroupChange(event.target.value as GroupKey)}>
                {(Object.keys(pairGroups) as GroupKey[]).map((key) => (
                  <option key={key} value={key}>
                    {groupLabels[key][locale]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t.explorerStep2}</span>
              <select value={selection} onChange={(event) => setSelection(event.target.value as SelectionKey)}>
                <option value={groupBaseEconomies[group]}>{economyLabels[groupBaseEconomies[group]][locale]}</option>
                {pairGroups[group].map((key) => (
                  <option key={key} value={key}>
                    {pairLabels[key][locale]}
                  </option>
                ))}
              </select>
            </label>
            {selectedPair && (
              <div className="mode-group">
                <span>{pairLabels[selectedPair].fx}</span>
                {(Object.keys(t.modes) as ChartMode[]).map((mode) => (
                  <label className="radio-card" key={mode}>
                    <input type="radio" name="chart-mode" value={mode} checked={chartMode === mode} onChange={() => setChartMode(mode)} />
                    <span>{t.modes[mode]}</span>
                  </label>
                ))}
              </div>
            )}
            {selectedPair ? (
              <div className="mode-group">
                <span>{t.tfpModeTitle}</span>
                {(Object.keys(t.tfpModes) as TfpMode[]).map((mode) => (
                  <label className="radio-card" key={mode}>
                    <input type="radio" name="tfp-mode" value={mode} checked={tfpMode === mode} onChange={() => setTfpMode(mode)} />
                    <span>{t.tfpModes[mode]}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mode-group">
                <span>{t.tfpModeTitle}</span>
                <div className="static-mode">{t.tfpModes.rtfpna}</div>
              </div>
            )}
            {selectedPair && <p className="data-note">{t.tfpModeNote}</p>}
            {selectedPair && !hasSpreadData(selectedPair) && <p className="data-note">{t.missingSpread}</p>}
          </aside>
          <section className="chart-panel" aria-label={t.tabs.explorer}>
            <div ref={chartRef} className="chart-surface" />
          </section>
        </main>
      )}

      {activeTab === "rawdata" && (
        <main className="data-panel">
          <section className="audit-box">
            <h2>{t.auditTitle}</h2>
            <div className="audit-grid">
              <article>
                <h3>{t.auditHistoricalTitle}</h3>
                <ul>
                  {t.auditHistorical.map(([label, body]) => (
                    <li key={label}>
                      <strong>{label}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.auditForecastTitle}</h3>
                <ul>
                  {t.auditForecast.map(([label, body]) => (
                    <li key={label}>
                      <strong>{label}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="source-grid">
              <article>
                <h3>{t.sourceTitle}</h3>
                <ul>
                  {t.sourceRows.map(([label, body]) => (
                    <li key={label}>
                      <strong>{label}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.formulaTitle}</h3>
                <ul>
                  {t.formulaRows.map(([label, body]) => (
                    <li key={label}>
                      <strong>{label}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>{t.tfpMethodTitle}</h3>
                <ul>
                  {t.tfpMethodRows.map(([label, body]) => (
                    <li key={label}>
                      <strong>{label}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
          <div className="data-title">
            <div className="data-title-text">
              <BarChart3 size={18} />
              <h2>{t.economyTable}</h2>
            </div>
            <label className="table-filter">
              <span>{t.countryFilter}</span>
              <select value={rawEconomy} onChange={(event) => setRawEconomy(event.target.value as EconomyKey)}>
                {economyKeys.map((economy) => (
                  <option key={economy} value={economy}>
                    {economyLabels[economy][locale]}
                  </option>
                ))}
              </select>
            </label>
            <button className="export-button" type="button" onClick={handleExportExcel}>
              <Download size={16} />
              {t.exportExcel}
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.year}</th>
                  <th>Economy</th>
                  <th>RTFPNA 2010=1</th>
                  <th>CTFP USA=1</th>
                  <th>CPI (%)</th>
                  <th>{t.labels.nominalRate}</th>
                  <th>{t.labels.realRate}</th>
                </tr>
              </thead>
              <tbody>
                {economyRows.map((row) => (
                  <tr key={`${row.economy}-${row.year}`} className={Number(row.year) >= 2025 ? "estimated-row" : undefined}>
                    <td>{row.year}</td>
                    <td>{economyLabels[row.economy][locale]}</td>
                    <td>{row.rtfpna ?? "—"}</td>
                    <td>{row.ctfp ?? "—"}</td>
                    <td>{row.cpi === null ? "—" : `${row.cpi}%`}</td>
                    <td>{row.nominal10y === null ? "—" : `${row.nominal10y}%`}</td>
                    <td>{row.realRate === null ? "—" : `${row.realRate}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="data-title secondary-title">
            <div className="data-title-text">
              <BarChart3 size={18} />
              <h2>{t.pairTable}</h2>
            </div>
            <label className="table-filter">
              <span>{t.pairFilter}</span>
              <select value={rawPair} onChange={(event) => setRawPair(event.target.value as PairKey)}>
                {allPairKeys.map((pairKey) => (
                  <option key={pairKey} value={pairKey}>
                    {pairLabels[pairKey][locale]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.year}</th>
                  <th>Pair</th>
                  <th>FX</th>
                  <th>TFP Spread rtfpna</th>
                  <th>TFP Spread ctfp</th>
                  <th>Nom Spread</th>
                  <th>{t.labels.real}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={`${row.pair}-${row.year}`} className={Number(row.year) >= 2025 ? "estimated-row" : undefined}>
                    <td>{row.year}</td>
                    <td>{pairLabels[row.pair][locale]}</td>
                    <td>{row.fx ?? "—"}</td>
                    <td>{row.tfpRtfpna ?? "—"}</td>
                    <td>{row.tfpCtfp ?? "—"}</td>
                    <td>{row.nominal === null ? "—" : `${row.nominal}%`}</td>
                    <td>{row.real === null ? "—" : `${row.real}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      <footer>
        {t.badge} Academic Edition | Enhanced Visual Readability | {t.updated}
      </footer>
    </div>
  );
}

export default App;
