# Agent Prompt Fill — 交付摘要

> 狀態：**全部完成**  
> 最後更新：2026-07-05

---

## 1. 專案概述

**agent-prompt-fill v1.0.0** — 參考 [prompt-autofill](https://github.com/stevenke1981/prompt-autofill)，專為 Agentic AI 工作流設計的結構化提示詞填空器。

---

## 2. 驗證結果

| 檢查項 | 結果 |
|--------|------|
| `npm run build` | ✅ 通過 |
| `npm test`（Vitest） | ✅ 34/34 |
| `npm run test:e2e`（Playwright） | ✅ 3/3 |
| 開發伺服器 | ✅ http://localhost:1420 |

### E2E 覆蓋流程

1. 發現頁 → 選「通用 Coding Agent」→ 複製 Prompt（含 Role/角色）
2. 詞庫搜尋 `agent_role`
3. 設定 → 深色模式切換

---

## 3. Agent 領域交付物

| 項目 | 數量 | 狀態 |
|------|------|------|
| 內建 Agent 模板 | 20 | ✅ |
| 詞庫組 | 68 | ✅ |
| 分類 | 6（角色/流程/工具/約束/輸出/情境） | ✅ |
| Deliverables 驗收區段 | Agent 版 | ✅ |
| AGENTS.md | AI 代理維護指南 | ✅ |

### 內建模板一覽

- 通用 Coding Agent 系統提示
- 任務分解與執行計畫
- 程式碼審查代理
- Bug 調查與修復
- 功能實作工作流
- ReAct 工具使用模式
- 子代理委派編排
- 測試驅動開發代理
- 安全重構代理
- 技術文件撰寫
- 安全審計代理
- MCP 工具整合提示
- 根因分析與除錯
- 規格驅動開發
- 設計單一 Agent（Agentic）
- 深度研究團隊設計（Anthropic 式）
- Agents 開發團隊設計
- 小說家寫作團隊（CrewAI 式）
- 創意內容工作室團隊
- 層級式多代理團隊

---

## 4. 使用方式

```bash
npm install
npm run dev          # http://localhost:1420
npm run build
npm test             # 34 案例
npm run test:e2e     # 3 smoke 案例
```

---

## 5. 文件索引

- [plan.md](./plan.md)
- [spec.md](./spec.md)
- [test.md](./test.md)
- [todos.md](./todos.md)
- [AGENTS.md](./AGENTS.md)
- [README.md](./README.md)

---

## 6. 致謝

- [stevenke1981/prompt-autofill](https://github.com/stevenke1981/prompt-autofill)
- [doggy8088/PromptFill](https://github.com/doggy8088/PromptFill)