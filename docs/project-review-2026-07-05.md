# agent-prompt-fill 專案檢視與優化建議

> 檢視日期：2026-07-05
> 方法：以 Codebase Memory（CBM）完整索引 62 個檔案、87 個符號、328 條關聯，再對高風險路徑、規格、測試與靜態資產做人工核對。

## 摘要

專案的提示詞引擎、種子資料驗證、資料合併測試與基本 E2E 已具備良好基礎，但仍保留數個從 `prompt-autofill` 繼承的高風險行為。最需要先處理的不是大規模重構，而是避免自動同步覆寫 Agent 資料、修正「長圖匯出」實際開啟 Gemini 的功能落差，以及補上正式 CI。

本次已直接修正「20 個內建模板皆缺少封面」的缺口，並在系統資料升級時保留使用者自訂封面。

## 已完成改善

1. **補齊 20 張模板封面**
   - 使用 Codex 內建生圖功能製作一致風格的 3:4 封面。
   - 原始 1086×1448 PNG 經縮放與 JPEG 壓縮為 720×960。
   - 20 張圖片合計約 2.3 MB，適合發現頁延遲載入。
   - 資產位置：`public/template-covers/`。

2. **防止系統更新覆蓋使用者圖片**
   - `mergeTemplatesWithSystem` 現在會保留既有 `imageUrl` / `imageUrls`。
   - 新增回歸測試，確保系統資料版本更新不會清除使用者封面。

3. **建立封面完整性門檻**
   - 種子測試會檢查每個系統模板都有本機 JPEG 封面，且檔案實際存在。
   - `SYSTEM_DATA_VERSION` 與 `public/version.json` 同步更新為 `1.2.0`。

4. **隔離 CBM 工具快取**
   - `.codebase-memory/` 已加入 `.gitignore`，避免本機索引誤入版本控制。

## 優先改善清單

### P0 — 立即處理

#### 1. 停用或重設上游自動同步，避免每日覆寫 Agent 種子資料

- 證據：`.github/workflows/sync-upstream.yml` 每日執行；`.github/workflows/sync-upstream.mjs` 直接下載 PromptFill 的 `banks.js` 與 `templates.js`，再覆寫本專案同名檔案。
- 風險：Agent 專用模板、詞庫、版本與封面欄位可能被繪圖領域上游整批取代，且自動建立帶有破壞性差異的分支。
- 建議：先停用 schedule，只保留手動觸發；若仍要同步，改成下載至暫存目錄並執行 schema/domain 驗證，最後產出差異報告而非直接覆寫。

#### 2. 修正「長圖匯出」功能與規格不一致

- 證據：`spec.md` 宣告使用 `html2canvas` 匯出 JPG，但 `src/App.jsx` 的 `handleExportImage` 實際開啟 Gemini 網址；`html2canvas` 雖已匯入卻未用於此流程。
- 風險：使用者以為會下載本機長圖，實際卻把完整提示詞帶到第三方服務；這同時是功能錯誤與隱私邊界問題。
- 建議：恢復本機 `html2canvas` 下載流程。若保留第三方開啟功能，必須改名、明確告知資料會離開本機，並由使用者主動確認。

### P1 — 下一個小版本

#### 3. 增加正式 CI，而不是只保留同步工作流

- 現況：`.github/workflows/` 只有上游同步，沒有在 push / pull request 執行測試、lint、build。
- 驗證發現：`package.json` 雖宣告 `npm run lint`，repository 內沒有 ESLint 設定檔，指令目前會直接以 exit 2 失敗。
- 驗證發現：Playwright 設定固定使用 1420 且 `reuseExistingServer: true`；本機若另一個 Vite 專案占用該 port，測試會安靜地跑到錯誤應用程式。
- 建議：新增 Node LTS matrix 的 `npm ci`、`npm test`、`npm run lint`、`npm run build`；E2E 可獨立成較慢的 job。
- 前置工作：先依現有程式風格補上最小 ESLint 設定，清理既有錯誤後再把 `--max-warnings 0` 設為 CI 門檻。
- E2E 隔離：使用專用 test port、CI 中禁止 reuse，或先驗證頁面識別資訊再進入測試。

#### 4. 升級有已知漏洞的開發工具鏈

- 驗證發現：`npm audit` 回報 14 項（1 critical、5 high、7 moderate、1 low）；直接依賴中的 Vitest 為 critical，Vite 為 high，PostCSS 為 moderate。
- 建議：在獨立分支升級 Vite、Vitest、PostCSS 與相關 lockfile，完整重跑 unit / build / E2E；不要直接使用 `npm audit fix --force`。

#### 5. 修正無效的預設模板 ID

- 證據：`src/App.jsx` 將 `activeTemplateId` 預設為不存在的 `tpl_default`，畫面靠 `templates[0]` 回退。
- 風險：顯示的模板與狀態 ID 不一致；首次載入若直接上傳圖片或執行依 ID 更新的操作，可能找不到任何模板。
- 建議：預設改為 `tpl_agent_system`，並在讀取持久化 ID 後驗證是否仍存在。

#### 6. 統一並文件化 LocalStorage key 與清除策略

- 證據：規格描述 `templates`、`banks` 等 key，實作使用 `app_templates_v10`、`app_banks_v9` 等版本化名稱；清除資料流程仍移除舊的 `app_templates`。
- 風險：重設不完整、舊資料永久殘留、後續遷移難以推理。
- 建議：集中定義 storage key registry，提供版本遷移與「列舉後清除」測試，避免在 `App.jsx` 散落字串。

#### 7. 修正仍指向舊專案的連結與品牌殘留

- 證據：`DiscoveryView.jsx`、`TemplatesSidebar.jsx` 的 GitHub 連結仍指向 `prompt-autofill`；`App.jsx`、`gemini.svg`、`gemini_muji` 仍保留 Gemini 命名。
- 建議：產品連結改為本專案 repository；致謝區再保留上游連結。品牌文案與 icon 應依實際功能命名。

#### 8. 補強圖片失敗與自訂模板的邊界案例

- 證據：新增圖片時使用 `t.imageUrls || [t.imageUrl]`；無封面的自訂模板會產生首項為 `undefined` 的陣列。遠端圖片載入失敗也沒有一致 fallback。
- 建議：建立 `normalizeImageUrls(template)`，過濾空值並統一首圖；圖片元件加入 `onError` fallback 與測試。

### P2 — 可維護性與體驗

#### 9. 漸進拆分 `App.jsx`

- 現況：`App.jsx` 同時負責版本檢查、儲存、分享、匯入匯出、圖片、模板編輯、行動端拖曳與大量 UI 狀態。
- 建議：不要一次重寫；優先抽出 `useSystemDataSync`、`useTemplateImages`、`useShareImport` 三個高內聚流程，每次拆分都用現有測試保護行為。

#### 10. 改善發現頁可存取性與響應式狀態

- 證據：模板卡片使用帶 `onClick` 的 `div`，缺少鍵盤操作與按鈕語意；行動版判斷直接讀 `window.innerWidth`，不會隨 resize / orientation change 更新。
- 建議：卡片改為 `button` 或補齊 role、tabIndex、鍵盤處理；使用 `matchMedia` hook 管理斷點。

#### 11. 將 IndexedDB 初始化移出模組頂層

- 證據：`src/App.jsx` import 後立即執行 `initStorage()`。
- 風險：測試、SSR 類環境與錯誤恢復較難控制。
- 建議：放入 App 啟動 effect 或 storage provider，並讓初始化狀態與錯誤可觀測。

#### 12. 拆分首屏 bundle

- 驗證發現：Vite build 通過，但主 JavaScript chunk 約 560 kB（gzip 約 158 kB），超過 Vite 500 kB 警告門檻。
- 建議：優先 lazy-load 設定、圖片預覽、匯入匯出等非首屏功能；先量測再決定是否配置 manual chunks。

## 建議執行順序

1. 停用破壞性上游 schedule。
2. 修正長圖匯出與第三方資料傳送邊界。
3. 升級有漏洞的工具鏈並新增 CI。
4. 修正預設模板 ID、storage key registry 與圖片 normalization。
5. 處理舊品牌連結、E2E 隔離與可存取性。
6. 最後再以小步驟拆分 `App.jsx` 與首屏 bundle。

## 驗收建議

- `npm test`
- `npm run lint`
- `npm run build`
- `npm run test:e2e`
- 手動確認 20 張封面在桌面與行動發現頁皆可載入。
- 建立一個自訂封面，模擬 `SYSTEM_DATA_VERSION` 升級後確認仍被保留。
