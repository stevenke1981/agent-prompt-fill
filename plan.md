# Agent Prompt Fill — 專案計畫

> 參考來源：[stevenke1981/prompt-autofill](https://github.com/stevenke1981/prompt-autofill)（基於 PromptFill）  
> 目標：打造專為 **Agentic AI**（Cursor、Claude Code、Devin、Copilot Agent 等）設計的結構化提示詞填空器。

---

## 1. 專案背景

`prompt-autofill` 是面向 AI 繪圖的結構化提示詞工具。本專案 **agent-prompt-fill** 沿用其核心架構（`{{variable}}` 模板引擎、詞庫、發現頁、本機持久化），但將領域從「繪圖 Prompt」轉向 **自主代理（Agentic）工作流**：

- 系統提示詞（System Prompt）
- 任務分解與規劃
- 工具使用策略（Shell、Grep、MCP）
- 子代理編排與驗收標準
- 程式碼審查、除錯、重構、測試驅動開發

使用者透過可視化填空快速組裝可複製至 IDE / Agent 平台的完整指令。

---

## 2. 目標與非目標

### 2.1 目標（Must Have）

| 編號 | 目標 | 驗收標準 |
|------|------|----------|
| G1 | Agent 模板引擎 | 支援 `{{var}}`、多實例索引、雙語 zh-tw/en |
| G2 | Agent 詞庫 | 角色、工作流、工具、約束、輸出格式等分類詞庫 |
| G3 | 視覺編輯 | WYSIWYG 編輯、Undo/Redo、分類色高亮 |
| G4 | 發現頁 | 瀑布流瀏覽 Agent 模板、標籤篩選（coding、review、debug…） |
| G5 | 匯出分享 | 複製純文字、Markdown 長圖、一鍵開啟 Cursor Docs |
| G6 | 資料持久化 | LocalStorage + IndexedDB（大圖/圖示） |
| G7 | 匯入匯出 | JSON 備份、匯入前自動 snapshot |
| G8 | 行動端 | 響應式、MobileTabBar |
| G9 | 驗收區塊 | 內建 Agent Deliverables 區段（交付物、驗收標準） |
| G10 | 開發者文件 | AGENTS.md 供 AI 代理維護本 repo |

### 2.2 非目標（Phase 1）

- 直接呼叫 LLM API 執行代理
- 雲端帳號與團隊協作
- 與 Cursor / Claude 的 OAuth 整合
- TypeScript 全量遷移

---

## 3. 技術架構

```
agent-prompt-fill/
├── public/                 # favicon、version.json
├── src/
│   ├── App.jsx
│   ├── components/         # 沿用 prompt-autofill 元件
│   ├── constants/          # translations、styles、deliverables（Agent 版）
│   ├── data/               # templates.js、banks.js（Agent 種子資料）
│   ├── hooks/
│   ├── services/
│   ├── utils/              # promptEngine、merge、backup
│   └── __tests__/
├── e2e/
├── plan.md spec.md todos.md test.md final.md AGENTS.md
└── vite.config.js
```

### 技術棧

| 層級 | 選型 |
|------|------|
| 建置 | Vite 5 |
| UI | React 18 + Tailwind 3 |
| 測試 | Vitest + Playwright |
| 儲存 | LocalStorage + IndexedDB |

---

## 4. 相對 prompt-autofill 的差異化

| 編號 | 項目 | 說明 |
|------|------|------|
| A1 | 領域詞庫 | 繪圖詞庫 → Agent 角色、工具策略、約束、驗收 |
| A2 | 內建模板 | 18+ 繪圖模板 → 12+ Agent 工作流模板 |
| A3 | 分類體系 | 人物/畫面 → 角色/流程/工具/約束/輸出/情境 |
| A4 | Deliverables | 畫幅/解析度 → PR、測試、文件、驗收清單 |
| A5 | 匯出捷徑 | Gemini → Cursor 文件連結（可選） |
| A6 | 標籤 | 建築/攝影 → coding、review、debug、plan、test |
| A7 | AGENTS.md | 供維護本專案的 AI 代理閱讀 |

---

## 5. 實作階段

### Phase 0 — 文件（本輪）
- [x] plan.md、spec.md、todos.md、test.md、final.md、AGENTS.md

### Phase 1 — 骨架與種子資料
- [ ] 從 prompt-autofill 複製源碼
- [ ] 替換 templates.js、banks.js、deliverables.js
- [ ] 更新翻譯與品牌

### Phase 2 — 核心驗證
- [ ] npm install && npm run dev
- [ ] 發現頁 → 填空 → 複製全流程
- [ ] JSON 匯入匯出

### Phase 3 — 測試交付
- [ ] npm test、npm run build
- [ ] 更新 final.md、驗收勾選

---

## 6. 風險與緩解

| 風險 | 緩解 |
|------|------|
| 大量沿用繪圖 UI 文案 | 系統性更新 translations.js |
| 模板變數與詞庫 key 不一致 | extractVariableKeys 啟動檢查 + 單測 |
| App.jsx 體積大 | 僅改 data/constants，不重構 App |

---

## 7. 成功指標

1. `npm run dev` 可完成「選 Agent 模板 → 填空 → 複製」全流程
2. `npm run build` 零錯誤
3. `npm test` 全綠（≥25 案例）
4. 內建 ≥12 個 Agent 模板、≥25 組詞庫
5. AGENTS.md 可被外部 AI 代理直接遵循

---

## 8. 參考連結

- [stevenke1981/prompt-autofill](https://github.com/stevenke1981/prompt-autofill)
- [doggy8088/PromptFill](https://github.com/doggy8088/PromptFill)