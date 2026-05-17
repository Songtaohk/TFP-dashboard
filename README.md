# TFP Macro Asset Pricing Dashboard

美欧亚 TFP 与汇率、利率长期关系看板。页面展示 1999-2026 年 TFP 对数差、汇率、名义利差和实际利差，并提供中英文切换、TFP 口径切换、交互图表、数据审计说明和数据明细表。

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

## Recent Data Refresh

近期原始数据通过独立脚本写回静态代码，避免用户打开网页时依赖外部 API。

```bash
npm run data:refresh
```

默认读取 `data/recent-official-updates.json`。你可以把已核实的官方新值写进这个文件，然后运行上面的命令；脚本会把数据写入 `src/data/tfpDashboard.ts`，并自动更新所有派生的 TFP log spread、名义利差、实际利差。

每月自动刷新：

- GitHub Actions 已配置 `.github/workflows/monthly-data-refresh.yml`，每月 5 日 02:00 UTC 自动运行一次。
- 也可以在 GitHub 仓库的 `Actions` 页面选择 `Monthly Data Refresh`，点击 `Run workflow` 手动运行。
- 如果脚本写入了新数据，工作流会自动提交 `src/data/tfpDashboard.ts`；Vercel 随后会按 GitHub 新提交自动部署。
- 当前脚本只会处理输入文件中已经列出的官方新值；真正自动上网抓取 PWT/FRED/World Bank/TPEx 等来源，需要继续补各来源的抓取模块或 API key。

更新规则：

- TFP：2024 年及以后可刷新；如 PWT 或其它权威来源公布正式值，则替代原外推值并写回代码，下一次同值不会重复记录。
- 其它原始数据：2025 年及以后可刷新，包括 FX、CPI、10Y 国债收益率。
- 脚本每次运行会重写“数据明细”里的“最新更新”：没有实际数值变化时显示“无”；有变化时显示日期、指标和来源说明。
- 已经由官方值替代的历史数据会作为快照保存在代码中；仍属预测或外推的数据，应继续留在后续刷新范围内。

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
- TFP 的 2024 年及以后作为近期可刷新/可修订数据；其它指标的 2025 年及以后作为近期可刷新/可修订数据。USDCNY、EURUSD、EURCNY 已统一改用 FRED 年度汇率口径，CN 10Y/CPI 不再使用反推法，EU TFP 使用 Germany 代理。
- TFP 可在两套 PWT 口径间切换：`rtfpna` 使用 constant national prices 并在页面内重基准为 2010 = 1；`ctfp` 使用 current PPPs, USA = 1。2017-2023 使用 PWT 11.0 官方数据，2024-2026 使用 2017-2023 CAGR 外推。
- 实际利率在“数据明细”的公式区说明为 CPI-adjusted rate：`10Y - CPI inflation`；实际利差为两个经济体实际利率之差。
- 已新增多组交叉比较：`TWDKRW`、`TWDINR`、`CNYINR`、`JPYINR`、`EURTWD`、`EURKRW`、`EURINR`，汇率由 USD base 交叉公式派生。
