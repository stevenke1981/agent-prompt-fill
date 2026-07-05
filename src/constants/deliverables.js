/**
 * Agent 交付物與驗收標準區段
 */

export const DELIVERABLES_SECTION = {
  'zh-tw': `### Deliverables (交付物與驗收)
請**嚴格**按以下規格交付，不得遺漏：

**1. 主要交付物**
- {{deliverable_primary}}

**2. 輸出格式**
- {{output_format}}

**3. 驗收標準**
- {{acceptance_criteria}}

**4. 驗證清單**
- {{verification_checklist}}

**5. 禁止事項**
- {{forbidden_actions}}`,

  en: `### Deliverables
Deliver **strictly** according to the following. Do not omit any item:

**1. Primary Deliverable**
- {{deliverable_primary}}

**2. Output Format**
- {{output_format}}

**3. Acceptance Criteria**
- {{acceptance_criteria}}

**4. Verification Checklist**
- {{verification_checklist}}

**5. Forbidden Actions**
- {{forbidden_actions}}`,
};

const HAS_DELIVERABLES = /###\s*Deliverables|交付物/;

export const withDeliverables = (content) => {
  if (!content) return content;

  if (typeof content === 'string') {
    if (HAS_DELIVERABLES.test(content)) return content;
    return `${content.trim()}\n\n${DELIVERABLES_SECTION['zh-tw']}`;
  }

  return {
    'zh-tw': HAS_DELIVERABLES.test(content['zh-tw'] || '')
      ? content['zh-tw']
      : `${(content['zh-tw'] || '').trim()}\n\n${DELIVERABLES_SECTION['zh-tw']}`,
    en: HAS_DELIVERABLES.test(content.en || '')
      ? content.en
      : `${(content.en || '').trim()}\n\n${DELIVERABLES_SECTION.en}`,
  };
};