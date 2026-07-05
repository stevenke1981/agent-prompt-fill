# Agent Prompt Fill — 測試計畫

---

## 1. 測試策略

| 層級 | 工具 | 範圍 |
|------|------|------|
| 單元 | Vitest | promptEngine、merge、helpers、storage、deliverables |
| 建置 | vite build | 生產打包 |
| E2E | Playwright | 發現頁、填空、複製、深色模式 |
| 手動 | 瀏覽器 | Agent 模板內容正確性 |

---

## 2. 指令

```bash
npm test              # Vitest
npm run build         # 建置
npm run test:e2e      # Playwright（需 install chromium）
npm run dev           # 開發伺服器 :1420
```

---

## 3. 單元測試（沿用 + 新增）

### 3.1 promptEngine.js — 不變（PE-01 ~ PE-10）

### 3.2 deliverables.js — Agent 版

| ID | 案例 | 預期 |
|----|------|------|
| AD-01 | withDeliverables 字串 | 附加 Agent Deliverables |
| AD-02 | 已有 Deliverables | 不重複附加 |
| AD-03 | 雙語物件 | zh-tw / en 各自附加 |

### 3.3 templates 種子資料

| ID | 案例 | 預期 |
|----|------|------|
| SD-01 | INITIAL_TEMPLATES_CONFIG.length | ≥12 |
| SD-02 | 每模板 extractVariableKeys | 所有 key 在 banks 或 defaults |
| SD-03 | SYSTEM_DATA_VERSION | 字串非空 |
| SD-04 | 每個系統模板封面 | `imageUrl` 為本機 JPEG 且檔案存在 |

### 3.4 其餘（helpers、merge、storage、useKeyboardShortcuts）— 沿用

---

## 4. E2E 驗收（e2e/smoke.spec.js）

1. 首頁標題含「Agent」
2. 發現頁 → 選模板 → 複製 Prompt（剪貼簿非空）
3. 詞庫搜尋過濾
4. 設定 → 深色模式 `html.dark`

---

## 5. 手動驗收清單

### 5.1 啟動
- [ ] `npm run dev` 開啟 http://localhost:1420
- [ ] 發現頁顯示 Agent 模板（非繪圖主題）

### 5.2 填空
- [ ] 選「通用 Coding Agent」模板
- [ ] 下拉變更 `agent_role`、`tech_stack`
- [ ] 統計列顯示字元/token
- [ ] 複製結果含 Role/Task 段落

### 5.3 編輯
- [ ] 切換編輯模式
- [ ] 拖曳詞庫插入 `{{tool_policy}}`
- [ ] Undo/Redo

### 5.4 持久化
- [ ] 重整後 selections 保留
- [ ] JSON 匯出含 templates+banks
- [ ] 匯入前產生 backup key

### 5.5 雙語
- [ ] 切換 en 後 UI 與模板內容為英文

---

## 6. 通過標準

- `npm test` 0 failure
- `npm run build` exit 0
- E2E smoke 全過
- 手動 §5.1–5.5 全勾
