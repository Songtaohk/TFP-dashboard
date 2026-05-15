# TFP Macro Asset Pricing Dashboard

中美欧宏观资产定价深度看板。当前网页同步自 `/Users/songtaozhang/TFP-Comp V20.html`，页面展示版本为 V11.0。页面展示 1999-2026 年 TFP 对数差、汇率、名义利差和实际利差，并提供中英文切换、交互图表、数据审计说明和数据明细表。

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
