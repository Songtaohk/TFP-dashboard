# TFP Macro Asset Pricing Dashboard

美欧亚 TFP 与汇率、利率长期关系看板。当前页面展示版本为 V12.4。页面展示 1999-2026 年 TFP 对数差、汇率、名义利差和实际利差，并提供中英文切换、TFP 口径切换、交互图表、数据审计说明和数据明细表。

## Run

```bash
npm install
npm run dev
```

本地开发地址：

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm test
npm run build
```

构建产物会输出到 `dist/`，可直接部署到 Vercel、Netlify 或其他静态站点托管服务。

## Vercel Deployment

1. 在 GitHub 新建仓库，例如 `tfp-dashboard`。
2. 将本项目推送到该仓库。
3. 在 Vercel 选择 `Add New Project` 并导入 GitHub 仓库。
4. 使用以下配置：
   - Framework Preset: `Vite`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. 部署完成后使用 Vercel 生成的公网地址访问。

## Notes

- 页面不依赖运行时 CDN；图表由项目依赖 `echarts` 渲染。
- 数据以内嵌静态数组发布，不依赖后台接口或数据库。
- 系统字体栈替代 Google Fonts，减少公网加载失败风险。
- 台湾 CPI 使用 data.gov.tw / 主计总处月度总指数计算年度通胀；台湾 10Y 国债收益率使用 TPEx “Government Bond & Corporate Bond Yield Curve” 文件中的 10 年期限行。
- 2024 年及以前作为历史快照保存；2025-2026 作为近期可刷新/可修订数据。USDCNY、EURUSD、EURCNY 已统一改用 FRED 年度汇率口径，CN 10Y/CPI 不再使用反推法，EU TFP 使用 Germany 代理。
- TFP 可在两套 PWT 口径间切换：`rtfpna` 使用 constant national prices 并在页面内重基准为 2010 = 1；`ctfp` 使用 current PPPs, USA = 1。2017-2023 使用 PWT 11.0 官方数据，2024-2026 使用 2017-2023 CAGR 外推。
- 实际利率在“数据明细”的公式区说明为 CPI-adjusted rate：`10Y - CPI inflation`；实际利差为两个经济体实际利率之差。
- 已新增多组交叉比较：`TWDKRW`、`TWDINR`、`CNYINR`、`JPYINR`、`EURTWD`、`EURKRW`、`EURINR`，汇率由 USD base 交叉公式派生。
