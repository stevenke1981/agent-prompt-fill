# Agent Prompt Fill — 功能規格書

> 版本：1.0.0-alpha  
> 基準：prompt-autofill v1.0.0 + Agentic 領域適配

---

## 1. 名詞定義

| 名詞 | 定義 |
|------|------|
| **Agent 模板** | 含 `{{variable}}` 的系統/任務提示詞，面向自主代理 |
| **詞庫 (Bank)** | 變數名 → 候選值列表（角色、工具策略、約束等） |
| **工作流標籤** | coding、review、debug、plan、test、refactor、docs、security |
| **Deliverables** | 模板末尾標準化「交付物與驗收標準」區段 |

---

## 2. 資料模型

### 2.1 Template（與原版相容，語意調整）

```typescript
interface Template {
  id: string;
  name: string | LocalizedString;
  content: string | LocalizedString;
  imageUrl?: string;           // 模板封面（可選示意圖或漸層 SVG）
  selections?: Record<string, string | LocalizedString>;
  tags?: string[];             // coding | review | debug | plan | test | refactor | docs | security
  language?: 'zh-tw' | 'en' | ('zh-tw' | 'en')[];
}
```

### 2.2 Category（Agent 分類）

| id | label zh-tw | 用途 |
|----|-------------|------|
| persona | 角色 | agent_role、expertise_level |
| workflow | 流程 | steps、planning_style、verification |
| tools | 工具 | tool_policy、shell_usage、mcp_tools |
| constraints | 約束 | scope、breaking_changes、style_rules |
| output | 輸出 | output_format、deliverable_primary |
| context | 情境 | project_type、tech_stack、repo_context |

### 2.3 持久化 Keys

與 prompt-autofill 相同，LocalStorage key 前綴改為 `agent-prompt-fill`（IDB 資料庫名）。

| Key | 內容 |
|-----|------|
| `templates` | Template[] |
| `banks` | Banks |
| `defaults` | 預設選項 |
| `categories` | Category map |
| `app_language` | zh-tw \| en |
| `system_data_version` | 種子資料版本 |

### 2.4 IndexedDB

- Database：`agent-prompt-fill`
- Store：`images`

---

## 3. 內建 Agent 模板清單（≥12）

| ID | 名稱 | 標籤 |
|----|------|------|
| tpl_agent_system | 通用 Coding Agent 系統提示 | coding |
| tpl_task_plan | 任務分解與執行計畫 | plan |
| tpl_code_review | 程式碼審查代理 | review |
| tpl_bug_fix | Bug 調查與修復 | debug |
| tpl_feature_impl | 功能實作工作流 | coding |
| tpl_react_tools | ReAct 工具使用模式 | coding |
| tpl_subagent | 子代理委派編排 | plan |
| tpl_tdd | 測試驅動開發代理 | test |
| tpl_refactor | 安全重構代理 | refactor |
| tpl_docs | 技術文件撰寫 | docs |
| tpl_security | 安全審計代理 | security |
| tpl_mcp | MCP 工具整合提示 | coding |
| tpl_debug_investigate | 根因分析與除錯 | debug |
| tpl_spec_driven | 規格驅動開發 | plan |

每模板含 `selections` 預設值，content 使用 `### Role`、`### Task`、`### Workflow`、`### Tools`、`### Constraints` 結構。

---

## 4. 內建詞庫（≥25 組）

核心詞庫 key 範例：

- `agent_role`、`expertise_level`、`task_type`
- `tech_stack`、`project_context`、`repo_size`
- `tool_policy`、`shell_policy`、`read_before_write`
- `autonomy_level`、`ask_before`、`verification_strategy`
- `output_format`、`communication_style`、`error_handling`
- `scope_constraint`、`test_requirement`、`pr_style`
- `deliverable_primary`、`output_format`、`acceptance_criteria`
- `subagent_role`、`delegation_trigger`、`merge_strategy`
- `mcp_server`、`tool_naming`、`retry_policy`

---

## 5. 核心功能規格

### 5.1 promptEngine（沿用）

```js
parseVariables(content): string[]
getInstanceKey(varName, occurrenceIndex): string
resolvePrompt(content, selections, defaults, language): string
resolveAndCleanPrompt(...): string  // 移除 ### 與 ** 用於純文字複製
countStats(text): { chars, tokensEstimate }
```

### 5.2 Deliverables 區段（Agent 版）

自動附加至無 Deliverables 的模板：

- 主要交付物（PR、測試報告、設計文件…）
- 輸出格式（Markdown、JSON plan、diff only…）
- 驗收標準（測試通過、無 lint 錯誤、文件更新…）
- 禁止事項（不修改無關檔案、不刪除測試…）

### 5.3 匯出

| 動作 | 行為 |
|------|------|
| 複製結果 | `resolveAndCleanPrompt` 純文字 |
| Ctrl+Shift+C | 同上 |
| 儲存長圖 | html2canvas JPG（保留） |
| JSON 匯出/匯入 | 含自動備份 |

### 5.4 發現頁標籤

`TEMPLATE_TAGS`：`coding`、`review`、`debug`、`plan`、`test`、`refactor`、`docs`、`security`

### 5.5 國際化

- UI：zh-tw / en
- 模板與詞庫選項支援雙語物件

---

## 6. UI 調整

| 元素 | 原版 | Agent 版 |
|------|------|----------|
| 標題 | 提示詞填空器 | Agent 提示詞填空器 |
| 副標題 | AI 繪圖 | Agentic AI 工作流 |
| export_image 按鈕 | Gemini | 長圖匯出 |
| 新模板預設內容 | 繪圖 Deliverables | Agent Deliverables |

---

## 7. 效能與瀏覽器

與 prompt-autofill 相同：Chrome/Edge/Firefox/Safari 現代版本。

---

## 8. 授權

MIT，致謝 prompt-autofill / PromptFill 原作者。