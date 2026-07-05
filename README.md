# Agent Prompt Fill

專為 **Agentic AI**（Cursor、Claude Code、Copilot Agent 等）設計的結構化提示詞填空器。參考 [prompt-autofill](https://github.com/stevenke1981/prompt-autofill) 架構，領域改為代理工作流。

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](public/version.json)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 功能特色

- **Agent 模板引擎**：`{{variable}}` 語法、多實例索引、雙語 zh-tw / en
- **詞庫系統**：角色、流程、工具、約束、輸出、情境六大分類
- **內建模板**：Coding Agent、任務規劃、Code Review、TDD、MCP、子代理編排等 14+ 模板
- **Deliverables 區段**：標準化交付物與驗收標準
- **本機優先**：LocalStorage + IndexedDB
- **深色模式**、快捷鍵、JSON 備份匯入

## 快速開始

```bash
npm install
npm run dev
```

開啟 [http://localhost:1420](http://localhost:1420)

## 測試

```bash
npm test
npm run build
npm run test:e2e
```

## 文件

- [plan.md](./plan.md) — 專案計畫
- [spec.md](./spec.md) — 功能規格
- [test.md](./test.md) — 測試計畫
- [todos.md](./todos.md) — 實作進度
- [final.md](./final.md) — 交付摘要
- [AGENTS.md](./AGENTS.md) — AI 代理維護指南

## 致謝

- [stevenke1981/prompt-autofill](https://github.com/stevenke1981/prompt-autofill)
- [doggy8088/PromptFill](https://github.com/doggy8088/PromptFill)

## 授權

MIT