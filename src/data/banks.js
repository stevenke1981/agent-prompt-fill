// Agent 詞庫與分類 — agent-prompt-fill

export const INITIAL_CATEGORIES = {
  persona: { id: 'persona', label: { 'zh-tw': '角色', en: 'PERSONA' }, color: 'blue' },
  workflow: { id: 'workflow', label: { 'zh-tw': '流程', en: 'WORKFLOW' }, color: 'amber' },
  tools: { id: 'tools', label: { 'zh-tw': '工具', en: 'TOOLS' }, color: 'rose' },
  constraints: { id: 'constraints', label: { 'zh-tw': '約束', en: 'CONSTRAINTS' }, color: 'emerald' },
  output: { id: 'output', label: { 'zh-tw': '輸出', en: 'OUTPUT' }, color: 'violet' },
  context: { id: 'context', label: { 'zh-tw': '情境', en: 'CONTEXT' }, color: 'slate' },
};

export const INITIAL_BANKS = {
  agent_role: {
    label: { 'zh-tw': '代理角色', en: 'Agent Role' },
    category: 'persona',
    options: [
      { 'zh-tw': '資深全端工程師', en: 'Senior Full-Stack Engineer' },
      { 'zh-tw': 'Staff 軟體架構師', en: 'Staff Software Architect' },
      { 'zh-tw': 'DevOps / SRE 專家', en: 'DevOps / SRE Specialist' },
      { 'zh-tw': '資安審計工程師', en: 'Security Audit Engineer' },
      { 'zh-tw': '技術文件工程師', en: 'Technical Documentation Engineer' },
      { 'zh-tw': 'QA / 測試自動化工程師', en: 'QA / Test Automation Engineer' },
    ],
  },
  expertise_level: {
    label: { 'zh-tw': '專業程度', en: 'Expertise Level' },
    category: 'persona',
    options: [
      { 'zh-tw': '謹慎保守、每步確認', en: 'Cautious, confirm each step' },
      { 'zh-tw': '平衡務實、關鍵節點確認', en: 'Balanced, confirm at key milestones' },
      { 'zh-tw': '高度自主、僅阻塞時詢問', en: 'Highly autonomous, ask only when blocked' },
    ],
  },
  task_type: {
    label: { 'zh-tw': '任務類型', en: 'Task Type' },
    category: 'workflow',
    options: [
      { 'zh-tw': '新功能開發', en: 'New feature development' },
      { 'zh-tw': 'Bug 修復', en: 'Bug fix' },
      { 'zh-tw': '程式碼審查', en: 'Code review' },
      { 'zh-tw': '重構與技術債', en: 'Refactoring & tech debt' },
      { 'zh-tw': '撰寫測試', en: 'Writing tests' },
      { 'zh-tw': '撰寫文件', en: 'Documentation' },
      { 'zh-tw': '系統設計', en: 'System design' },
      { 'zh-tw': '設計單一 Agent', en: 'Design a single agent' },
      { 'zh-tw': '設計多代理團隊', en: 'Design multi-agent team' },
      { 'zh-tw': '創意寫作專案', en: 'Creative writing project' },
      { 'zh-tw': '深度研究調查', en: 'Deep research investigation' },
    ],
  },
  tech_stack: {
    label: { 'zh-tw': '技術棧', en: 'Tech Stack' },
    category: 'context',
    options: [
      { 'zh-tw': 'React + TypeScript + Vite', en: 'React + TypeScript + Vite' },
      { 'zh-tw': 'Node.js + Express + PostgreSQL', en: 'Node.js + Express + PostgreSQL' },
      { 'zh-tw': 'Python + FastAPI', en: 'Python + FastAPI' },
      { 'zh-tw': 'Go + gRPC + Kubernetes', en: 'Go + gRPC + Kubernetes' },
      { 'zh-tw': 'Rust + WASM', en: 'Rust + WASM' },
      { 'zh-tw': '任意（依 repo 偵測）', en: 'Any (detect from repo)' },
    ],
  },
  project_context: {
    label: { 'zh-tw': '專案情境', en: 'Project Context' },
    category: 'context',
    options: [
      { 'zh-tw': '既有大型 monorepo', en: 'Existing large monorepo' },
      { 'zh-tw': '新專案從零開始', en: 'Greenfield project' },
      { 'zh-tw': '遺留系統維護', en: 'Legacy system maintenance' },
      { 'zh-tw': '開源函式庫', en: 'Open-source library' },
      { 'zh-tw': '內部工具 / CLI', en: 'Internal tool / CLI' },
    ],
  },
  repo_size: {
    label: { 'zh-tw': '程式庫規模', en: 'Repo Size' },
    category: 'context',
    options: [
      { 'zh-tw': '小型（< 50 檔案）', en: 'Small (< 50 files)' },
      { 'zh-tw': '中型（50–500 檔案）', en: 'Medium (50–500 files)' },
      { 'zh-tw': '大型（500+ 檔案）', en: 'Large (500+ files)' },
    ],
  },
  tool_policy: {
    label: { 'zh-tw': '工具使用策略', en: 'Tool Policy' },
    category: 'tools',
    options: [
      { 'zh-tw': '先讀後寫：修改前必須 Read/Grep 相關檔案', en: 'Read before write: must Read/Grep before edits' },
      { 'zh-tw': '最小工具呼叫：合併搜尋、避免重複讀檔', en: 'Minimal tool calls: batch searches, avoid re-reads' },
      { 'zh-tw': '積極探索：廣泛 Grep/Glob 再聚焦', en: 'Explore first: broad Grep/Glob then narrow' },
      { 'zh-tw': '僅在必要時執行 Shell', en: 'Shell only when necessary' },
    ],
  },
  shell_policy: {
    label: { 'zh-tw': 'Shell 策略', en: 'Shell Policy' },
    category: 'tools',
    options: [
      { 'zh-tw': '可執行 build/test/lint，禁止破壞性指令', en: 'May run build/test/lint; no destructive commands' },
      { 'zh-tw': '僅唯讀指令（ls、cat、git status）', en: 'Read-only commands only (ls, cat, git status)' },
      { 'zh-tw': '完整開發權限（含 npm install、git commit）', en: 'Full dev permissions (npm install, git commit)' },
    ],
  },
  autonomy_level: {
    label: { 'zh-tw': '自主程度', en: 'Autonomy Level' },
    category: 'workflow',
    options: [
      { 'zh-tw': '低：每個檔案變更前詢問', en: 'Low: ask before each file change' },
      { 'zh-tw': '中：完成子任務後彙報', en: 'Medium: report after each subtask' },
      { 'zh-tw': '高：完成全部後一次交付', en: 'High: deliver once when complete' },
    ],
  },
  verification_strategy: {
    label: { 'zh-tw': '驗證策略', en: 'Verification Strategy' },
    category: 'workflow',
    options: [
      { 'zh-tw': '每次修改後執行相關測試', en: 'Run related tests after each change' },
      { 'zh-tw': '完成後執行完整 test suite + build', en: 'Full test suite + build when done' },
      { 'zh-tw': '手動檢查清單 + 自動測試', en: 'Manual checklist + automated tests' },
      { 'zh-tw': '靜態分析（lint、typecheck）必過', en: 'Static analysis (lint, typecheck) must pass' },
    ],
  },
  planning_style: {
    label: { 'zh-tw': '規劃風格', en: 'Planning Style' },
    category: 'workflow',
    options: [
      { 'zh-tw': '先寫 plan.md 再實作', en: 'Write plan.md before coding' },
      { 'zh-tw': '口頭步驟清單（3–7 步）', en: 'Verbal step list (3–7 steps)' },
      { 'zh-tw': 'DAG / 依賴圖分解', en: 'DAG / dependency graph decomposition' },
      { 'zh-tw': '規格驅動（spec → impl → test）', en: 'Spec-driven (spec → impl → test)' },
    ],
  },
  output_format: {
    label: { 'zh-tw': '輸出格式', en: 'Output Format' },
    category: 'output',
    options: [
      { 'zh-tw': 'Markdown 報告 + 程式碼變更', en: 'Markdown report + code changes' },
      { 'zh-tw': '純程式碼 diff（最少說明）', en: 'Code diff only (minimal prose)' },
      { 'zh-tw': '結構化 JSON（步驟、檔案、風險）', en: 'Structured JSON (steps, files, risks)' },
      { 'zh-tw': 'PR 描述格式（摘要、變更、測試）', en: 'PR description format (summary, changes, tests)' },
    ],
  },
  communication_style: {
    label: { 'zh-tw': '溝通風格', en: 'Communication Style' },
    category: 'output',
    options: [
      { 'zh-tw': '簡潔技術向、無廢話', en: 'Concise technical, no filler' },
      { 'zh-tw': '教學式、解釋決策原因', en: 'Educational, explain rationale' },
      { 'zh-tw': '條列式進度更新', en: 'Bullet-point progress updates' },
    ],
  },
  scope_constraint: {
    label: { 'zh-tw': '範圍約束', en: 'Scope Constraint' },
    category: 'constraints',
    options: [
      { 'zh-tw': '僅修改與任務直接相關的檔案', en: 'Only touch files directly related to the task' },
      { 'zh-tw': '禁止 drive-by refactor', en: 'No drive-by refactors' },
      { 'zh-tw': '不修改測試以外的 config', en: 'Do not change config unless required for tests' },
      { 'zh-tw': '保持既有 API 向後相容', en: 'Maintain backward-compatible APIs' },
    ],
  },
  test_requirement: {
    label: { 'zh-tw': '測試要求', en: 'Test Requirement' },
    category: 'constraints',
    options: [
      { 'zh-tw': '新邏輯必須附單元測試', en: 'New logic must include unit tests' },
      { 'zh-tw': '修 bug 必須附回歸測試', en: 'Bug fixes must include regression tests' },
      { 'zh-tw': '僅手動驗收（無自動測試）', en: 'Manual verification only' },
      { 'zh-tw': '維持或提升覆蓋率', en: 'Maintain or improve coverage' },
    ],
  },
  pr_style: {
    label: { 'zh-tw': 'PR 風格', en: 'PR Style' },
    category: 'output',
    options: [
      { 'zh-tw': '小步提交、單一職責', en: 'Small commits, single responsibility' },
      { 'zh-tw': '一個功能一個 PR', en: 'One feature per PR' },
      { 'zh-tw': '含截圖 / 錄影（UI 變更）', en: 'Include screenshots / recording for UI changes' },
    ],
  },
  error_handling: {
    label: { 'zh-tw': '錯誤處理', en: 'Error Handling' },
    category: 'workflow',
    options: [
      { 'zh-tw': '失敗 3 次後停止並報告', en: 'Stop and report after 3 failures' },
      { 'zh-tw': '自動重試並換策略', en: 'Auto-retry with alternate strategy' },
      { 'zh-tw': '記錄錯誤、繼續下一子任務', en: 'Log error, continue to next subtask' },
    ],
  },
  review_focus: {
    label: { 'zh-tw': '審查重點', en: 'Review Focus' },
    category: 'workflow',
    options: [
      { 'zh-tw': '正確性與邊界條件', en: 'Correctness and edge cases' },
      { 'zh-tw': '安全性與輸入驗證', en: 'Security and input validation' },
      { 'zh-tw': '效能與複雜度', en: 'Performance and complexity' },
      { 'zh-tw': '可讀性與命名', en: 'Readability and naming' },
      { 'zh-tw': '測試完整性', en: 'Test completeness' },
    ],
  },
  review_style: {
    label: { 'zh-tw': '審查風格', en: 'Review Style' },
    category: 'output',
    options: [
      { 'zh-tw': '嚴格：標記所有問題', en: 'Strict: flag all issues' },
      { 'zh-tw': '務實：僅阻擋合併的問題', en: 'Pragmatic: blocking issues only' },
      { 'zh-tw': '建設性：附改善建議與範例', en: 'Constructive: suggestions with examples' },
    ],
  },
  severity_threshold: {
    label: { 'zh-tw': '嚴重度門檻', en: 'Severity Threshold' },
    category: 'constraints',
    options: [
      { 'zh-tw': '回報 Critical / High / Medium / Low', en: 'Report Critical / High / Medium / Low' },
      { 'zh-tw': '僅回報 High 以上', en: 'High and above only' },
      { 'zh-tw': '全部附檔案與行號', en: 'All with file and line references' },
    ],
  },
  bug_symptom: {
    label: { 'zh-tw': 'Bug 症狀', en: 'Bug Symptom' },
    category: 'context',
    options: [
      { 'zh-tw': '間歇性失敗 / flaky test', en: 'Intermittent failure / flaky test' },
      { 'zh-tw': '回歸：曾正常現已壞', en: 'Regression: worked before, broken now' },
      { 'zh-tw': '效能退化', en: 'Performance degradation' },
      { 'zh-tw': 'UI 顯示錯誤', en: 'UI display error' },
      { 'zh-tw': '資料不一致', en: 'Data inconsistency' },
    ],
  },
  debug_approach: {
    label: { 'zh-tw': '除錯方法', en: 'Debug Approach' },
    category: 'workflow',
    options: [
      { 'zh-tw': '二分法縮小範圍（git bisect）', en: 'Binary search (git bisect)' },
      { 'zh-tw': '由錯誤堆疊向上追溯', en: 'Trace from stack trace upward' },
      { 'zh-tw': '新增日誌後重現', en: 'Add logging and reproduce' },
      { 'zh-tw': '寫最小重現測試', en: 'Write minimal reproduction test' },
    ],
  },
  feature_scope: {
    label: { 'zh-tw': '功能範圍', en: 'Feature Scope' },
    category: 'context',
    options: [
      { 'zh-tw': 'MVP：核心路徑即可', en: 'MVP: happy path only' },
      { 'zh-tw': '完整：含錯誤處理與邊界', en: 'Full: errors and edge cases' },
      { 'zh-tw': '漸進：先 API 後 UI', en: 'Incremental: API first, then UI' },
    ],
  },
  implementation_style: {
    label: { 'zh-tw': '實作風格', en: 'Implementation Style' },
    category: 'workflow',
    options: [
      { 'zh-tw': '沿用既有抽象與命名', en: 'Follow existing abstractions and naming' },
      { 'zh-tw': '先介面後實作', en: 'Interface first, then implementation' },
      { 'zh-tw': '複製貼上相似模組再調整', en: 'Copy similar module and adapt' },
    ],
  },
  observation_format: {
    label: { 'zh-tw': '觀察格式', en: 'Observation Format' },
    category: 'output',
    options: [
      { 'zh-tw': 'Thought → Action → Observation 三段式', en: 'Thought → Action → Observation' },
      { 'zh-tw': '簡短 JSON 結構', en: 'Brief JSON structure' },
      { 'zh-tw': '自然語言描述結果', en: 'Natural language result description' },
    ],
  },
  action_format: {
    label: { 'zh-tw': '行動格式', en: 'Action Format' },
    category: 'output',
    options: [
      { 'zh-tw': '工具名 + JSON 參數', en: 'Tool name + JSON parameters' },
      { 'zh-tw': 'Markdown code block 指令', en: 'Markdown code block commands' },
      { 'zh-tw': '函數呼叫語法', en: 'Function call syntax' },
    ],
  },
  retry_policy: {
    label: { 'zh-tw': '重試策略', en: 'Retry Policy' },
    category: 'tools',
    options: [
      { 'zh-tw': '同工具最多 3 次，然後換策略', en: 'Same tool max 3 times, then alternate' },
      { 'zh-tw': '指數退避重試', en: 'Exponential backoff retry' },
      { 'zh-tw': '不重試，立即報告', en: 'No retry, report immediately' },
    ],
  },
  subagent_role: {
    label: { 'zh-tw': '子代理角色', en: 'Subagent Role' },
    category: 'persona',
    options: [
      { 'zh-tw': '探索代理（搜尋程式碼庫）', en: 'Explorer agent (search codebase)' },
      { 'zh-tw': '實作代理（寫程式碼）', en: 'Implementer agent (write code)' },
      { 'zh-tw': '審查代理（code review）', en: 'Reviewer agent (code review)' },
      { 'zh-tw': '測試代理（撰寫/執行測試）', en: 'Test agent (write/run tests)' },
    ],
  },
  delegation_trigger: {
    label: { 'zh-tw': '委派時機', en: 'Delegation Trigger' },
    category: 'workflow',
    options: [
      { 'zh-tw': '任務可並行時拆分', en: 'Split when tasks are parallelizable' },
      { 'zh-tw': '單一領域深度 > 5 檔案時', en: 'When single domain spans > 5 files' },
      { 'zh-tw': '需獨立驗證時（審查/測試）', en: 'When independent verification needed' },
    ],
  },
  merge_strategy: {
    label: { 'zh-tw': '合併策略', en: 'Merge Strategy' },
    category: 'workflow',
    options: [
      { 'zh-tw': '主代理整合所有子代理輸出', en: 'Orchestrator merges all subagent outputs' },
      { 'zh-tw': '子代理直接修改檔案，主代理審查', en: 'Subagents edit files, orchestrator reviews' },
      { 'zh-tw': '子代理僅回傳建議，主代理執行', en: 'Subagents suggest only, orchestrator executes' },
    ],
  },
  coordination_style: {
    label: { 'zh-tw': '協調風格', en: 'Coordination Style' },
    category: 'workflow',
    options: [
      { 'zh-tw': '序列執行，前一步完成再下一步', en: 'Sequential: next after previous completes' },
      { 'zh-tw': '並行探索，彙整後實作', en: 'Parallel explore, then implement' },
      { 'zh-tw': '迭代：實作 → 審查 → 修正循環', en: 'Iterate: implement → review → fix' },
    ],
  },
  test_framework: {
    label: { 'zh-tw': '測試框架', en: 'Test Framework' },
    category: 'context',
    options: [
      { 'zh-tw': 'Vitest / Jest', en: 'Vitest / Jest' },
      { 'zh-tw': 'pytest', en: 'pytest' },
      { 'zh-tw': 'Go testing', en: 'Go testing' },
      { 'zh-tw': '依 repo 既有框架', en: 'Use existing repo framework' },
    ],
  },
  test_first_rule: {
    label: { 'zh-tw': '測試優先規則', en: 'Test-First Rule' },
    category: 'workflow',
    options: [
      { 'zh-tw': '紅 → 綠 → 重構', en: 'Red → Green → Refactor' },
      { 'zh-tw': '先寫失敗測試再實作', en: 'Write failing test before implementation' },
      { 'zh-tw': '實作與測試同 PR', en: 'Implementation and tests in same PR' },
    ],
  },
  coverage_target: {
    label: { 'zh-tw': '覆蓋率目標', en: 'Coverage Target' },
    category: 'constraints',
    options: [
      { 'zh-tw': '新檔案 ≥ 80%', en: 'New files ≥ 80%' },
      { 'zh-tw': '關鍵路徑 100%', en: 'Critical paths 100%' },
      { 'zh-tw': '不強制數字，但邏輯必測', en: 'No numeric mandate, but logic must be tested' },
    ],
  },
  refactor_policy: {
    label: { 'zh-tw': '重構政策', en: 'Refactor Policy' },
    category: 'constraints',
    options: [
      { 'zh-tw': '僅在綠燈測試下重構', en: 'Refactor only with green tests' },
      { 'zh-tw': '小步重構，每步測試通過', en: 'Small steps, tests pass each step' },
      { 'zh-tw': '不重構，僅加測試', en: 'No refactor, add tests only' },
    ],
  },
  refactor_goal: {
    label: { 'zh-tw': '重構目標', en: 'Refactor Goal' },
    category: 'workflow',
    options: [
      { 'zh-tw': '抽取重複邏輯', en: 'Extract duplicated logic' },
      { 'zh-tw': '拆分過大函式/元件', en: 'Split oversized functions/components' },
      { 'zh-tw': '改善命名與型別', en: 'Improve naming and types' },
      { 'zh-tw': '模組化與依賴反轉', en: 'Modularize and invert dependencies' },
    ],
  },
  safety_constraint: {
    label: { 'zh-tw': '安全約束', en: 'Safety Constraint' },
    category: 'constraints',
    options: [
      { 'zh-tw': '行為不變（僅結構調整）', en: 'Behavior unchanged (structure only)' },
      { 'zh-tw': '公開 API 不變', en: 'Public API unchanged' },
      { 'zh-tw': '允許內部簽名變更', en: 'Internal signature changes allowed' },
    ],
  },
  doc_type: {
    label: { 'zh-tw': '文件類型', en: 'Doc Type' },
    category: 'output',
    options: [
      { 'zh-tw': 'README / 快速開始', en: 'README / Quick start' },
      { 'zh-tw': 'API 參考', en: 'API reference' },
      { 'zh-tw': '架構設計文件', en: 'Architecture design doc' },
      { 'zh-tw': 'Runbook / 維運手冊', en: 'Runbook / Operations guide' },
    ],
  },
  audience: {
    label: { 'zh-tw': '讀者對象', en: 'Audience' },
    category: 'context',
    options: [
      { 'zh-tw': '新進工程師', en: 'New engineers' },
      { 'zh-tw': '資深維護者', en: 'Senior maintainers' },
      { 'zh-tw': '外部 API 使用者', en: 'External API consumers' },
      { 'zh-tw': '維運 / SRE', en: 'Operations / SRE' },
    ],
  },
  doc_style: {
    label: { 'zh-tw': '文件風格', en: 'Doc Style' },
    category: 'output',
    options: [
      { 'zh-tw': '範例驅動（code-first）', en: 'Example-driven (code-first)' },
      { 'zh-tw': '概念先行再附範例', en: 'Concepts first, then examples' },
      { 'zh-tw': '條列式操作步驟', en: 'Step-by-step bullet procedures' },
    ],
  },
  security_focus: {
    label: { 'zh-tw': '資安重點', en: 'Security Focus' },
    category: 'workflow',
    options: [
      { 'zh-tw': 'OWASP Top 10', en: 'OWASP Top 10' },
      { 'zh-tw': '依賴漏洞（SCA）', en: 'Dependency vulnerabilities (SCA)' },
      { 'zh-tw': '秘密與憑證外洩', en: 'Secrets and credential leakage' },
      { 'zh-tw': '權限與認證授權', en: 'AuthN / AuthZ' },
    ],
  },
  threat_model: {
    label: { 'zh-tw': '威脅模型', en: 'Threat Model' },
    category: 'context',
    options: [
      { 'zh-tw': 'Web 應用（XSS、CSRF、注入）', en: 'Web app (XSS, CSRF, injection)' },
      { 'zh-tw': 'API / 微服務', en: 'API / microservices' },
      { 'zh-tw': 'CLI / 本機工具', en: 'CLI / local tools' },
      { 'zh-tw': '供應鏈（依賴、CI）', en: 'Supply chain (deps, CI)' },
    ],
  },
  reporting_format: {
    label: { 'zh-tw': '報告格式', en: 'Reporting Format' },
    category: 'output',
    options: [
      { 'zh-tw': '風險矩陣 + 修復建議', en: 'Risk matrix + remediation' },
      { 'zh-tw': 'CVE 風格條目', en: 'CVE-style entries' },
      { 'zh-tw': 'Checklist 勾選表', en: 'Checklist with pass/fail' },
    ],
  },
  mcp_server: {
    label: { 'zh-tw': 'MCP 伺服器', en: 'MCP Server' },
    category: 'tools',
    options: [
      { 'zh-tw': 'filesystem', en: 'filesystem' },
      { 'zh-tw': 'github', en: 'github' },
      { 'zh-tw': 'postgres', en: 'postgres' },
      { 'zh-tw': '自訂內部 MCP', en: 'Custom internal MCP' },
    ],
  },
  tool_naming: {
    label: { 'zh-tw': '工具命名', en: 'Tool Naming' },
    category: 'tools',
    options: [
      { 'zh-tw': '動詞_名詞（read_file）', en: 'verb_noun (read_file)' },
      { 'zh-tw': '資源導向（files/read）', en: 'Resource-oriented (files/read)' },
      { 'zh-tw': '與既有 CLI 一致', en: 'Match existing CLI naming' },
    ],
  },
  auth_policy: {
    label: { 'zh-tw': '授權政策', en: 'Auth Policy' },
    category: 'constraints',
    options: [
      { 'zh-tw': '最小權限原則', en: 'Principle of least privilege' },
      { 'zh-tw': '唯讀 unless 明確需寫入', en: 'Read-only unless write explicitly needed' },
      { 'zh-tw': '敏感操作需二次確認', en: 'Sensitive ops require confirmation' },
    ],
  },
  logging_level: {
    label: { 'zh-tw': '日誌層級', en: 'Logging Level' },
    category: 'tools',
    options: [
      { 'zh-tw': 'DEBUG 暫時加強', en: 'Temporary DEBUG boost' },
      { 'zh-tw': '僅關鍵路徑 trace', en: 'Trace critical path only' },
      { 'zh-tw': '結構化 JSON 日誌', en: 'Structured JSON logs' },
    ],
  },
  root_cause_format: {
    label: { 'zh-tw': '根因報告格式', en: 'Root Cause Format' },
    category: 'output',
    options: [
      { 'zh-tw': '5 Whys + 修復 + 預防', en: '5 Whys + fix + prevention' },
      { 'zh-tw': '時間線 + 直接/根本原因', en: 'Timeline + direct/root cause' },
      { 'zh-tw': '簡短 Markdown 摘要', en: 'Brief Markdown summary' },
    ],
  },
  spec_format: {
    label: { 'zh-tw': '規格格式', en: 'Spec Format' },
    category: 'output',
    options: [
      { 'zh-tw': 'spec.md（需求、非目標、驗收）', en: 'spec.md (requirements, non-goals, acceptance)' },
      { 'zh-tw': 'User Story + AC', en: 'User Story + Acceptance Criteria' },
      { 'zh-tw': 'RFC 風格設計文件', en: 'RFC-style design doc' },
    ],
  },
  implementation_phases: {
    label: { 'zh-tw': '實作階段', en: 'Implementation Phases' },
    category: 'workflow',
    options: [
      { 'zh-tw': '資料層 → API → UI', en: 'Data layer → API → UI' },
      { 'zh-tw': '垂直切片（端到端小功能）', en: 'Vertical slices (end-to-end thin features)' },
      { 'zh-tw': '基礎設施 → 業務邏輯', en: 'Infrastructure → business logic' },
    ],
  },
  deliverable_primary: {
    label: { 'zh-tw': '主要交付物', en: 'Primary Deliverable' },
    category: 'output',
    options: [
      { 'zh-tw': '可合併的 PR + 通過的 CI', en: 'Mergeable PR + passing CI' },
      { 'zh-tw': '設計文件 + 實作計畫', en: 'Design doc + implementation plan' },
      { 'zh-tw': '審查報告（含嚴重度分級）', en: 'Review report with severity levels' },
      { 'zh-tw': '測試套件 + 覆蓋率報告', en: 'Test suite + coverage report' },
      { 'zh-tw': '更新後的技術文件', en: 'Updated technical documentation' },
      { 'zh-tw': 'Agent 團隊設計文件（角色/流程/工具）', en: 'Agent team design doc (roles/workflow/tools)' },
      { 'zh-tw': '完整小說/故事定稿', en: 'Complete story manuscript' },
      { 'zh-tw': '研究報告含引用來源', en: 'Research report with citations' },
    ],
  },
  acceptance_criteria: {
    label: { 'zh-tw': '驗收標準', en: 'Acceptance Criteria' },
    category: 'constraints',
    options: [
      { 'zh-tw': '所有測試通過、無 lint 錯誤', en: 'All tests pass, no lint errors' },
      { 'zh-tw': '符合 spec.md 每一條 AC', en: 'Meets every AC in spec.md' },
      { 'zh-tw': '手動驗收清單全勾', en: 'Manual checklist fully checked' },
      { 'zh-tw': '效能指標不退化', en: 'Performance metrics not degraded' },
    ],
  },
  verification_checklist: {
    label: { 'zh-tw': '驗證清單', en: 'Verification Checklist' },
    category: 'workflow',
    options: [
      { 'zh-tw': 'build + test + lint 全綠', en: 'build + test + lint all green' },
      { 'zh-tw': '手動 smoke test 關鍵路徑', en: 'Manual smoke test critical paths' },
      { 'zh-tw': 'diff 審查無無關檔案', en: 'Diff review: no unrelated files' },
    ],
  },
  forbidden_actions: {
    label: { 'zh-tw': '禁止事項', en: 'Forbidden Actions' },
    category: 'constraints',
    options: [
      { 'zh-tw': '不刪除既有測試、不跳過 CI', en: 'Do not delete tests or skip CI' },
      { 'zh-tw': '不提交秘密或 .env', en: 'Do not commit secrets or .env' },
      { 'zh-tw': '不修改無關檔案與大範圍格式化', en: 'No unrelated files or mass formatting' },
    ],
  },
  team_type: {
    label: { 'zh-tw': '團隊類型', en: 'Team Type' },
    category: 'context',
    options: [
      { 'zh-tw': '深度研究團隊', en: 'Deep research team' },
      { 'zh-tw': '軟體開發小隊', en: 'Software dev squad' },
      { 'zh-tw': '小說家寫作團隊', en: 'Novelist writing crew' },
      { 'zh-tw': '產品策略團隊', en: 'Product strategy team' },
      { 'zh-tw': '行銷內容工作室', en: 'Marketing content studio' },
      { 'zh-tw': '數據分析小組', en: 'Data analysis unit' },
    ],
  },
  team_topology: {
    label: { 'zh-tw': '團隊拓撲', en: 'Team Topology' },
    category: 'workflow',
    options: [
      { 'zh-tw': 'Orchestrator-Worker（主代理 + 子代理）', en: 'Orchestrator-Worker (lead + subagents)' },
      { 'zh-tw': 'Hierarchical（經理監督多層）', en: 'Hierarchical (manager oversees layers)' },
      { 'zh-tw': 'Sequential Pipeline（流水線依序）', en: 'Sequential Pipeline (ordered handoff)' },
      { 'zh-tw': 'Parallel Swarm（並行探索後彙整）', en: 'Parallel Swarm (parallel explore, then merge)' },
      { 'zh-tw': 'Peer Review（同儕互審）', en: 'Peer Review (mutual critique)' },
    ],
  },
  orchestrator_role: {
    label: { 'zh-tw': '編排者角色', en: 'Orchestrator Role' },
    category: 'persona',
    options: [
      { 'zh-tw': 'Lead Researcher（研究主導）', en: 'Lead Researcher' },
      { 'zh-tw': 'Tech Lead / 架構師', en: 'Tech Lead / Architect' },
      { 'zh-tw': '總編輯 Editor-in-Chief', en: 'Editor-in-Chief' },
      { 'zh-tw': '產品經理 PM Orchestrator', en: 'PM Orchestrator' },
      { 'zh-tw': '創意總監 Creative Director', en: 'Creative Director' },
    ],
  },
  team_size: {
    label: { 'zh-tw': '團隊規模', en: 'Team Size' },
    category: 'context',
    options: [
      { 'zh-tw': '精簡 3 人（1 主 + 2 子代理）', en: 'Lean 3 (1 lead + 2 subagents)' },
      { 'zh-tw': '標準 5 人（1 主 + 4 專家）', en: 'Standard 5 (1 lead + 4 specialists)' },
      { 'zh-tw': '擴展 8–10 人（複雜任務）', en: 'Extended 8–10 (complex tasks)' },
      { 'zh-tw': '動態擴縮（依複雜度）', en: 'Dynamic scaling (by complexity)' },
    ],
  },
  effort_scaling: {
    label: { 'zh-tw': '投入規模', en: 'Effort Scaling' },
    category: 'workflow',
    options: [
      { 'zh-tw': '簡單：1 代理、3–10 次工具呼叫', en: 'Simple: 1 agent, 3–10 tool calls' },
      { 'zh-tw': '中等：2–4 子代理、各 10–15 次呼叫', en: 'Medium: 2–4 subagents, 10–15 calls each' },
      { 'zh-tw': '複雜：10+ 子代理、明確分工', en: 'Complex: 10+ subagents, clear division' },
      { 'zh-tw': '依查詢複雜度自動調整', en: 'Auto-scale by query complexity' },
    ],
  },
  research_strategy: {
    label: { 'zh-tw': '研究策略', en: 'Research Strategy' },
    category: 'workflow',
    options: [
      { 'zh-tw': '廣度優先（並行多方向）', en: 'Breadth-first (parallel directions)' },
      { 'zh-tw': '深度優先（單主題鑽研）', en: 'Depth-first (single topic deep dive)' },
      { 'zh-tw': '先廣後窄（Anthropic 式）', en: 'Start wide, then narrow (Anthropic style)' },
      { 'zh-tw': '動態調整（依發現轉向）', en: 'Dynamic pivot based on findings' },
    ],
  },
  handoff_protocol: {
    label: { 'zh-tw': '交接協議', en: 'Handoff Protocol' },
    category: 'workflow',
    options: [
      { 'zh-tw': '結構化 JSON Brief（目標/輸出/工具/邊界）', en: 'Structured JSON brief (goal/output/tools/bounds)' },
      { 'zh-tw': 'Markdown 任務卡', en: 'Markdown task card' },
      { 'zh-tw': '檔案產物鏈（artifact pipeline）', en: 'File artifact pipeline' },
      { 'zh-tw': '共享黑板 Shared Blackboard', en: 'Shared blackboard' },
    ],
  },
  synthesis_method: {
    label: { 'zh-tw': '彙整方式', en: 'Synthesis Method' },
    category: 'workflow',
    options: [
      { 'zh-tw': '主代理壓縮合併（compression）', en: 'Lead agent compresses and merges' },
      { 'zh-tw': 'Citation Agent 附引用整理', en: 'Citation Agent with source attribution' },
      { 'zh-tw': '總編輯潤稿定稿', en: 'Editor-in-chief polishes final draft' },
      { 'zh-tw': '投票 / 評分後取最佳', en: 'Vote / score and pick best' },
    ],
  },
  agent_purpose: {
    label: { 'zh-tw': 'Agent 用途', en: 'Agent Purpose' },
    category: 'context',
    options: [
      { 'zh-tw': '程式碼開發與維護', en: 'Code development & maintenance' },
      { 'zh-tw': '網路/文件深度研究', en: 'Web & document deep research' },
      { 'zh-tw': '創意寫作與敘事', en: 'Creative writing & storytelling' },
      { 'zh-tw': '客戶支援與對話', en: 'Customer support & dialogue' },
      { 'zh-tw': '數據分析與報告', en: 'Data analysis & reporting' },
      { 'zh-tw': '多工具編排執行', en: 'Multi-tool orchestration' },
    ],
  },
  agent_loop: {
    label: { 'zh-tw': 'Agent 迴圈', en: 'Agent Loop' },
    category: 'workflow',
    options: [
      { 'zh-tw': 'ReAct（Thought → Action → Observation）', en: 'ReAct (Thought → Action → Observation)' },
      { 'zh-tw': 'Plan-and-Execute（先規劃後執行）', en: 'Plan-and-Execute' },
      { 'zh-tw': 'Reflexion（執行後自我反思修正）', en: 'Reflexion (self-critique and revise)' },
      { 'zh-tw': 'Research Loop（迭代搜尋直到足夠）', en: 'Research loop (iterate until sufficient)' },
    ],
  },
  agent_memory: {
    label: { 'zh-tw': '記憶策略', en: 'Memory Strategy' },
    category: 'tools',
    options: [
      { 'zh-tw': '無狀態（每輪獨立）', en: 'Stateless (each turn independent)' },
      { 'zh-tw': '對話記憶（滑動視窗）', en: 'Conversation memory (sliding window)' },
      { 'zh-tw': '持久化計畫至 Memory 檔', en: 'Persist plan to memory file' },
      { 'zh-tw': '子代理獨立 context + 主代理彙整', en: 'Subagent isolated context + lead synthesis' },
    ],
  },
  context_strategy: {
    label: { 'zh-tw': '上下文策略', en: 'Context Strategy' },
    category: 'tools',
    options: [
      { 'zh-tw': '超長時委派子代理分擔', en: 'Delegate to subagents when context exceeds limit' },
      { 'zh-tw': '定期摘要壓縮', en: 'Periodic summarization' },
      { 'zh-tw': '僅傳遞關鍵 token 給主代理', en: 'Pass only key tokens to lead agent' },
      { 'zh-tw': '外部向量檢索 RAG', en: 'External vector RAG retrieval' },
    ],
  },
  story_genre: {
    label: { 'zh-tw': '故事類型', en: 'Story Genre' },
    category: 'context',
    options: [
      { 'zh-tw': '科幻 Sci-Fi', en: 'Science Fiction' },
      { 'zh-tw': '奇幻 Fantasy', en: 'Fantasy' },
      { 'zh-tw': '懸疑推理 Mystery', en: 'Mystery / Thriller' },
      { 'zh-tw': '言情 Romance', en: 'Romance' },
      { 'zh-tw': '歷史/史詩 Epic', en: 'Historical / Epic' },
      { 'zh-tw': '文學小說 Literary Fiction', en: 'Literary Fiction' },
      { 'zh-tw': '武俠/仙俠 Wuxia-Xianxia', en: 'Wuxia / Xianxia' },
    ],
  },
  story_length: {
    label: { 'zh-tw': '作品長度', en: 'Story Length' },
    category: 'context',
    options: [
      { 'zh-tw': '短篇（5k–10k 字）', en: 'Short story (5k–10k words)' },
      { 'zh-tw': '中篇（30k–50k 字）', en: 'Novella (30k–50k words)' },
      { 'zh-tw': '長篇大綱 + 首章', en: 'Novel outline + first chapter' },
      { 'zh-tw': '單章連載（3k–5k 字）', en: 'Serial chapter (3k–5k words)' },
    ],
  },
  plot_focus: {
    label: { 'zh-tw': '情節重心', en: 'Plot Focus' },
    category: 'workflow',
    options: [
      { 'zh-tw': '三幕式結構（起承轉合）', en: 'Three-act structure' },
      { 'zh-tw': '英雄旅程 Hero\'s Journey', en: 'Hero\'s Journey' },
      { 'zh-tw': '多線敘事交織', en: 'Multi-thread intertwined narrative' },
      { 'zh-tw': '懸念驅動章末鉤子', en: 'Suspense-driven chapter hooks' },
    ],
  },
  character_depth: {
    label: { 'zh-tw': '角色深度', en: 'Character Depth' },
    category: 'workflow',
    options: [
      { 'zh-tw': '2–3 主角完整弧線', en: '2–3 protagonists with full arcs' },
      { 'zh-tw': '群像戲 ensemble cast', en: 'Ensemble cast' },
      { 'zh-tw': '單主角內心獨白為主', en: 'Single protagonist interior monologue' },
      { 'zh-tw': '反派動機同等重要', en: 'Antagonist motivation equally developed' },
    ],
  },
  narrative_voice: {
    label: { 'zh-tw': '敘事視角', en: 'Narrative Voice' },
    category: 'output',
    options: [
      { 'zh-tw': '第三人稱有限視角', en: 'Third-person limited' },
      { 'zh-tw': '第一人稱', en: 'First person' },
      { 'zh-tw': '多視角輪替', en: 'Rotating multiple POVs' },
      { 'zh-tw': '全知視角', en: 'Omniscient narrator' },
    ],
  },
  editor_focus: {
    label: { 'zh-tw': '編輯重心', en: 'Editor Focus' },
    category: 'workflow',
    options: [
      { 'zh-tw': '節奏與連貫性', en: 'Pacing and coherence' },
      { 'zh-tw': '文風與用詞統一', en: 'Voice and diction consistency' },
      { 'zh-tw': '邏輯漏洞與設定一致性', en: 'Plot holes and worldbuilding consistency' },
      { 'zh-tw': '情感張力與高潮鋪陳', en: 'Emotional tension and climax buildup' },
    ],
  },
  dev_squad_role_1: {
    label: { 'zh-tw': '開發隊角色 1', en: 'Dev Squad Role 1' },
    category: 'persona',
    options: [
      { 'zh-tw': '架構師 Architect', en: 'Architect' },
      { 'zh-tw': '後端工程師', en: 'Backend Engineer' },
      { 'zh-tw': '前端工程師', en: 'Frontend Engineer' },
      { 'zh-tw': '探索代理 Explorer', en: 'Explorer Agent' },
    ],
  },
  dev_squad_role_2: {
    label: { 'zh-tw': '開發隊角色 2', en: 'Dev Squad Role 2' },
    category: 'persona',
    options: [
      { 'zh-tw': '實作工程師 Implementer', en: 'Implementer' },
      { 'zh-tw': '測試工程師 QA', en: 'QA Engineer' },
      { 'zh-tw': 'Code Reviewer', en: 'Code Reviewer' },
      { 'zh-tw': 'DevOps 工程師', en: 'DevOps Engineer' },
    ],
  },
  dev_squad_role_3: {
    label: { 'zh-tw': '開發隊角色 3', en: 'Dev Squad Role 3' },
    category: 'persona',
    options: [
      { 'zh-tw': '文件撰寫者 Documenter', en: 'Documenter' },
      { 'zh-tw': '安全審計員 Security', en: 'Security Auditor' },
      { 'zh-tw': '整合者 Integrator', en: 'Integrator' },
      { 'zh-tw': '效能優化師 Performance', en: 'Performance Optimizer' },
    ],
  },
  llm_tier_lead: {
    label: { 'zh-tw': '主代理模型層級', en: 'Lead Model Tier' },
    category: 'tools',
    options: [
      { 'zh-tw': '最強模型（規劃/編排）', en: 'Strongest model (planning/orchestration)' },
      { 'zh-tw': '平衡模型', en: 'Balanced model' },
      { 'zh-tw': '依任務動態選型', en: 'Dynamic model selection by task' },
    ],
  },
  llm_tier_worker: {
    label: { 'zh-tw': '子代理模型層級', en: 'Worker Model Tier' },
    category: 'tools',
    options: [
      { 'zh-tw': '快速輕量模型（大量並行）', en: 'Fast lightweight model (high parallelism)' },
      { 'zh-tw': '與主代理同級', en: 'Same tier as lead' },
      { 'zh-tw': '專項微調/領域模型', en: 'Specialized domain model' },
    ],
  },
};

export const INITIAL_DEFAULTS = {
  agent_role: '資深全端工程師',
  expertise_level: '平衡務實、關鍵節點確認',
  task_type: '新功能開發',
  tech_stack: 'React + TypeScript + Vite',
  project_context: '既有大型 monorepo',
  tool_policy: '先讀後寫：修改前必須 Read/Grep 相關檔案',
  shell_policy: '可執行 build/test/lint，禁止破壞性指令',
  autonomy_level: '中：完成子任務後彙報',
  verification_strategy: '完成後執行完整 test suite + build',
  planning_style: '先寫 plan.md 再實作',
  output_format: 'Markdown 報告 + 程式碼變更',
  communication_style: '簡潔技術向、無廢話',
  scope_constraint: '僅修改與任務直接相關的檔案',
  test_requirement: '新邏輯必須附單元測試',
  deliverable_primary: '可合併的 PR + 通過的 CI',
  acceptance_criteria: '所有測試通過、無 lint 錯誤',
  verification_checklist: 'build + test + lint 全綠',
  forbidden_actions: '不刪除既有測試、不跳過 CI',
};