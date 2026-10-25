/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { CONTENT_RULE_IDS } from '#/features/__tests__/fixtures/contentRules';
import { enUS } from '#/locales/en-US';
import { ruleHelpKey, ruleNameKey } from '#/model';
import { LOADERS } from '#/react/locale';

const locales = async () => [enUS, ...(await Promise.all(Object.values(LOADERS).map((load) => load())))];

describe('the content check strings', () => {
    it('names each help key after the rule ID in PascalCase with its dots and hyphens removed', () => {
        expect(ruleHelpKey('image.alt-suspicious')).toBe('RichTextEditor_checkImageAltSuspiciousHelp');
        expect(ruleNameKey('heading.skipped-level')).toBe('RichTextEditor_checkHeadingSkippedLevel');
    });

    it('gives every rule a localized name and an explanation of how to decide in each of the eleven locales', async () => {
        const all = await locales();
        expect(all).toHaveLength(11);
        for (const locale of all) {
            const strings = locale.translationStrings as Readonly<Record<string, string | undefined>>;
            for (const ruleId of CONTENT_RULE_IDS) {
                expect(strings[ruleNameKey(ruleId)], `${locale.lang} ${ruleId}`).toMatch(/\S/);
                expect(strings[ruleHelpKey(ruleId)], `${locale.lang} ${ruleId} help`).toMatch(/\S/);
            }
            expect(strings.RichTextEditor_checkGenericImageWords?.split('|').length).toBeGreaterThan(3);
            expect(strings.RichTextEditor_checkVagueLinkTexts?.split('|').length).toBeGreaterThan(3);
        }
    });
});
