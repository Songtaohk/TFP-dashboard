export type Locale = "zh" | "en";
export type EconomyKey = "us" | "eu" | "cn" | "jp" | "kr" | "tw" | "in";
export type PairKey = "usdcny" | "usdjpy" | "usdkrw" | "usdtwd" | "usdinr" | "eurusd" | "eurcny" | "eurjpy" | "jpytwd" | "jpykrw" | "cnyjpy" | "cnytwd" | "cnykrw";
export type GroupKey = "usd" | "eur" | "jpy" | "cny";
export type ChartMode = "spread" | "tfp-fx" | "tfp-real";
export type SeriesValue = number | null;
export type PairSeries = Record<PairKey, SeriesValue[]>;

export const years = Array.from({ length: 28 }, (_, index) => (1999 + index).toString());

export const pairGroups: Record<GroupKey, PairKey[]> = {
  usd: ["usdcny", "usdjpy", "usdkrw", "usdtwd", "usdinr"],
  eur: ["eurusd", "eurcny", "eurjpy"],
  jpy: ["jpytwd", "jpykrw"],
  cny: ["cnyjpy", "cnytwd", "cnykrw"],
};

export const groupLabels: Record<GroupKey, { zh: string; en: string }> = {
  usd: { zh: "USD base", en: "USD base" },
  eur: { zh: "EUR base", en: "EUR base" },
  jpy: { zh: "JPY base", en: "JPY base" },
  cny: { zh: "CNY base", en: "CNY base" },
};

export const pairLabels: Record<PairKey, { zh: string; en: string; fx: string; base: EconomyKey; quote: EconomyKey }> = {
  usdcny: { zh: "USD CNY", en: "USD CNY", fx: "USDCNY", base: "us", quote: "cn" },
  usdjpy: { zh: "USD JPY", en: "USD JPY", fx: "USDJPY", base: "us", quote: "jp" },
  usdkrw: { zh: "USD KRW", en: "USD KRW", fx: "USDKRW", base: "us", quote: "kr" },
  usdtwd: { zh: "USD TWD", en: "USD TWD", fx: "USDTWD", base: "us", quote: "tw" },
  usdinr: { zh: "USD INR", en: "USD INR", fx: "USDINR", base: "us", quote: "in" },
  eurusd: { zh: "EUR USD", en: "EUR USD", fx: "EURUSD", base: "eu", quote: "us" },
  eurcny: { zh: "EUR CNY", en: "EUR CNY", fx: "EURCNY", base: "eu", quote: "cn" },
  eurjpy: { zh: "EUR JPY", en: "EUR JPY", fx: "EURJPY", base: "eu", quote: "jp" },
  jpytwd: { zh: "JPY TWD", en: "JPY TWD", fx: "JPYTWD", base: "jp", quote: "tw" },
  jpykrw: { zh: "JPY KRW", en: "JPY KRW", fx: "JPYKRW", base: "jp", quote: "kr" },
  cnyjpy: { zh: "CNY JPY", en: "CNY JPY", fx: "CNYJPY", base: "cn", quote: "jp" },
  cnytwd: { zh: "CNY TWD", en: "CNY TWD", fx: "CNYTWD", base: "cn", quote: "tw" },
  cnykrw: { zh: "CNY KRW", en: "CNY KRW", fx: "CNYKRW", base: "cn", quote: "kr" },
};

const v20 = {
  fx: {
    usdcny: [8.28, 8.28, 8.28, 8.28, 8.28, 8.28, 8.19, 7.97, 7.6, 6.95, 6.83, 6.77, 6.46, 6.31, 6.19, 6.14, 6.29, 6.64, 6.75, 6.62, 6.9, 6.9, 6.45, 6.73, 7.08, 7.02, 6.99, 6.85],
    eurcny: [8.82, 7.65, 7.41, 7.82, 9.36, 10.29, 10.19, 10.01, 10.42, 10.21, 9.53, 8.97, 8.99, 8.11, 8.23, 8.16, 6.97, 7.35, 7.63, 7.82, 7.72, 7.88, 7.63, 7.08, 7.65, 7.62, 7.75, 7.95],
    eurusd: [1.07, 0.92, 0.9, 0.94, 1.13, 1.24, 1.24, 1.26, 1.37, 1.47, 1.39, 1.33, 1.39, 1.28, 1.33, 1.33, 1.11, 1.11, 1.13, 1.18, 1.12, 1.14, 1.18, 1.05, 1.08, 1.09, 1.11, 1.16],
  },
  tfp: {
    usdcny: [0.34, 0.33, 0.3, 0.29, 0.27, 0.25, 0.24, 0.17, 0.07, 0.01, -0.01, 0, -0.04, -0.05, -0.06, -0.08, -0.11, -0.13, -0.15, -0.18, -0.2, -0.2, -0.21, -0.23, -0.23, -0.24, -0.25, -0.26],
    eurusd: [-0.04, -0.03, -0.02, -0.02, -0.03, -0.03, -0.04, -0.02, -0.01, -0.02, -0.04, -0.05, -0.06, -0.08, -0.1, -0.11, -0.12, -0.13, -0.14, -0.15, -0.16, -0.16, -0.16, -0.17, -0.17, -0.18, -0.18, -0.18],
    eurcny: [0.29, 0.29, 0.28, 0.26, 0.24, 0.22, 0.2, 0.14, 0.06, 0.02, 0.01, 0, -0.03, -0.03, -0.03, -0.03, -0.05, -0.05, -0.06, -0.07, -0.07, -0.08, -0.08, -0.08, -0.08, -0.08, -0.08, -0.08],
  },
  nomSpread: {
    usdcny: [2.15, 2.83, 1.72, 1.21, 0.41, 0.47, 0.99, 1.6, 0.83, 0.26, -0.04, -0.44, -1.02, -1.7, -1.75, -1.26, -1.26, -1.06, -1.27, -0.69, -1.06, -2.06, -1.65, 0.18, 1.21, 2.03, 2.13, 2.67],
    eurusd: [-1.15, -0.77, -0.22, 0.17, 0.06, -0.17, -0.94, -1.04, -0.41, 0.38, -0.04, -0.47, -0.17, -0.3, -0.78, -1.38, -1.64, -1.71, -2.01, -2.51, -2.39, -1.39, -1.63, -1.77, -1.53, -1.86, -1.85, -2.38],
    eurcny: [-3.15, -4.89, -3.22, -3, -0.88, -0.77, -1.04, -1.6, -1.24, -1.02, 0.12, 1.38, 1.36, 2.3, 3.31, 4.02, 4.54, 4.48, 5.29, 5.71, 5.84, 4.84, 4.91, 3.36, 1.85, 1.69, 1.57, 1.52],
  },
  realSpread: {
    usdcny: [-1.44, -0.15, -0.41, -1.18, -0.66, 1.69, -0.6, -0.13, 2.78, 2.32, -0.38, 1.22, 1.22, -1.17, -0.61, -0.88, 0.02, -0.32, -1.8, -1.03, 0.03, -0.79, -5.45, -5.82, -2.69, -0.67, 0.43, 1.02],
    eurusd: [0.44, 0.51, 0.61, 0.36, 1.23, 0.81, 0.55, 0.59, 0.14, 1.62, -0.7, 0.07, 0.69, -0.33, -0.82, -0.66, -1.62, -0.85, -1.58, -1.97, -1.98, -0.66, -0.03, -1.67, -3.33, -1.36, -1.45, -2.43],
    eurcny: [-1, -0.45, -0.4, -0.82, -0.57, 2.5, -0.05, 0.46, 2.92, 3.94, -1.08, 1.29, 1.91, -1.5, -1.43, -1.54, -1.6, -1.17, -3.38, -3, -1.95, -1.45, -5.48, -7.49, -6.02, -2.03, -1.02, -1.41],
  },
};

const publicCountryData = {"fx":{"jpy":[109.8124,104.487,116.4445,120.4227,111.4966,104.4357,106.2955,112.2859,114.6039,99.4444,90.4522,84.0821,76.9379,76.7598,93.8578,101.2833,116.4112,104.4938,107.3559,105.3216,104.0065,101.885,104.7926,126.4028,134.5559,145.0963,143.265,152.3125],"krw":[1148.8073,1096.1007,1237.5622,1202.4092,1146.408,1105.8962,988.3117,921.2868,904.0567,1056.7708,1230.6726,1107.0296,1068.6229,1083.0141,1052.7333,1007.9429,1087.6285,1114.9229,1081.2763,1048.7504,1112.2015,1126.4842,1092.2524,1242.0957,1251.4776,1306.1945,1361.4907,1422.1397],"twd":[31.2077,30.2981,32.3988,33.2131,33.0865,32.2255,31.019,31.3813,31.5959,30.3175,31.8814,30.1699,28.3651,28.4256,28.5428,29.0223,30.528,30.9917,29.1153,28.7441,29.4839,28.1076,26.6521,28.6503,29.8345,30.7584,29.8528,30.6027],"inr":[41.6402,43.6129,45.2298,46.7626,44.8057,43.7062,42.4771,43.6219,40.073,41.73,46.6657,43.5519,44.9658,51.3293,56.2729,58.4246,61.651,64.5841,62.3132,65.2298,67.142,70.7471,70.5358,75.5569,79.0775,80.1443,83.4739,89.2332]},"tfp":{"us":[0.869326,0.87935,0.880456,0.891869,0.907184,0.921985,0.930433,0.928767,0.927742,0.923284,0.925019,0.940476,0.938276,0.939691,0.941934,0.943991,0.948802,0.94841,0.953378,0.958201,0.964266,0.973078,1,0.984038,0.992998,0.99976,1.006568,1.013422],"cn":[0.50186,0.512456,0.524457,0.540571,0.559177,0.58005,0.592121,0.633922,0.700974,0.735487,0.753161,0.759524,0.788436,0.800227,0.811297,0.829218,0.851113,0.872795,0.898877,0.924569,0.946753,0.959374,1,0.995394,1.013726,1.034246,1.055182,1.076541],"jp":[0.977459,0.989585,0.98856,0.990958,0.996456,1.003929,1.011893,1.009513,1.014392,1.001605,0.962928,0.995154,0.99475,1.001465,1.017481,1.010581,1.01847,1.016344,1.021035,1.018081,1.014198,0.985455,1,0.997666,1.004987,1.002337,0.999694,0.997058],"kr":[0.804576,0.818934,0.820868,0.847418,0.851899,0.864474,0.879055,0.890057,0.913276,0.92843,0.92486,0.956678,0.961033,0.956438,0.961221,0.965268,0.962718,0.968788,0.98087,0.993111,0.994751,0.987357,1,0.99736,0.976855,0.976187,0.97552,0.974853],"tw":[0.749409,0.762246,0.759754,0.78018,0.784715,0.797343,0.80934,0.825044,0.849689,0.837121,0.827454,0.882932,0.890066,0.891984,0.896032,0.918737,0.912746,0.914826,0.926828,0.934933,0.945387,0.973304,1,0.989976,0.98693,0.997319,1.007818,1.018427],"in":[0.86283,0.84915,0.842867,0.832587,0.854161,0.871255,0.892505,0.913934,0.924917,0.900211,0.917489,0.941361,0.933406,0.936163,0.941834,0.97175,1.009523,1.051069,1.070467,1.084857,1.035691,0.955576,1,1.000232,1.010531,1.000873,0.991307,0.981833]},"nominal":{"us":[5.6367,6.0292,5.0175,4.6108,4.015,4.2742,4.29,4.7917,4.6292,3.6667,3.2567,3.2142,2.7858,1.8025,2.3508,2.5408,2.1358,1.8417,2.33,2.91,2.1442,0.8942,1.4425,2.9517,3.9575,4.2083,4.2917,4.2275],"jp":[1.749,1.7444,1.319,1.2632,1.0032,1.4927,1.3547,1.7405,1.6655,1.4673,1.3337,1.1483,1.1024,0.8356,0.6897,0.5203,0.35,-0.0662,0.0517,0.065,-0.1104,-0.0054,0.0717,0.2317,0.5625,0.9183,1.5533,2.3025],"kr":[null,7.7633,6.855,6.5867,5.0483,4.7283,4.95,5.1517,5.3508,5.5683,5.1658,4.7733,4.2025,3.4475,3.2781,3.1863,2.3058,1.7474,2.2826,2.5027,1.7023,1.4997,2.0645,3.3635,3.6423,3.2193,2.8923,3.6405],"in":[null,null,null,null,null,null,null,null,null,null,null,null,null,8.2594,8.11,8.5867,7.776,7.2062,6.9239,7.7047,6.997,6.1918,6.2575,7.1924,7.2204,6.976,6.5264,6.7807],"eu":[4.6551,5.4389,5.0273,4.9229,4.1609,4.1408,3.4409,3.8595,4.3317,4.356,4.0286,3.7814,4.308,3.0477,3.0118,2.2813,1.2675,0.9286,1.1707,1.2641,0.5846,0.2136,0.1997,2.0414,3.2651,2.9753,3.1467,3.221]},"cpi":{"us":[2.188,3.3769,2.8262,1.586,2.2701,2.6772,3.3927,3.2259,2.8527,3.8391,-0.3555,1.64,3.1568,2.0693,1.4648,1.6222,0.1186,1.2616,2.1301,2.4426,1.8122,1.2336,4.6979,8.0028,4.1163,2.9495,null,null],"jp":[-0.3413,-0.6766,-0.7401,-0.9235,-0.2565,-0.0086,-0.2829,0.2494,0.06,1.3801,-1.3528,-0.7282,-0.2725,-0.0441,0.335,2.7592,0.7953,-0.1273,0.4842,0.9891,0.4688,-0.025,-0.2334,2.4977,3.2681,2.7385,null,null],"kr":[0.813,2.2592,4.0666,2.7623,3.5149,3.5907,2.7538,2.2423,2.5346,4.6739,2.7565,2.9393,4.026,2.1871,1.3013,1.2748,0.7063,0.9717,1.9443,1.4758,0.383,0.5373,2.4983,5.0895,3.5975,2.3217,null,null],"in":[4.6698,4.0094,3.7793,4.2972,3.8059,3.7673,4.2463,5.7965,6.3729,8.3493,10.8824,11.9894,8.9118,9.479,10.0179,6.6657,4.907,4.9482,3.3282,3.9388,3.7295,6.6234,5.1314,6.699,5.6491,4.953,null,null],"eu":[2.1572,3.1508,3.374,2.4244,2.092,2.2862,2.4877,2.6663,2.5107,4.165,0.8393,1.5311,3.2894,2.6628,1.22,0.1993,-0.0616,0.1833,1.4291,1.7386,1.6305,0.4765,2.5545,8.8337,6.2994,2.4353,null,null]}} as const;

const taiwanNominal10Y: SeriesValue[] = [null, null, null, null, null, null, null, 1.77, 2.35, 2.24, 1.51, 1.37, 1.4, 1.2, 1.46, 1.6, 1.36, 0.87, 1.05, 0.94, 0.72, 0.42, 0.47, 1.21, 1.21, 1.52, 1.46, 1.5];
const taiwanCpiInflation: SeriesValue[] = [0.18, 1.25, 0, -0.2, -0.28, 1.61, 2.31, 0.6, 1.8, 3.53, -0.87, 0.97, 1.42, 1.94, 0.79, 1.19, -0.31, 1.39, 0.62, 1.35, 0.56, -0.24, 1.97, 2.95, 2.49, 2.18, 1.66, null];

const round = (value: SeriesValue, digits = 2): SeriesValue => value === null || Number.isNaN(value) ? null : Number(value.toFixed(digits));
const get = (values: readonly SeriesValue[], index: number) => values[index] ?? null;
const divide = (left: SeriesValue, right: SeriesValue, digits = 2): SeriesValue => left === null || right === null ? null : round(left / right, digits);
const multiply = (left: SeriesValue, right: SeriesValue, digits = 2): SeriesValue => left === null || right === null ? null : round(left * right, digits);
const spread = (base: readonly SeriesValue[], quote: readonly SeriesValue[], index: number): SeriesValue => {
  const left = get(base, index);
  const right = get(quote, index);
  return left === null || right === null ? null : round(left - right, 2);
};
const logSpread = (base: readonly SeriesValue[], quote: readonly SeriesValue[], index: number): SeriesValue => {
  const left = get(base, index);
  const right = get(quote, index);
  return left === null || right === null || left <= 0 || right <= 0 ? null : round(Math.log(left) - Math.log(right), 2);
};

const realRates = Object.fromEntries(
  Object.entries(publicCountryData.nominal).map(([key, nominal]) => [
    key,
    years.map((_, index) => {
      const cpi = publicCountryData.cpi[key as keyof typeof publicCountryData.cpi]?.[index] ?? null;
      const rate = nominal[index] ?? null;
      return rate === null || cpi === null ? null : round(rate - cpi, 2);
    }),
  ]),
) as Record<"us" | "jp" | "kr" | "in" | "eu", SeriesValue[]>;
const taiwanRealRates = years.map((_, index) => {
  const rate = taiwanNominal10Y[index];
  const cpi = taiwanCpiInflation[index];
  return rate === null || cpi === null ? null : round(rate - cpi, 2);
});

const inferredChinaNominal = years.map((_, index) => {
  const us = publicCountryData.nominal.us[index];
  return us === null ? null : round(us - v20.nomSpread.usdcny[index], 2);
});
const inferredChinaReal = years.map((_, index) => {
  const us = realRates.us[index];
  return us === null ? null : round(us - v20.realSpread.usdcny[index], 2);
});

const nominalRates: Record<EconomyKey, SeriesValue[]> = {
  us: [...publicCountryData.nominal.us],
  eu: [...publicCountryData.nominal.eu],
  cn: inferredChinaNominal,
  jp: [...publicCountryData.nominal.jp],
  kr: [...publicCountryData.nominal.kr],
  in: [...publicCountryData.nominal.in],
  tw: [...taiwanNominal10Y],
};
const realRateSeries: Record<EconomyKey, SeriesValue[]> = {
  us: realRates.us,
  eu: realRates.eu,
  cn: inferredChinaReal,
  jp: realRates.jp,
  kr: realRates.kr,
  in: realRates.in,
  tw: taiwanRealRates,
};
const tfpIndex: Record<EconomyKey, SeriesValue[]> = {
  us: [...publicCountryData.tfp.us],
  eu: years.map(() => null),
  cn: [...publicCountryData.tfp.cn],
  jp: [...publicCountryData.tfp.jp],
  kr: [...publicCountryData.tfp.kr],
  tw: [...publicCountryData.tfp.tw],
  in: [...publicCountryData.tfp.in],
};

const deriveFx = (pair: PairKey, index: number): SeriesValue => {
  const usdCny = get(v20.fx.usdcny, index);
  const eurUsd = get(v20.fx.eurusd, index);
  const eurCny = get(v20.fx.eurcny, index);
  const usdJpy = get(publicCountryData.fx.jpy, index);
  const usdKrw = get(publicCountryData.fx.krw, index);
  const usdTwd = get(publicCountryData.fx.twd, index);
  const usdInr = get(publicCountryData.fx.inr, index);
  const direct: Partial<Record<PairKey, SeriesValue>> = { usdcny: usdCny, usdjpy: usdJpy, usdkrw: usdKrw, usdtwd: usdTwd, usdinr: usdInr, eurusd: eurUsd, eurcny: eurCny };
  if (direct[pair] !== undefined) return round(direct[pair] ?? null, pair.startsWith("jpy") ? 4 : 2);
  if (pair === "eurjpy") return multiply(eurUsd, usdJpy, 2);
  if (pair === "jpytwd") return divide(usdTwd, usdJpy, 4);
  if (pair === "jpykrw") return divide(usdKrw, usdJpy, 4);
  if (pair === "cnyjpy") return divide(usdJpy, usdCny, 2);
  if (pair === "cnytwd") return divide(usdTwd, usdCny, 2);
  if (pair === "cnykrw") return divide(usdKrw, usdCny, 2);
  return null;
};

const derivePairSeries = (pair: PairKey): { fx: SeriesValue[]; tfp: SeriesValue[]; nomSpread: SeriesValue[]; realSpread: SeriesValue[] } => {
  if (pair in v20.fx && pair in v20.tfp && pair in v20.nomSpread && pair in v20.realSpread) {
    const key = pair as "usdcny" | "eurusd" | "eurcny";
    return { fx: [...v20.fx[key]], tfp: [...v20.tfp[key]], nomSpread: [...v20.nomSpread[key]], realSpread: [...v20.realSpread[key]] };
  }
  const meta = pairLabels[pair];
  return {
    fx: years.map((_, index) => deriveFx(pair, index)),
    tfp: years.map((_, index) => logSpread(tfpIndex[meta.base], tfpIndex[meta.quote], index)),
    nomSpread: years.map((_, index) => spread(nominalRates[meta.base], nominalRates[meta.quote], index)),
    realSpread: years.map((_, index) => spread(realRateSeries[meta.base], realRateSeries[meta.quote], index)),
  };
};

const pairKeys = Object.values(pairGroups).flat();
export const dashboardData = pairKeys.reduce(
  (accumulator, pair) => {
    const series = derivePairSeries(pair);
    accumulator.fx[pair] = series.fx;
    accumulator.tfp[pair] = series.tfp;
    accumulator.nomSpread[pair] = series.nomSpread;
    accumulator.realSpread[pair] = series.realSpread;
    return accumulator;
  },
  { fx: {} as PairSeries, tfp: {} as PairSeries, nomSpread: {} as PairSeries, realSpread: {} as PairSeries },
);

export const hasSpreadData = (pair: PairKey) => dashboardData.nomSpread[pair].some((value) => value !== null) || dashboardData.realSpread[pair].some((value) => value !== null);

export const copy = {
  zh: {
    title: "中美欧亚宏观资产定价深度看板",
    subtitle: "基于汇率、TFP、名义利差与实际利差的交叉比较 (1999-2026)",
    badge: "V12.1",
    sourceVersion: "FX/TFP Asia Expansion",
    updated: "UPDATED 2026-05-16",
    tabs: { analysis: "深度分析", explorer: "交互沙盘", rawdata: "数据明细" },
    analysisTitle: "全要素生产率 (TFP) 与汇率均衡范式",
    resultTitle: "结果说明：基本面引力与短期背离分析",
    h1: "TFP 核心含义与对数化",
    p1: "TFP 代表剔除劳动力和资本等要素投入后的剩余贡献。它衡量经济体利用资源产生更高价值的能力，涵盖技术革新、管理优化及资源配置效率。",
    p1b: "对数差通过 ln(TFP_A) - ln(TFP_B) 排除规模干扰，近似反映两个经济体之间的百分比效率代差。",
    h2: "亚洲交叉比较扩展",
    p2: "新增 India、Japan、Korea、Taiwan，并按 USD、EUR、JPY、CNY 四个基准分组组织货币对。",
    adjustments: [["USD base", "USD CNY、USDJPY、USDKRW、USDTWD、USDINR。"], ["EUR base", "EURUSD、EURCNY、EURJPY。"], ["JPY base", "JPYTWD、JPYKRW。"], ["CNY base", "CNYJPY、CNYTWD、CNYKRW。"]],
    h3: "交叉货币对的比较逻辑",
    p3: "每个货币对同时展示汇率、TFP 对数差、名义利差和实际利差。原 V20 的 USDCNY、EURUSD、EURCNY 保持原始口径；新增亚洲序列使用公开数据派生。",
    h4: "数据覆盖说明",
    p4: "台湾 CPI 已使用 data.gov.tw / 主计总处月度总指数计算；台湾 10Y 国债收益率使用 TPEx 收益率曲线文件的 10 年期限行。1999-2005 因 TPEx 曲线未覆盖仍为空。",
    divergence: [["汇率：", "USDJPY、USDKRW、USDTWD、USDINR 来自 FRED 年度均值；交叉汇率由三角关系派生。"], ["TFP：", "新增国家/地区使用 Penn World Table 11.0 rtfpna 序列，2024-2026 以 2017-2023 CAGR 外推。"], ["利差：", "名义利差为基准经济体 10Y 减报价经济体 10Y；实际利差为名义利率扣除 CPI 后再相减。"]],
    conclusionTitle: "扩展后的使用方式",
    conclusion: "先选择基准分组，再选择货币对，最后选择汇率/TFP/利差对比模式。",
    auditTitle: "数据来源与审计说明",
    auditHistoricalTitle: "1. 历史口径",
    auditHistorical: [["FX:", "FRED 日度汇率年度均值，交叉汇率由 USD base 派生。"], ["TFP:", "Penn World Table 11.0 rtfpna。"], ["Rates/CPI:", "FRED OECD / World Bank 序列；台湾 CPI 来自 data.gov.tw / 主计总处，台湾 10Y 来自 TPEx。"]],
    auditForecastTitle: "2. 预测/缺口说明",
    auditForecast: [["2024-2026 TFP:", "使用 2017-2023 CAGR 外推。"], ["Taiwan spreads:", "TPEx 10Y 收益率自 2006 年起可用；2026 使用 1-5 月样本，CPI 2026 暂为空。"], ["Existing V20:", "USDCNY、EURUSD、EURCNY 保持原始 V20 数值。"]],
    explorerStep1: "第一步：选择基准分组",
    explorerStep2: "第二步：选择交叉货币对",
    modes: { spread: "汇率 vs 名义/实际利差", "tfp-fx": "TFP 对数差 vs 汇率", "tfp-real": "TFP 对数差 vs 实际利差" },
    labels: { tfp: "TFP 对数差", nominal: "名义利差 (%)", real: "实际利差 (%)" },
    table: "数据明细",
    year: "年份",
    missingSpread: "该货币对缺少完整利差数据，利差曲线留空。",
  },
  en: {
    title: "Macro Asset Pricing & Asia TFP Dashboard",
    subtitle: "Cross-pair FX, TFP, nominal spread and real spread analysis (1999-2026)",
    badge: "V12.1",
    sourceVersion: "FX/TFP Asia Expansion",
    updated: "UPDATED 2026-05-16",
    tabs: { analysis: "Deep Analysis", explorer: "Interactive Sandbox", rawdata: "Data Matrix" },
    analysisTitle: "TFP & FX Equilibrium Paradigm",
    resultTitle: "Analysis: Fundamental Gravity vs. Market Noise",
    h1: "Definition & Log Logic",
    p1: "TFP measures value generation beyond raw labor and capital inputs, capturing technology, management and allocation efficiency.",
    p1b: "The ln(TFP_A) - ln(TFP_B) transformation reduces scale noise and approximates the percentage productivity gap between economies.",
    h2: "Asia Cross-Pair Expansion",
    p2: "India, Japan, Korea and Taiwan are added and organized under USD, EUR, JPY and CNY base groups.",
    adjustments: [["USD base", "USD CNY, USDJPY, USDKRW, USDTWD, USDINR."], ["EUR base", "EURUSD, EURCNY, EURJPY."], ["JPY base", "JPYTWD, JPYKRW."], ["CNY base", "CNYJPY, CNYTWD, CNYKRW."]],
    h3: "Cross-Pair Logic",
    p3: "Each pair shows FX, TFP log spread, nominal spread and real spread. Original V20 USDCNY, EURUSD and EURCNY values are preserved; new Asian series use public data.",
    h4: "Coverage Notes",
    p4: "Taiwan CPI now comes from the data.gov.tw / DGBAS monthly CPI index, and Taiwan 10Y yield uses the 10-year tenor row in TPEx yield-curve files. TPEx curve coverage starts in 2006, so 1999-2005 remain blank.",
    divergence: [["FX:", "FRED daily exchange rates averaged by year; cross rates are derived through triangular relationships."], ["TFP:", "Penn World Table 11.0 rtfpna; 2024-2026 extrapolated with 2017-2023 CAGR."], ["Spreads:", "Nominal spread is base 10Y minus quote 10Y; real spread subtracts CPI inflation first."]],
    conclusionTitle: "How to Use the Expanded View",
    conclusion: "Choose a base group, choose a pair, then select FX/spread, TFP/FX, or TFP/real spread mode.",
    auditTitle: "Data Source & Audit",
    auditHistoricalTitle: "1. Historical Coverage",
    auditHistorical: [["FX:", "FRED daily FX annual averages; cross rates derived from USD base."], ["TFP:", "Penn World Table 11.0 rtfpna."], ["Rates/CPI:", "FRED OECD / World Bank series; Taiwan CPI uses data.gov.tw / DGBAS and Taiwan 10Y uses TPEx."]],
    auditForecastTitle: "2. Forecast / Gap Notes",
    auditForecast: [["2024-2026 TFP:", "Extrapolated with 2017-2023 CAGR."], ["Taiwan spreads:", "TPEx 10Y yields are available from 2006; 2026 uses Jan-May samples, while 2026 CPI remains blank."], ["Existing V20:", "USDCNY, EURUSD and EURCNY keep the original V20 values."]],
    explorerStep1: "Step 1: Select Base Group",
    explorerStep2: "Step 2: Select Cross Pair",
    modes: { spread: "FX vs Nominal / Real Spread", "tfp-fx": "TFP Log Spread vs FX", "tfp-real": "TFP Log Spread vs Real Spread" },
    labels: { tfp: "TFP Log Spread", nominal: "Nominal Spread (%)", real: "Real Spread (%)" },
    table: "Data Matrix",
    year: "Year",
    missingSpread: "This pair does not have complete spread data, so spread curves are blank.",
  },
} satisfies Record<Locale, Record<string, unknown>>;
