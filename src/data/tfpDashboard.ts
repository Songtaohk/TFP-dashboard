export type Locale = "zh" | "en";
export type RegionKey = "uscn" | "eucn" | "euus";
export type ChartMode = "spread" | "tfp-fx" | "tfp-real";

export const years = Array.from({ length: 28 }, (_, index) => (1999 + index).toString());

export const regionLabels: Record<RegionKey, { zh: string; en: string; fx: string }> = {
  uscn: { zh: "中美 (USD vs CNY)", en: "US-China (USD vs CNY)", fx: "USDCNY" },
  eucn: { zh: "中欧 (EUR vs CNY)", en: "EU-China (EUR vs CNY)", fx: "EURCNY" },
  euus: { zh: "欧美 (EUR vs USD)", en: "EU-US (EUR vs USD)", fx: "EURUSD" },
};

export const dashboardData = {
  fx: {
    uscn: [8.28, 8.28, 8.28, 8.28, 8.28, 8.28, 8.19, 7.97, 7.6, 6.95, 6.83, 6.77, 6.46, 6.31, 6.19, 6.14, 6.29, 6.64, 6.75, 6.62, 6.9, 6.9, 6.45, 6.73, 7.08, 7.02, 6.99, 6.85],
    eucn: [8.82, 7.65, 7.41, 7.82, 9.36, 10.29, 10.19, 10.01, 10.42, 10.21, 9.53, 8.97, 8.99, 8.11, 8.23, 8.16, 6.97, 7.35, 7.63, 7.82, 7.72, 7.88, 7.63, 7.08, 7.65, 7.62, 7.75, 7.95],
    euus: [1.07, 0.92, 0.9, 0.94, 1.13, 1.24, 1.24, 1.26, 1.37, 1.47, 1.39, 1.33, 1.39, 1.28, 1.33, 1.33, 1.11, 1.11, 1.13, 1.18, 1.12, 1.14, 1.18, 1.05, 1.08, 1.09, 1.11, 1.16],
  },
  tfp: {
    uscn: [0.34, 0.33, 0.3, 0.29, 0.27, 0.25, 0.24, 0.17, 0.07, 0.01, -0.01, 0, -0.04, -0.05, -0.06, -0.08, -0.11, -0.13, -0.15, -0.18, -0.2, -0.2, -0.21, -0.23, -0.23, -0.24, -0.25, -0.26],
    euus: [-0.04, -0.03, -0.02, -0.02, -0.03, -0.03, -0.04, -0.02, -0.01, -0.02, -0.04, -0.05, -0.06, -0.08, -0.1, -0.11, -0.12, -0.13, -0.14, -0.15, -0.16, -0.16, -0.16, -0.17, -0.17, -0.18, -0.18, -0.18],
    eucn: [0.29, 0.29, 0.28, 0.26, 0.24, 0.22, 0.2, 0.14, 0.06, 0.02, 0.01, 0, -0.03, -0.03, -0.03, -0.03, -0.05, -0.05, -0.06, -0.07, -0.07, -0.08, -0.08, -0.08, -0.08, -0.08, -0.08, -0.08],
  },
  nomSpread: {
    uscn: [2.15, 2.83, 1.72, 1.21, 0.41, 0.47, 0.99, 1.6, 0.83, 0.26, -0.04, -0.44, -1.02, -1.7, -1.75, -1.26, -1.26, -1.06, -1.27, -0.69, -1.06, -2.06, -1.65, 0.18, 1.21, 2.03, 2.13, 2.67],
    euus: [-1.15, -0.77, -0.22, 0.17, 0.06, -0.17, -0.94, -1.04, -0.41, 0.38, -0.04, -0.47, -0.17, -0.3, -0.78, -1.38, -1.64, -1.71, -2.01, -2.51, -2.39, -1.39, -1.63, -1.77, -1.53, -1.86, -1.85, -2.38],
    eucn: [-3.15, -4.89, -3.22, -3, -0.88, -0.77, -1.04, -1.6, -1.24, -1.02, 0.12, 1.38, 1.36, 2.3, 3.31, 4.02, 4.54, 4.48, 5.29, 5.71, 5.84, 4.84, 4.91, 3.36, 1.85, 1.69, 1.57, 1.52],
  },
  realSpread: {
    uscn: [-1.44, -0.15, -0.41, -1.18, -0.66, 1.69, -0.6, -0.13, 2.78, 2.32, -0.38, 1.22, 1.22, -1.17, -0.61, -0.88, 0.02, -0.32, -1.8, -1.03, 0.03, -0.79, -5.45, -5.82, -2.69, -0.67, 0.43, 1.02],
    euus: [0.44, 0.51, 0.61, 0.36, 1.23, 0.81, 0.55, 0.59, 0.14, 1.62, -0.7, 0.07, 0.69, -0.33, -0.82, -0.66, -1.62, -0.85, -1.58, -1.97, -1.98, -0.66, -0.03, -1.67, -3.33, -1.36, -1.45, -2.43],
    eucn: [-1, -0.45, -0.4, -0.82, -0.57, 2.5, -0.05, 0.46, 2.92, 3.94, -1.08, 1.29, 1.91, -1.5, -1.43, -1.54, -1.6, -1.17, -3.38, -3, -1.95, -1.45, -5.48, -7.49, -6.02, -2.03, -1.02, -1.41],
  },
  euRealRate: [3.9, 3.16, 2.8, 3.38, 2.97, 2.4, 1.45, 2.16, 1.92, 1.44, 2.92, 1.64, 0.31, -0.6, 0.07, 0.26, 0.4, -0.27, -1.38, -1.5, -1.65, -1, -3.28, -6.72, -3.47, -0.15, 0.1, -0.8],
};

export const copy = {
  zh: {
    title: "中美欧宏观资产定价深度看板",
    subtitle: "基于生产力收敛 (TFP) 与实际利差的汇率回归研究 (1999-2026)",
    badge: "V11.0",
    sourceVersion: "TFP-Comp V20.html",
    updated: "UPDATED 2026-05-15",
    tabs: { analysis: "深度分析", explorer: "交互沙盘", rawdata: "数据明细" },
    analysisTitle: "全要素生产率 (TFP) 与汇率均衡范式",
    resultTitle: "结果说明：基本面引力与短期背离分析",
    h1: "TFP 核心含义与对数化",
    p1: "TFP 代表剔除劳动力和资本等要素投入后的“剩余贡献”。它衡量经济体利用资源产生更高价值的能力，涵盖技术革新、管理优化及资源配置效率。",
    p1b: "对数差 (Log Spread) 的意义：通过 ln(TFP_A) - ln(TFP_B) 变换能有效排除经济规模干扰。对数差在数学上近似于百分比效率代差，直接揭示两国在“单位要素生产效能”上的净竞争态势。",
    h2: "数据修正项目说明",
    p2: "为了实现国际间的严谨对比，我们对原始数据进行了四项关键的精算调整：",
    adjustments: [
      ["资本存量标准化 (PIM)", "采用统一的永续盘存法 (PIM) 重新核算各国折旧，确保“资本投入”含义一致。"],
      ["人类资本权重修正", "引入教育报酬溢价，将名义劳动力转化为有效劳动产出，剥离人口规模红利。"],
      ["2010=100 基期化", "消除价格水平噪声，使 20 年间不同经济体的效率提升斜率具备直接可比性。"],
      ["工时投入对齐", "修正法定工时差异。TFP 核心基准被对齐为“单位小时产出”，而非年度总量。"],
    ],
    h3: "对数差结果的深层内涵",
    p3: "对数差揭示了汇率的“基本面地心引力”。当 ln(US)-ln(CN) 在 2025 年达到 -0.26 时，意味着在效率平价框架下，人民币内在价值被严重低估。这种效率领先最终会转化为贸易顺差，产生不可逆的升值拉力。",
    h4: "为何存在基本面偏离？",
    p4: "短期市场定价经常偏离 TFP 基本面，核心干扰来自三个快变量：",
    divergence: [
      ["利率平价压制：", "极端名义利差（中美 +267bps）诱发套利，强行拽离基本面锚点。"],
      ["美元避险溢价：", "全球动荡期美元具有非效率相关的避险溢价。"],
      ["传导时滞效应：", "技术优势转化为汇率反映通常需要 12-18 个月的传导期。"],
    ],
    conclusionTitle: "2026 年回归假说",
    conclusion: "预测：2026 年汇率回归 6.852 标志着 TFP 对数差积累的能量终于击穿了短期利差的阻力。这是价值回归的必然。",
    auditTitle: "数据来源与审计说明",
    auditHistoricalTitle: "1. 历史口径 (1999-2023)",
    auditHistorical: [
      ["TFP:", "Penn World Table (PWT) 11.0 rtfpna 序列。"],
      ["利率/通胀:", "美国源自 FRED，中国源自 NBS，欧洲源自 ECB。"],
      ["汇率:", "年度均值基于 IMF 国际收支平衡表记录。"],
    ],
    auditForecastTitle: "2. 预测依据 (2024-2026)*",
    auditForecast: [
      ["TFP:", "基于 2017-2021 CAGR 趋势外推 (EST)。"],
      ["汇率/利率:", "汇率锚定 2026 YTD 6.8520 实测；10Y 利率采用实测中枢。"],
      ["意义:", "观察利差峰值时期生产力领先的“破发”能力。"],
    ],
    explorerStep1: "第一步：选择对象",
    explorerStep2: "第二步：选择对比",
    modes: { spread: "汇率 vs 名义/实际利差", "tfp-fx": "TFP 对数差 vs 汇率", "tfp-real": "TFP 对数差 vs 实际利差" },
    labels: { tfp: "TFP 对数差", nominal: "名义利差 (%)", real: "实际利差 (%)" },
    table: "数据明细",
    year: "年份",
  },
  en: {
    title: "Macro Asset Pricing & TFP Dashboard",
    subtitle: "Convergence & Real Spread Analysis (1999-2026)",
    badge: "V11.0",
    sourceVersion: "TFP-Comp V20.html",
    updated: "UPDATED 2026-05-15",
    tabs: { analysis: "Deep Analysis", explorer: "Interactive Sandbox", rawdata: "Data Matrix" },
    analysisTitle: "TFP & FX Equilibrium Paradigm",
    resultTitle: "Analysis: Gravity vs. Noise",
    h1: "Definition & Log Logic",
    p1: "TFP measures value generation beyond raw inputs. It captures an economy's ability to create higher value through technology, management, and allocation efficiency.",
    p1b: "Log spreads reveal net competitive advantages. The ln(TFP_A) - ln(TFP_B) transform reduces scale noise and approximates the percentage gap in unit factor productivity.",
    h2: "Adjustment Methodology",
    p2: "For cross-country rigor, four adjustments were made:",
    adjustments: [
      ["Capital Standard (PIM)", "Uniform depreciation is applied through the PIM method."],
      ["Human Capital Weighting", "Nominal labor is converted into effective output with education return premiums."],
      ["2010=100 Normalization", "Price-level noise is reduced to focus on post-crisis efficiency slopes."],
      ["Hours Alignment", "The benchmark is strict output per hour rather than annual output alone."],
    ],
    h3: "Result Implications",
    p3: "Log spreads reveal fundamental gravity. Negative spreads imply undervaluation versus productivity parity and can turn efficiency leadership into appreciation pressure through trade flows.",
    h4: "Why Do Fundamental Deviations Occur?",
    p4: "Exchange rates can deviate from TFP because fast variables interfere with the productivity anchor:",
    divergence: [
      ["IRP Suppression:", "Arbitrage can override productivity when rate gaps are extreme."],
      ["Safe Haven Premium:", "The dollar can carry non-productivity reserve-currency premiums."],
      ["Transmission Lag:", "Efficiency gains can take 12 to 18 months to reach trade flows and FX pricing."],
    ],
    conclusionTitle: "2026 Hypothesis",
    conclusion: "USDCNY at 6.852 marks productivity overcoming rate differentials. It is value breaking through short-term noise.",
    auditTitle: "Data Source & Audit",
    auditHistoricalTitle: "1. Historical (1999-2023)",
    auditHistorical: [
      ["TFP:", "Penn World Table (PWT) 11.0 rtfpna series."],
      ["Yields / Inflation:", "FRED, NBS, and ECB."],
      ["FX:", "IMF annual records."],
    ],
    auditForecastTitle: "2. Projections (2024-2026)*",
    auditForecast: [
      ["TFP:", "Extrapolated via 2017-2021 CAGR."],
      ["FX / Rates:", "Anchored to 2026 YTD 6.8520 and observed 10Y centers."],
      ["Goal:", "Track the breakout capacity of productivity leadership."],
    ],
    explorerStep1: "Step 1: Select Region",
    explorerStep2: "Step 2: Comparison Mode",
    modes: { spread: "FX vs Nominal / Real Spread", "tfp-fx": "TFP Log Spread vs FX", "tfp-real": "TFP Log Spread vs Real Spread" },
    labels: { tfp: "TFP Log Spread", nominal: "Nominal Spread (%)", real: "Real Spread (%)" },
    table: "Data Matrix",
    year: "Year",
  },
} satisfies Record<Locale, Record<string, unknown>>;
