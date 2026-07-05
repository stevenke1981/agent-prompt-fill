import { describe, it, expect } from 'vitest';
import { INITIAL_TEMPLATES_CONFIG, SYSTEM_DATA_VERSION } from '../data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS } from '../data/banks';
import { extractVariableKeys } from '../utils/promptEngine';
import { getLocalized } from '../utils/helpers';

describe('agent seed data', () => {
  it('has at least 20 templates', () => {
    expect(INITIAL_TEMPLATES_CONFIG.length).toBeGreaterThanOrEqual(20);
  });

  it('has system data version', () => {
    expect(SYSTEM_DATA_VERSION).toBeTruthy();
  });

  it('has at least 60 banks', () => {
    expect(Object.keys(INITIAL_BANKS).length).toBeGreaterThanOrEqual(60);
  });

  it('all template variables exist in banks or defaults', () => {
    const bankKeys = new Set(Object.keys(INITIAL_BANKS));
    const defaultKeys = new Set(Object.keys(INITIAL_DEFAULTS));

    INITIAL_TEMPLATES_CONFIG.forEach((template) => {
      const content = getLocalized(template.content, 'zh-tw');
      const keys = extractVariableKeys(content);
      keys.forEach((key) => {
        expect(
          bankKeys.has(key) || defaultKeys.has(key),
          `Missing bank/default for {{${key}}} in ${template.id}`
        ).toBe(true);
      });
    });
  });
});