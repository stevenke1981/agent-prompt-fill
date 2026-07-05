# AGENTS.md — AI 代理維護指南

本文件供 Cursor、Claude Code 等 **Agentic AI** 在維護 `agent-prompt-fill` 時閱讀。

---

## 專案定位

結構化 **Agent 提示詞填空器**（非繪圖工具）。核心：React + Vite + `{{variable}}` 模板引擎 + LocalStorage 持久化。

---

## 目錄結構

```
src/
├── App.jsx              # 主應用（~2600 行，避免大規模重構）
├── data/
│   ├── templates.js     # ★ Agent 模板種子（改動頻率高）
│   └── banks.js         # ★ Agent 詞庫種子
├── constants/
│   ├── translations.js  # UI 雙語
│   ├── deliverables.js  # 模板末尾驗收區段
│   └── styles.js        # 標籤/分類色
├── utils/promptEngine.js  # 變數解析與替換（勿破壞 API）
├── services/storage.js    # IndexedDB，DB 名 agent-prompt-fill
└── __tests__/             # Vitest
```

---

## 開發指令

```bash
npm install
npm run dev      # http://localhost:1420
npm test         # 必須全綠再提交
npm run build
npm run test:e2e
```

---

## 修改規則

### 新增 Agent 模板

1. 在 `src/data/templates.js` 的 `INITIAL_TEMPLATES_CONFIG` 新增項目
2. 所有 `{{var}}` 必須在 `banks.js` 有對應 key 或在 `INITIAL_DEFAULTS`
3. 更新 `SYSTEM_DATA_VERSION`（語意化版本，如 `1.0.0`）
4. 同步 `public/version.json` 的 `systemDataVersion`
5. 執行 `npm test` 確認 `deliverables.test.js` / 種子測試通過

### 新增詞庫

1. 在 `INITIAL_BANKS` 新增 key
2. 指定 `category`（persona | workflow | tools | constraints | output | context）
3. 在 `INITIAL_DEFAULTS` 設預設值

### 勿修改（除非必要）

- `promptEngine.js` 的 `getInstanceKey` / `resolvePrompt` 簽名
- `merge.js` 合併語意（使用者自訂資料不可被系統更新覆蓋）
- LocalStorage key 名稱（會導致使用者資料遺失）

### UI 文案

- 品牌：**Agent 提示詞填空器** / **Agent Prompt Fill**
- 避免殘留「繪圖」「Gemini」「畫幅」等繪圖領域用語

---

## 測試要求

- 改 `templates.js` / `banks.js` / `deliverables.js` → 跑 `npm test`
- 改 `App.jsx` 互動流程 → 跑 `npm run test:e2e`
- PR 前：`npm run build` 零錯誤

---

## 規格文件

實作前請對照：

- `spec.md` — 資料模型與功能
- `test.md` — 驗收案例
- `todos.md` — 進度追蹤

---

## 提交前檢查清單

- [ ] `SYSTEM_DATA_VERSION` 已遞增
- [ ] 新模板變數均有詞庫
- [ ] `npm test` 全綠
- [ ] `npm run build` 通過
- [ ] 無繪圖領域殘留文案（搜尋：畫幅、Gemini、攝影、九宮格）