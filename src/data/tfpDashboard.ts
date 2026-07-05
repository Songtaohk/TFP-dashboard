export type Locale = "zh" | "en";
export type EconomyKey = "us" | "eu" | "cn" | "jp" | "kr" | "tw" | "in";
export type PairKey = "usdcny" | "usdjpy" | "usdkrw" | "usdtwd" | "usdinr" | "eurusd" | "eurcny" | "eurjpy" | "eurtwd" | "eurkrw" | "eurinr" | "jpytwd" | "jpykrw" | "jpyinr" | "cnyjpy" | "cnytwd" | "cnykrw" | "cnyinr" | "twdkrw" | "twdinr";
export type GroupKey = "usd" | "eur" | "jpy" | "cny" | "twd";
export type ChartMode = "spread" | "tfp-fx" | "tfp-real";
export type TfpMode = "rtfpna" | "ctfp";
export type SeriesValue = number | null;
export type LatestUpdate = {
  date: string;
  scope: string;
  detail: string;
};
export type PairSeries = Record<PairKey, SeriesValue[]>;
export type TfpPairSeries = Record<TfpMode, PairSeries>;
export type EconomySeries = {
  rtfpna: SeriesValue[];
  ctfp: SeriesValue[];
  cpi: SeriesValue[];
  nominal10y: SeriesValue[];
  realRate: SeriesValue[];
};

export const years = Array.from({ length: 28 }, (_, index) => (1999 + index).toString());

export const latestRawDataUpdates: LatestUpdate[] = [
  {
    "date": "2026-05-17",
    "scope": "CNY fx 2026",
    "detail": "FRED DEXCHUS annual average updated value to 6.8636 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "EUR fx 2026",
    "detail": "FRED DEXUSEU annual average updated value to 1.167 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "JPY fx 2026",
    "detail": "FRED DEXJPUS annual average updated value to 158.0839 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "KRW fx 2026",
    "detail": "FRED DEXKOUS annual average updated value to 1482.2874 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "TWD fx 2026",
    "detail": "FRED DEXTAUS annual average updated value to 31.6125 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "INR fx 2026",
    "detail": "FRED DEXINUS annual average updated value to 93.0854 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "US nominal10y 2026",
    "detail": "FRED GS10 annual average updated value to 4.31 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "JP nominal10y 2026",
    "detail": "FRED IRLTLT01JPM156N annual average updated value to 2.372 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "KR nominal10y 2026",
    "detail": "FRED IRLTLT01KRM156N annual average updated value to 3.7274 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "IN nominal10y 2026",
    "detail": "FRED INDIRLTLT01STM annual average updated value to 6.8824 (partial-year official source)."
  },
  {
    "date": "2026-05-17",
    "scope": "EU cpi 2025",
    "detail": "World Bank FP.CPI.TOTL.ZG EMU updated value to 2.4671 (official)."
  },
  {
    "date": "2026-05-17",
    "scope": "CN cpi 2025",
    "detail": "World Bank FP.CPI.TOTL.ZG CHN updated value to 0.0596 (official)."
  },
  {
    "date": "2026-05-17",
    "scope": "JP cpi 2025",
    "detail": "World Bank FP.CPI.TOTL.ZG JPN updated value to 3.1725 (official)."
  },
  {
    "date": "2026-05-17",
    "scope": "KR cpi 2025",
    "detail": "World Bank FP.CPI.TOTL.ZG KOR updated value to 2.1231 (official)."
  },
  {
    "date": "2026-05-17",
    "scope": "IN cpi 2025",
    "detail": "World Bank FP.CPI.TOTL.ZG IND updated value to 2.3988 (official)."
  }
];

export const pairGroups: Record<GroupKey, PairKey[]> = {
  usd: ["usdcny", "usdjpy", "usdkrw", "usdtwd", "usdinr"],
  eur: ["eurusd", "eurcny", "eurjpy", "eurtwd", "eurkrw", "eurinr"],
  jpy: ["jpytwd", "jpykrw", "jpyinr"],
  cny: ["cnyjpy", "cnytwd", "cnykrw", "cnyinr"],
  twd: ["twdkrw", "twdinr"],
};

export const groupLabels: Record<GroupKey, { zh: string; en: string }> = {
  usd: { zh: "USD base", en: "USD base" },
  eur: { zh: "EUR base", en: "EUR base" },
  jpy: { zh: "JPY base", en: "JPY base" },
  cny: { zh: "CNY base", en: "CNY base" },
  twd: { zh: "TWD base", en: "TWD base" },
};

export const groupBaseEconomies: Record<GroupKey, EconomyKey> = {
  usd: "us",
  eur: "eu",
  jpy: "jp",
  cny: "cn",
  twd: "tw",
};

export const economyLabels: Record<EconomyKey, { zh: string; en: string; currency: string }> = {
  us: { zh: "USD", en: "USD", currency: "USD" },
  eu: { zh: "EUR", en: "EUR", currency: "EUR" },
  cn: { zh: "CNY", en: "CNY", currency: "CNY" },
  jp: { zh: "JPY", en: "JPY", currency: "JPY" },
  kr: { zh: "KRW", en: "KRW", currency: "KRW" },
  tw: { zh: "TWD", en: "TWD", currency: "TWD" },
  in: { zh: "INR", en: "INR", currency: "INR" },
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
  eurtwd: { zh: "EUR TWD", en: "EUR TWD", fx: "EURTWD", base: "eu", quote: "tw" },
  eurkrw: { zh: "EUR KRW", en: "EUR KRW", fx: "EURKRW", base: "eu", quote: "kr" },
  eurinr: { zh: "EUR INR", en: "EUR INR", fx: "EURINR", base: "eu", quote: "in" },
  jpytwd: { zh: "JPY TWD", en: "JPY TWD", fx: "JPYTWD", base: "jp", quote: "tw" },
  jpykrw: { zh: "JPY KRW", en: "JPY KRW", fx: "JPYKRW", base: "jp", quote: "kr" },
  jpyinr: { zh: "JPY INR", en: "JPY INR", fx: "JPYINR", base: "jp", quote: "in" },
  cnyjpy: { zh: "CNY JPY", en: "CNY JPY", fx: "CNYJPY", base: "cn", quote: "jp" },
  cnytwd: { zh: "CNY TWD", en: "CNY TWD", fx: "CNYTWD", base: "cn", quote: "tw" },
  cnykrw: { zh: "CNY KRW", en: "CNY KRW", fx: "CNYKRW", base: "cn", quote: "kr" },
  cnyinr: { zh: "CNY INR", en: "CNY INR", fx: "CNYINR", base: "cn", quote: "in" },
  twdkrw: { zh: "TWD KRW", en: "TWD KRW", fx: "TWDKRW", base: "tw", quote: "kr" },
  twdinr: { zh: "TWD INR", en: "TWD INR", fx: "TWDINR", base: "tw", quote: "in" },
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

const publicCountryData = {"fx":{"jpy":[109.8124,104.487,116.4445,120.4227,111.4966,104.4357,106.2955,112.2859,114.6039,99.4444,90.4522,84.0821,76.9379,76.7598,93.8578,101.2833,116.4112,104.4938,107.3559,105.3216,104.0065,101.885,104.7926,126.4028,134.5559,145.0963,143.265,152.3125],"krw":[1148.8073,1096.1007,1237.5622,1202.4092,1146.408,1105.8962,988.3117,921.2868,904.0567,1056.7708,1230.6726,1107.0296,1068.6229,1083.0141,1052.7333,1007.9429,1087.6285,1114.9229,1081.2763,1048.7504,1112.2015,1126.4842,1092.2524,1242.0957,1251.4776,1306.1945,1361.4907,1422.1397],"twd":[31.2077,30.2981,32.3988,33.2131,33.0865,32.2255,31.019,31.3813,31.5959,30.3175,31.8814,30.1699,28.3651,28.4256,28.5428,29.0223,30.528,30.9917,29.1153,28.7441,29.4839,28.1076,26.6521,28.6503,29.8345,30.7584,29.8528,30.6027],"inr":[41.6402,43.6129,45.2298,46.7626,44.8057,43.7062,42.4771,43.6219,40.073,41.73,46.6657,43.5519,44.9658,51.3293,56.2729,58.4246,61.651,64.5841,62.3132,65.2298,67.142,70.7471,70.5358,75.5569,79.0775,80.1443,83.4739,89.2332]},"tfp":{"us":[0.869326,0.87935,0.880456,0.891869,0.907184,0.921985,0.930433,0.928767,0.927742,0.923284,0.925019,0.940476,0.938276,0.939691,0.941934,0.943991,0.948802,0.94841,0.953378,0.958201,0.964266,0.973078,1,0.984038,0.992998,0.99976,1.006568,1.013422],"cn":[0.50186,0.512456,0.524457,0.540571,0.559177,0.58005,0.592121,0.633922,0.700974,0.735487,0.753161,0.759524,0.788436,0.800227,0.811297,0.829218,0.851113,0.872795,0.898877,0.924569,0.946753,0.959374,1,0.995394,1.013726,1.034246,1.055182,1.076541],"jp":[0.977459,0.989585,0.98856,0.990958,0.996456,1.003929,1.011893,1.009513,1.014392,1.001605,0.962928,0.995154,0.99475,1.001465,1.017481,1.010581,1.01847,1.016344,1.021035,1.018081,1.014198,0.985455,1,0.997666,1.004987,1.002337,0.999694,0.997058],"kr":[0.804576,0.818934,0.820868,0.847418,0.851899,0.864474,0.879055,0.890057,0.913276,0.92843,0.92486,0.956678,0.961033,0.956438,0.961221,0.965268,0.962718,0.968788,0.98087,0.993111,0.994751,0.987357,1,0.99736,0.976855,0.976187,0.97552,0.974853],"tw":[0.749409,0.762246,0.759754,0.78018,0.784715,0.797343,0.80934,0.825044,0.849689,0.837121,0.827454,0.882932,0.890066,0.891984,0.896032,0.918737,0.912746,0.914826,0.926828,0.934933,0.945387,0.973304,1,0.989976,0.98693,0.997319,1.007818,1.018427],"in":[0.86283,0.84915,0.842867,0.832587,0.854161,0.871255,0.892505,0.913934,0.924917,0.900211,0.917489,0.941361,0.933406,0.936163,0.941834,0.97175,1.009523,1.051069,1.070467,1.084857,1.035691,0.955576,1,1.000232,1.010531,1.000873,0.991307,0.981833]},"nominal":{"us":[5.6367,6.0292,5.0175,4.6108,4.015,4.2742,4.29,4.7917,4.6292,3.6667,3.2567,3.2142,2.7858,1.8025,2.3508,2.5408,2.1358,1.8417,2.33,2.91,2.1442,0.8942,1.4425,2.9517,3.9575,4.2083,4.2917,4.31],"jp":[1.749,1.7444,1.319,1.2632,1.0032,1.4927,1.3547,1.7405,1.6655,1.4673,1.3337,1.1483,1.1024,0.8356,0.6897,0.5203,0.35,-0.0662,0.0517,0.065,-0.1104,-0.0054,0.0717,0.2317,0.5625,0.9183,1.5533,2.372],"kr":[null,7.7633,6.855,6.5867,5.0483,4.7283,4.95,5.1517,5.3508,5.5683,5.1658,4.7733,4.2025,3.4475,3.2781,3.1863,2.3058,1.7474,2.2826,2.5027,1.7023,1.4997,2.0645,3.3635,3.6423,3.2193,2.8923,3.7274],"in":[null,null,null,null,null,null,null,null,null,null,null,null,null,8.2594,8.11,8.5867,7.776,7.2062,6.9239,7.7047,6.997,6.1918,6.2575,7.1924,7.2204,6.976,6.5264,6.8824],"eu":[4.6551,5.4389,5.0273,4.9229,4.1609,4.1408,3.4409,3.8595,4.3317,4.356,4.0286,3.7814,4.308,3.0477,3.0118,2.2813,1.2675,0.9286,1.1707,1.2641,0.5846,0.2136,0.1997,2.0414,3.2651,2.9753,3.1467,3.221]},"cpi":{"us":[2.188,3.3769,2.8262,1.586,2.2701,2.6772,3.3927,3.2259,2.8527,3.8391,-0.3555,1.64,3.1568,2.0693,1.4648,1.6222,0.1186,1.2616,2.1301,2.4426,1.8122,1.2336,4.6979,8.0028,4.1163,2.9495,null,null],"jp":[-0.3413,-0.6766,-0.7401,-0.9235,-0.2565,-0.0086,-0.2829,0.2494,0.06,1.3801,-1.3528,-0.7282,-0.2725,-0.0441,0.335,2.7592,0.7953,-0.1273,0.4842,0.9891,0.4688,-0.025,-0.2334,2.4977,3.2681,2.7385,3.1725,null],"kr":[0.813,2.2592,4.0666,2.7623,3.5149,3.5907,2.7538,2.2423,2.5346,4.6739,2.7565,2.9393,4.026,2.1871,1.3013,1.2748,0.7063,0.9717,1.9443,1.4758,0.383,0.5373,2.4983,5.0895,3.5975,2.3217,2.1231,null],"in":[4.6698,4.0094,3.7793,4.2972,3.8059,3.7673,4.2463,5.7965,6.3729,8.3493,10.8824,11.9894,8.9118,9.479,10.0179,6.6657,4.907,4.9482,3.3282,3.9388,3.7295,6.6234,5.1314,6.699,5.6491,4.953,2.3988,null],"eu":[2.1572,3.1508,3.374,2.4244,2.092,2.2862,2.4877,2.6663,2.5107,4.165,0.8393,1.5311,3.2894,2.6628,1.22,0.1993,-0.0616,0.1833,1.4291,1.7386,1.6305,0.4765,2.5545,8.8337,6.2994,2.4353,2.4671,null]}} as const;

const taiwanNominal10Y: SeriesValue[] = [null,null,null,null,null,null,null,1.77,2.35,2.24,1.51,1.37,1.4,1.2,1.46,1.6,1.36,0.87,1.05,0.94,0.72,0.42,0.47,1.21,1.21,1.52,1.46,1.5];
const taiwanCpiInflation: SeriesValue[] = [0.18,1.25,0,-0.2,-0.28,1.61,2.31,0.6,1.8,3.53,-0.87,0.97,1.42,1.94,0.79,1.19,-0.31,1.39,0.62,1.35,0.56,-0.24,1.97,2.95,2.49,2.18,1.66,null];
const officialFx = {"cny":[8.2783,8.2784,8.277,8.2771,8.2772,8.2768,8.1936,7.9723,7.6058,6.9477,6.8307,6.7696,6.463,6.3093,6.1478,6.162,6.2827,6.64,6.7569,6.609,6.9081,6.9042,6.4508,6.729,7.0809,7.1957,7.1875,6.8636],"eur":[1.0653,0.9232,0.8952,0.9454,1.1321,1.2438,1.2449,1.2563,1.3712,1.4725,1.3935,1.3261,1.3931,1.2858,1.328,1.3298,1.1096,1.1072,1.1301,1.1818,1.1194,1.141,1.183,1.0534,1.0817,1.082,1.1306,1.167],"jpy":[113.7342,107.804,121.568,125.2204,115.9387,108.1508,110.1069,116.3121,117.7623,103.3906,93.6827,87.7817,79.6967,79.818,97.5971,105.7398,121.0491,108.6569,112.0986,110.3974,109.0188,106.7754,109.8429,131.4589,140.5001,151.4551,149.5686,158.0839],"krw":[1189.8361,1130.8975,1292.0149,1250.314,1192.0817,1145.2364,1023.7492,954.321,928.9717,1098.7061,1274.6252,1155.7389,1106.94,1126.1621,1094.6749,1052.2924,1130.9603,1159.3422,1129.0435,1099.2926,1165.8016,1180.5554,1144.8911,1291.7796,1306.7637,1363.4381,1421.3963,1482.2874],"twd":[32.3222,31.2599,33.8243,34.5363,34.4047,33.3719,32.1312,32.5065,32.8547,31.5205,33.02,31.4974,29.3822,29.5581,29.68,30.2992,31.7443,32.2264,30.4016,30.1294,30.9049,29.4568,27.9366,29.7963,31.1525,32.1064,31.1663,31.6125],"inr":[43.1274,44.9975,47.22,48.6257,46.5908,45.261,44.0002,45.1861,41.1774,43.3859,48.3324,45.6507,46.5782,53.3743,58.5149,60.9953,64.1073,67.1572,65.0659,68.3734,70.3777,74.1429,73.9351,78.5792,82.5708,83.6566,87.1468,93.0854]} as const;
const chinaNominal10Y: SeriesValue[] = [null,null,null,null,null,null,null,3.0578,4.0149,3.8604,3.3713,3.4747,3.8545,3.456,3.8308,4.1041,3.3343,2.8498,3.6135,3.5785,3.1813,2.9182,3.007,2.7639,2.7134,2.1814,1.7489,1.7877];
const chinaCpiInflation: SeriesValue[] = [-1.4015,0.3478,0.7191,-0.732,1.1276,3.8246,1.7764,1.6494,4.8168,5.9253,-0.7282,3.1753,5.5539,2.6195,2.6211,1.9216,1.437,2,1.5931,2.0748,2.8992,2.4194,0.981,1.9736,0.2348,0.2181,0.0596,null];
const germanyTfpIndex: SeriesValue[] = [0.919689,0.929558,0.938741,0.935485,0.932899,0.9357,0.941683,0.957486,0.966722,0.960982,0.918506,0.939476,0.96052,0.962338,0.962229,0.970328,0.974166,0.984556,0.998753,0.997346,0.998371,0.985335,1,1.001672,0.994192,0.993434,0.992677,0.99192];
const pwtCtfpIndex: Record<EconomyKey, SeriesValue[]> = {"us":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"eu":[0.996748,1.011709,1.036712,1.045539,1.034885,1.023244,1.03933,1.022888,1.028703,1.009121,0.967761,0.951706,0.971385,0.967489,0.970367,0.986209,0.981896,1.010682,1.016176,1.015972,1.03998,1.02576,1.022465,1.041851,1.021784,1.022721,1.02366,1.024599],"cn":[0.31068,0.326037,0.338365,0.342091,0.350558,0.368637,0.387925,0.394405,0.411604,0.413074,0.40314,0.395049,0.404168,0.414909,0.40173,0.408635,0.414834,0.420264,0.432372,0.439275,0.448498,0.452948,0.466503,0.474107,0.470938,0.477693,0.484544,0.491493],"jp":[0.732967,0.746677,0.749795,0.749777,0.741452,0.736057,0.746092,0.731837,0.724536,0.707285,0.688595,0.694974,0.689627,0.685246,0.694312,0.67696,0.701235,0.686389,0.680302,0.668954,0.657061,0.641312,0.633847,0.640357,0.639849,0.633345,0.626906,0.620534],"kr":[0.682246,0.690792,0.686028,0.710735,0.700657,0.695138,0.705443,0.699662,0.70751,0.6926,0.684101,0.699792,0.685392,0.667214,0.620577,0.622738,0.659733,0.668593,0.663235,0.665319,0.666869,0.672617,0.674872,0.686116,0.660838,0.66044,0.660041,0.659643],"tw":[1.106838,1.110521,1.079083,1.071579,1.038982,1.027111,1.034783,1.011943,0.982411,0.896173,0.842604,0.837137,0.824039,0.839633,0.819261,0.84357,0.84212,0.845462,0.845842,0.819217,0.830946,0.845479,0.833376,0.841585,0.825477,0.822131,0.818799,0.815479],"in":[0.308104,0.303624,0.301857,0.303174,0.308027,0.319887,0.34456,0.364901,0.378738,0.368916,0.35907,0.377681,0.383681,0.399033,0.380414,0.386151,0.394176,0.402302,0.404823,0.422248,0.404497,0.375218,0.409244,0.416551,0.397237,0.395987,0.394741,0.393498]};

const round = (value: SeriesValue, digits = 2): SeriesValue => value === null || Number.isNaN(value) ? null : Number(value.toFixed(digits));
const get = (values: readonly SeriesValue[], index: number) => values[index] ?? null;
const divide = (left: SeriesValue, right: SeriesValue, digits = 2): SeriesValue => left === null || right === null ? null : round(left / right, digits);
const multiply = (left: SeriesValue, right: SeriesValue, digits = 2): SeriesValue => left === null || right === null ? null : round(left * right, digits);
const spread = (base: readonly SeriesValue[], quote: readonly SeriesValue[], index: number): SeriesValue => {
  const left = get(base, index);
  const right = get(quote, index);
  return left === null || right === null ? null : round(left - right, 2);
};
const logSpread = (base: readonly SeriesValue[], quote: readonly SeriesValue[], index: number, digits = 3): SeriesValue => {
  const left = get(base, index);
  const right = get(quote, index);
  return left === null || right === null || left <= 0 || right <= 0 ? null : round(Math.log(left) - Math.log(right), digits);
};
const rebaseToYear = (values: readonly SeriesValue[], baseYear: string): SeriesValue[] => {
  const baseValue = values[years.indexOf(baseYear)] ?? null;
  return values.map((value) => (value === null || baseValue === null || baseValue === 0 ? null : round(value / baseValue, 6)));
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
const chinaRealRates = years.map((_, index) => {
  const rate = chinaNominal10Y[index];
  const cpi = chinaCpiInflation[index];
  return rate === null || cpi === null ? null : round(rate - cpi, 2);
});

const nominalRates: Record<EconomyKey, SeriesValue[]> = {
  us: [...publicCountryData.nominal.us],
  eu: [...publicCountryData.nominal.eu],
  cn: [...chinaNominal10Y],
  jp: [...publicCountryData.nominal.jp],
  kr: [...publicCountryData.nominal.kr],
  in: [...publicCountryData.nominal.in],
  tw: [...taiwanNominal10Y],
};
const realRateSeries: Record<EconomyKey, SeriesValue[]> = {
  us: realRates.us,
  eu: realRates.eu,
  cn: chinaRealRates,
  jp: realRates.jp,
  kr: realRates.kr,
  in: realRates.in,
  tw: taiwanRealRates,
};
const cpiSeries: Record<EconomyKey, SeriesValue[]> = {
  us: [...publicCountryData.cpi.us],
  eu: [...publicCountryData.cpi.eu],
  cn: [...chinaCpiInflation],
  jp: [...publicCountryData.cpi.jp],
  kr: [...publicCountryData.cpi.kr],
  in: [...publicCountryData.cpi.in],
  tw: [...taiwanCpiInflation],
};
const pwtRtfpnaIndex: Record<EconomyKey, SeriesValue[]> = {
  us: rebaseToYear(publicCountryData.tfp.us, "2010"),
  eu: rebaseToYear(germanyTfpIndex, "2010"),
  cn: rebaseToYear(publicCountryData.tfp.cn, "2010"),
  jp: rebaseToYear(publicCountryData.tfp.jp, "2010"),
  kr: rebaseToYear(publicCountryData.tfp.kr, "2010"),
  tw: rebaseToYear(publicCountryData.tfp.tw, "2010"),
  in: rebaseToYear(publicCountryData.tfp.in, "2010"),
};
const tfpIndexes: Record<TfpMode, Record<EconomyKey, SeriesValue[]>> = {
  rtfpna: pwtRtfpnaIndex,
  ctfp: pwtCtfpIndex,
};

export const economyData: Record<EconomyKey, EconomySeries> = {
  us: { rtfpna: pwtRtfpnaIndex.us, ctfp: pwtCtfpIndex.us, cpi: cpiSeries.us, nominal10y: nominalRates.us, realRate: realRateSeries.us },
  eu: { rtfpna: pwtRtfpnaIndex.eu, ctfp: pwtCtfpIndex.eu, cpi: cpiSeries.eu, nominal10y: nominalRates.eu, realRate: realRateSeries.eu },
  cn: { rtfpna: pwtRtfpnaIndex.cn, ctfp: pwtCtfpIndex.cn, cpi: cpiSeries.cn, nominal10y: nominalRates.cn, realRate: realRateSeries.cn },
  jp: { rtfpna: pwtRtfpnaIndex.jp, ctfp: pwtCtfpIndex.jp, cpi: cpiSeries.jp, nominal10y: nominalRates.jp, realRate: realRateSeries.jp },
  kr: { rtfpna: pwtRtfpnaIndex.kr, ctfp: pwtCtfpIndex.kr, cpi: cpiSeries.kr, nominal10y: nominalRates.kr, realRate: realRateSeries.kr },
  tw: { rtfpna: pwtRtfpnaIndex.tw, ctfp: pwtCtfpIndex.tw, cpi: cpiSeries.tw, nominal10y: nominalRates.tw, realRate: realRateSeries.tw },
  in: { rtfpna: pwtRtfpnaIndex.in, ctfp: pwtCtfpIndex.in, cpi: cpiSeries.in, nominal10y: nominalRates.in, realRate: realRateSeries.in },
};

const deriveFx = (pair: PairKey, index: number): SeriesValue => {
  const usdCny = get(officialFx.cny, index);
  const eurUsd = get(officialFx.eur, index);
  const eurCny = multiply(eurUsd, usdCny, 2);
  const usdJpy = get(officialFx.jpy, index);
  const usdKrw = get(officialFx.krw, index);
  const usdTwd = get(officialFx.twd, index);
  const usdInr = get(officialFx.inr, index);
  const direct: Partial<Record<PairKey, SeriesValue>> = { usdcny: usdCny, usdjpy: usdJpy, usdkrw: usdKrw, usdtwd: usdTwd, usdinr: usdInr, eurusd: eurUsd, eurcny: eurCny };
  if (direct[pair] !== undefined) return round(direct[pair] ?? null, pair.startsWith("jpy") ? 4 : 2);
  if (pair === "eurjpy") return multiply(eurUsd, usdJpy, 2);
  if (pair === "eurtwd") return multiply(eurUsd, usdTwd, 2);
  if (pair === "eurkrw") return multiply(eurUsd, usdKrw, 2);
  if (pair === "eurinr") return multiply(eurUsd, usdInr, 2);
  if (pair === "jpytwd") return divide(usdTwd, usdJpy, 4);
  if (pair === "jpykrw") return divide(usdKrw, usdJpy, 4);
  if (pair === "jpyinr") return divide(usdInr, usdJpy, 4);
  if (pair === "cnyjpy") return divide(usdJpy, usdCny, 2);
  if (pair === "cnytwd") return divide(usdTwd, usdCny, 2);
  if (pair === "cnykrw") return divide(usdKrw, usdCny, 2);
  if (pair === "cnyinr") return divide(usdInr, usdCny, 2);
  if (pair === "twdkrw") return divide(usdKrw, usdTwd, 2);
  if (pair === "twdinr") return divide(usdInr, usdTwd, 2);
  return null;
};

const deriveTfpSeries = (pair: PairKey, mode: TfpMode): SeriesValue[] => {
  const meta = pairLabels[pair];
  const index = tfpIndexes[mode];
  return years.map((_, yearIndex) => logSpread(index[meta.base], index[meta.quote], yearIndex, 3));
};

const derivePairSeries = (pair: PairKey): { fx: SeriesValue[]; nomSpread: SeriesValue[]; realSpread: SeriesValue[] } => {
  const meta = pairLabels[pair];
  return {
    fx: years.map((_, index) => deriveFx(pair, index)),
    nomSpread: years.map((_, index) => spread(nominalRates[meta.base], nominalRates[meta.quote], index)),
    realSpread: years.map((_, index) => spread(realRateSeries[meta.base], realRateSeries[meta.quote], index)),
  };
};

const pairKeys = Object.values(pairGroups).flat();
export const dashboardData = pairKeys.reduce(
  (accumulator, pair) => {
    const series = derivePairSeries(pair);
    accumulator.fx[pair] = series.fx;
    accumulator.tfp.rtfpna[pair] = deriveTfpSeries(pair, "rtfpna");
    accumulator.tfp.ctfp[pair] = deriveTfpSeries(pair, "ctfp");
    accumulator.nomSpread[pair] = series.nomSpread;
    accumulator.realSpread[pair] = series.realSpread;
    return accumulator;
  },
  { fx: {} as PairSeries, tfp: { rtfpna: {} as PairSeries, ctfp: {} as PairSeries } as TfpPairSeries, nomSpread: {} as PairSeries, realSpread: {} as PairSeries },
);

export const hasSpreadData = (pair: PairKey) => dashboardData.nomSpread[pair].some((value) => value !== null) || dashboardData.realSpread[pair].some((value) => value !== null);

export const copy = {
  zh: {
    title: "美欧亚TFP与汇率、利率之长期关系",
    subtitle: "基于汇率、TFP、名义利差与实际利差的交叉比较 (1999-2026)",
    badge: "V12.4",
    sourceVersion: "Unified Official Data Snapshot",
    footerPrefix: "版权所有，最新更新于",
    tabs: { analysis: "深度分析", explorer: "交互沙盘", rawdata: "数据明细" },
    contact: "联系: songtaozhang@gmail.com",
    analysisIntro: "本看板把 TFP 作为长期供给侧变量，与汇率、名义利差和实际利差并列观察。它不试图解释每一次短期波动，而是提供跨经济体生产率差异、价格变量与利率变量之间的长期比较框架。",
    analysisSections: [["01", "TFP 的定义", "全要素生产率衡量劳动、资本等可观察投入之外的产出贡献。它通常反映技术扩散、组织效率、产业结构、资源配置和制度环境等难以直接归入单一投入项的长期因素。"], ["02", "为什么使用对数差", "货币对方向决定比较方向，因此 TFP 也使用同一方向的 ln(TFP_A) - ln(TFP_B)。对数差近似表示百分比差异，能让美国-中国、日本-韩国、台湾-韩国等不同量级的比较放在同一张图中观察。"], ["03", "两种 TFP 口径", "rtfpna 适合观察一个经济体相对自身历史的生产率动量；ctfp 适合观察当前 PPP 下的跨国生产率水平。前者更像时间序列口径，后者更适合横截面水平比较。"], ["04", "尚未纳入的因素", "当前版本没有把风险溢价、资本管制、贸易条件、产业结构、央行政策反应函数、财政赤字、人口结构、地缘风险、权益风险偏好和预期通胀单独建模，因此图表更适合做长期关系观察，而不是短期交易信号。"]],
    tfpCards: [["rtfpna", "PWT constant national prices；页面按 2010 = 1 重基准。用于观察各经济体生产率相对自身历史的变化。"], ["ctfp", "PWT current PPPs, USA = 1。用于观察跨国生产率水平差异，尤其适合比较美、欧、日、韩、台、印、中之间的相对水平。"]],
    auditTitle: "数据来源与审计说明",
    auditHistoricalTitle: "1. 历史口径",
    auditHistorical: [["FX:", "FRED annual exchange-rate series；交叉汇率由 USD base 派生。"], ["TFP:", "Penn World Table 11.0 rtfpna 与 ctfp；EU 使用 Germany 代理，不再反推。"], ["Rates/CPI:", "10Y 使用 FRED/OECD、ChinaBond、TPEx；CPI 使用 World Bank 和 data.gov.tw / 主计总处。"]],
    auditForecastTitle: "2. 预测/缺口说明",
    auditForecast: [["历史快照:", "PWT 11.0 覆盖至 2023；2017-2023 的 rtfpna 与 ctfp 均来自 PWT 11.0 官方数据。2024-2026 为近期外推值。"], ["近期外推:", "TFP 的 2024-2026 使用 2017-2023 CAGR 外推，并在数据表中保留近期标记；后续刷新时应重新抓取 PWT 或权威更新。"], ["CN data:", "CN 10Y 使用 ChinaBond 月度样本年均值；CN CPI 使用 World Bank，不再由 USDCNY 利差反推。"]],
    sourceTitle: "来源与公式",
    sourceRows: [["汇率:", "USDCNY、EURUSD、USDJPY、USDKRW、USDTWD、USDINR 使用 FRED annual exchange-rate series；其它货币对由 USD base 交叉公式派生，包括 EURCNY、EURJPY、EURTWD、EURKRW、EURINR、JPYTWD、JPYKRW、JPYINR、CNYJPY、CNYTWD、CNYKRW、CNYINR、TWDKRW、TWDINR。"], ["10Y 国债:", "US、EU、JP、KR、IN 使用 FRED/OECD 月度或日度序列的年度均值；CN 使用 ChinaBond 中债国债收益率曲线 10Y 月度样本年均值；TW 使用 TPEx Government Bond & Corporate Bond Yield Curve 的 10Y 月度样本年均值。"], ["CPI:", "US、EU、CN、JP、KR、IN 使用 World Bank FP.CPI.TOTL.ZG；TW 使用 data.gov.tw / 主计总处 CPI 月度总指数计算年度通胀。"], ["TFP:", "rtfpna: PWT constant national prices，页面按 2010 = 1 重基准；ctfp: PWT current PPPs, USA = 1。2017-2023 均来自 PWT 11.0；2024-2026 为 2017-2023 CAGR 外推。US、CN、JP、KR、TW、IN 使用本国/地区序列；EU 使用 Germany 代理。"]],
    formulaRows: [["实际利率:", "实际利率为 CPI-adjusted rate：Real Rate_A = 10Y_A - CPI_A。"], ["名义利差:", "Nominal Spread_A/B = 10Y_A - 10Y_B。"], ["实际利差:", "Real Spread_A/B = (10Y_A - CPI_A) - (10Y_B - CPI_B)。"], ["TFP 对数差:", "TFP Log Spread_A/B = ln(TFP_A) - ln(TFP_B)。"]],
    tfpMethodTitle: "TFP 两种口径的差异",
    tfpMethodRows: [["rtfpna:", "PWT constant national prices，页面按 2010 = 1 重基准。适合看单一经济体自身生产率趋势，以及一个货币对两端自 2010 年以来的生产率动量差。"], ["ctfp:", "PWT current PPPs, USA = 1。适合看同一年各经济体在购买力平价口径下的 TFP 水平差异。它不是美元计价，也不是通胀调整标签。"], ["使用提醒:", "货币对图表使用 ln(TFP_A) - ln(TFP_B)，方向与汇率表达一致；单一基准货币图表用于看本经济体 TFP、10Y 与实际利率的历史趋势。"]],
    formulaTitle: "公式",
    latestUpdateTitle: "最新更新",
    noLatestUpdates: "无",
    explorerStep1: "第一步：选择基准分组",
    explorerStep2: "第二步：选择货币对",
    modes: { spread: "汇率 vs 名义/实际利差", "tfp-fx": "TFP 对数差 vs 汇率", "tfp-real": "TFP 对数差 vs 实际利差" },
    labels: { tfp: "TFP 对数差", nominal: "名义利差 (%)", real: "实际利差 (%)", nominalRate: "10年期国债利率 (%)", realRate: "实际利率 (%)" },
    tfpModeTitle: "TFP 口径",
    tfpModes: { rtfpna: "rtfpna · 2010=1", ctfp: "ctfp · USA=1" },
    tfpModeNote: "rtfpna 用于比较各经济体相对自身 2010 年的生产率动量；ctfp 用于比较 PWT 当前 PPP 下的跨国 TFP 水平。",
    table: "数据明细",
    pairTable: "货币对比较数据",
    economyTable: "各经济体原始数据",
    countryFilter: "国别",
    pairFilter: "货币对",
    exportExcel: "导出 Excel",
    year: "年份",
    missingSpread: "该货币对缺少完整利差数据，利差曲线留空。",
  },
  en: {
    title: "Long-term correlation in TFP & FX/ Rates (US, EU & NEA)",
    subtitle: "Cross-pair FX, TFP, nominal spread and real spread analysis (1999-2026)",
    badge: "V12.4",
    sourceVersion: "Unified Official Data Snapshot",
    footerPrefix: "All rights reserved. Latest updated",
    tabs: { analysis: "Deep Analysis", explorer: "Interactive Sandbox", rawdata: "Data Matrix" },
    contact: "Contact: songtaozhang@gmail.com",
    analysisIntro: "This dashboard treats TFP as a long-run supply-side variable and compares it with FX, nominal spreads and real spreads. It is designed for structural comparison rather than explaining every short-run market move.",
    analysisSections: [["01", "What TFP Means", "Total factor productivity measures output contribution beyond observable labor and capital inputs. It reflects long-run forces such as technology diffusion, organizational efficiency, sector mix, resource allocation and institutional quality."], ["02", "Why Log Differences", "The pair direction sets the comparison direction, so TFP uses the same ln(TFP_A) - ln(TFP_B) convention. Log differences approximate percentage gaps and let US-China, Japan-Korea and Taiwan-Korea comparisons sit on a consistent scale."], ["03", "Two TFP Measures", "rtfpna is better for productivity momentum relative to each economy's own history; ctfp is better for cross-country productivity levels at current PPPs. The first is closer to a time-series lens; the second is more useful for level comparisons."], ["04", "Factors Not Yet Modeled", "This version does not separately model risk premia, capital controls, terms of trade, sector structure, central-bank reaction functions, fiscal deficits, demographics, geopolitical risk, equity risk appetite or expected inflation. The charts should be read as long-run relationship views, not short-run trading signals."]],
    tfpCards: [["rtfpna", "PWT constant national prices; rebased in the page to 2010 = 1. Use it to compare each economy's productivity path against its own history."], ["ctfp", "PWT current PPPs, USA = 1. Use it to compare cross-country TFP levels across the US, Europe, Japan, Korea, Taiwan, India and China."]],
    auditTitle: "Data Source & Audit",
    auditHistoricalTitle: "1. Historical Coverage",
    auditHistorical: [["FX:", "FRED annual exchange-rate series; cross rates derived from USD base."], ["TFP:", "Penn World Table 11.0 rtfpna and ctfp; EU uses Germany as proxy, not an inferred EUR gap."], ["Rates/CPI:", "10Y uses FRED/OECD, ChinaBond and TPEx; CPI uses World Bank and data.gov.tw / DGBAS."]],
    auditForecastTitle: "2. Forecast / Gap Notes",
    auditForecast: [["Historical snapshot:", "PWT 11.0 runs through 2023; 2017-2023 rtfpna and ctfp values are from official PWT 11.0 data. 2024-2026 are recent extrapolations."], ["Recent extrapolation:", "TFP values for 2024-2026 use the 2017-2023 CAGR and remain marked as recent; future refreshes should recheck PWT or another authoritative release."], ["CN data:", "CN 10Y uses ChinaBond monthly samples; CN CPI uses World Bank, not inferred USDCNY spreads."]],
    sourceTitle: "Sources & Formulas",
    sourceRows: [["FX:", "USDCNY, EURUSD, USDJPY, USDKRW, USDTWD and USDINR use FRED annual exchange-rate series; other pairs are derived through USD-base cross-rate formulas, including EURCNY, EURJPY, EURTWD, EURKRW, EURINR, JPYTWD, JPYKRW, JPYINR, CNYJPY, CNYTWD, CNYKRW, CNYINR, TWDKRW and TWDINR."], ["10Y bonds:", "US, EU, JP, KR and IN use FRED/OECD annual averages; CN uses ChinaBond 10Y government yield-curve monthly samples; TW uses TPEx Government Bond & Corporate Bond Yield Curve 10Y monthly samples."], ["CPI:", "US, EU, CN, JP, KR and IN use World Bank FP.CPI.TOTL.ZG; TW uses data.gov.tw / DGBAS monthly CPI index annual inflation."], ["TFP:", "rtfpna: PWT constant national prices, rebased in the page to 2010 = 1; ctfp: PWT current PPPs, USA = 1. 2017-2023 values are from PWT 11.0; 2024-2026 use 2017-2023 CAGR extrapolation. US, CN, JP, KR, TW and IN use their own series; EU uses Germany as proxy."]],
    formulaRows: [["Real rate:", "Real rate is CPI-adjusted rate: Real Rate_A = 10Y_A - CPI_A."], ["Nominal spread:", "Nominal Spread_A/B = 10Y_A - 10Y_B."], ["Real spread:", "Real Spread_A/B = (10Y_A - CPI_A) - (10Y_B - CPI_B)."], ["TFP log spread:", "TFP Log Spread_A/B = ln(TFP_A) - ln(TFP_B)."]],
    tfpMethodTitle: "How the Two TFP Measures Differ",
    tfpMethodRows: [["rtfpna:", "PWT constant national prices, rebased in this page to 2010 = 1. Best for an economy's own productivity trend and pair-level productivity momentum since 2010."], ["ctfp:", "PWT current PPPs, USA = 1. Best for cross-country TFP level comparisons in a given year under purchasing-power-parity terms. It is not USD pricing and not an inflation-adjustment label."], ["Usage note:", "Pair charts use ln(TFP_A) - ln(TFP_B), matching the FX quote direction. Single-base charts show the selected economy's TFP, 10Y yield and real-rate history."]],
    formulaTitle: "Formula",
    latestUpdateTitle: "Latest Update",
    noLatestUpdates: "None",
    explorerStep1: "Step 1: Select Base Group",
    explorerStep2: "Step 2: Select Currency Pair",
    modes: { spread: "FX vs Nominal / Real Spread", "tfp-fx": "TFP Log Spread vs FX", "tfp-real": "TFP Log Spread vs Real Spread" },
    labels: { tfp: "TFP Log Spread", nominal: "Nominal Spread (%)", real: "Real Spread (%)", nominalRate: "10Y Government Bond Yield (%)", realRate: "Real Rate (%)" },
    tfpModeTitle: "TFP Measure",
    tfpModes: { rtfpna: "rtfpna · 2010=1", ctfp: "ctfp · USA=1" },
    tfpModeNote: "rtfpna compares productivity momentum relative to each economy's 2010 level; ctfp compares cross-country TFP levels at PWT current PPPs.",
    table: "Data Matrix",
    pairTable: "Pair Comparison Data",
    economyTable: "Economy Raw Data",
    countryFilter: "Economy",
    pairFilter: "Currency Pair",
    exportExcel: "Export Excel",
    year: "Year",
    missingSpread: "This pair does not have complete spread data, so spread curves are blank.",
  },
} satisfies Record<Locale, Record<string, unknown>>;
