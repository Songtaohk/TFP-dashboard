import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import { BarChart3, BookOpen, Languages, LineChart, Table2 } from "lucide-react";
import {
  copy,
  dashboardData,
  regionLabels,
  years,
  type ChartMode,
  type Locale,
  type RegionKey,
} from "./data/tfpDashboard";

type TabId = "analysis" | "explorer" | "rawdata";

const tableHeaders = [
  "USDCNY",
  "EURCNY",
  "EURUSD",
  "ln(US)-ln(CN)",
  "ln(EU)-ln(US)",
  "ln(EU)-ln(CN)",
  "EU 10Y Real",
  "Nom(U-C)",
  "Real(U-C)",
  "Nom(E-U)",
  "Real(E-U)",
  "Nom(E-C)",
  "Real(E-C)",
];

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const [region, setRegion] = useState<RegionKey>("uscn");
  const [chartMode, setChartMode] = useState<ChartMode>("spread");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const t = copy[locale];

  const chartOptions = useMemo(() => {
    const datasets = [];
    const axis = {
      type: "value",
      splitLine: { lineStyle: { color: "#1e293b" } },
      axisLabel: { color: "#94a3b8" },
    };

    if (chartMode === "spread") {
      datasets.push(
        { name: regionLabels[region].fx, data: dashboardData.fx[region], yAxisIndex: 0, color: "#10b981" },
        { name: t.labels.nominal, data: dashboardData.nomSpread[region], yAxisIndex: 1, color: "#f59e0b", lineStyle: { type: "dashed" } },
        { name: t.labels.real, data: dashboardData.realSpread[region], yAxisIndex: 1, color: "#fb7185" },
      );
    }

    if (chartMode === "tfp-fx") {
      datasets.push(
        { name: regionLabels[region].fx, data: dashboardData.fx[region], yAxisIndex: 0, color: "#10b981" },
        { name: t.labels.tfp, data: dashboardData.tfp[region], yAxisIndex: 1, color: "#3b82f6" },
      );
    }

    if (chartMode === "tfp-real") {
      datasets.push(
        { name: t.labels.tfp, data: dashboardData.tfp[region], yAxisIndex: 0, color: "#3b82f6" },
        { name: t.labels.real, data: dashboardData.realSpread[region], yAxisIndex: 1, color: "#fb7185" },
      );
    }

    return {
      backgroundColor: "transparent",
      color: datasets.map((item) => item.color),
      tooltip: { trigger: "axis", backgroundColor: "#0f172a", borderColor: "#334155", textStyle: { color: "#f8fafc" } },
      legend: { top: 0, textStyle: { color: "#f1f5f9", fontWeight: 700 } },
      grid: { top: 54, right: 56, bottom: 42, left: 54, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: years,
        axisLabel: { color: "#94a3b8" },
        axisLine: { lineStyle: { color: "#334155" } },
      },
      yAxis: [{ ...axis, position: "left" }, { ...axis, position: "right", splitLine: { show: false } }],
      series: datasets.map((item) => ({
        ...item,
        type: "line",
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: item.name === regionLabels[region].fx ? 4 : 3, ...item.lineStyle },
      })),
    };
  }, [chartMode, locale, region, t.labels.nominal, t.labels.real, t.labels.tfp]);

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
    year,
    values: [
      dashboardData.fx.uscn[index],
      dashboardData.fx.eucn[index],
      dashboardData.fx.euus[index],
      dashboardData.tfp.uscn[index],
      dashboardData.tfp.euus[index],
      dashboardData.tfp.eucn[index],
      `${dashboardData.euRealRate[index]}%`,
      `${dashboardData.nomSpread.uscn[index]}%`,
      `${dashboardData.realSpread.uscn[index]}%`,
      `${dashboardData.nomSpread.euus[index]}%`,
      `${dashboardData.realSpread.euus[index]}%`,
      `${dashboardData.nomSpread.eucn[index]}%`,
      `${dashboardData.realSpread.eucn[index]}%`,
    ],
  }));

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="title-block">
            <p className="eyebrow">Global Productivity & FX Valuation · {t.sourceVersion}</p>
          <h1>
            {t.title} <span>{t.badge}</span>
          </h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <div className="header-actions">
          <button className="language-button" type="button" onClick={() => setLocale(locale === "zh" ? "en" : "zh")}>
            <Languages size={17} />
            English / 中文
          </button>
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
          <section className="analysis-grid">
            <div className="analysis-column">
              <h2 className="section-heading emerald">{t.analysisTitle}</h2>
              <article className="essay-block">
                <h3>
                  <span>01</span>
                  {t.h1}
                </h3>
                <p>{t.p1}</p>
                <p className="emphasis">{t.p1b}</p>
              </article>
              <article className="essay-block">
                <h3>
                  <span>02</span>
                  {t.h2}
                </h3>
                <p>{t.p2}</p>
                <div className="logic-grid">
                  {t.adjustments.map(([title, body]) => (
                    <div className="logic-card" key={title}>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="analysis-column">
              <h2 className="section-heading sky">{t.resultTitle}</h2>
              <article className="essay-block">
                <h3>
                  <span className="sky-text">03</span>
                  {t.h3}
                </h3>
                <p>{t.p3}</p>
              </article>
              <article className="logic-card divergence-card">
                <h3>
                  <span className="sky-text">04</span>
                  {t.h4}
                </h3>
                <p>{t.p4}</p>
                <ul>
                  {t.divergence.map(([title, body]) => (
                    <li key={title}>
                      <strong>{title}</strong> {body}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="conclusion-card">
                <h3>{t.conclusionTitle}</h3>
                <p>{t.conclusion}</p>
              </article>
            </div>
          </section>
        </main>
      )}

      {activeTab === "explorer" && (
        <main className="explorer-panel">
          <aside className="control-panel">
            <label>
              <span>{t.explorerStep1}</span>
              <select value={region} onChange={(event) => setRegion(event.target.value as RegionKey)}>
                {(Object.keys(regionLabels) as RegionKey[]).map((key) => (
                  <option key={key} value={key}>
                    {regionLabels[key][locale]}
                  </option>
                ))}
              </select>
            </label>
            <div className="mode-group">
              <span>{t.explorerStep2}</span>
              {(Object.keys(t.modes) as ChartMode[]).map((mode) => (
                <label className="radio-card" key={mode}>
                  <input type="radio" name="chart-mode" value={mode} checked={chartMode === mode} onChange={() => setChartMode(mode)} />
                  <span>{t.modes[mode]}</span>
                </label>
              ))}
            </div>
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
          </section>
          <div className="data-title">
            <BarChart3 size={18} />
            <h2>{t.table}</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.year}</th>
                  {tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.year} className={Number(row.year) >= 2024 ? "estimated-row" : undefined}>
                    <td>{row.year}</td>
                    {row.values.map((value, index) => (
                      <td key={`${row.year}-${tableHeaders[index]}`}>{value}</td>
                    ))}
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
