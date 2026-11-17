/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import {
    buildContentRegistry,
    type EditorControlApi,
    type PasteHandler,
    type RteInputRule,
    type RteSelectionSnapshot,
} from '#/core';

import { linkContent, linkPlugin } from './Link';

const link = linkPlugin().content?.marks?.link;

describe('the link mark', () => {
    it('writes a safe target', () => {
        expect(link?.toHtml({ href: 'https://example.com' }).attrs?.href).toBe('https://example.com');
    });

    it('writes no target for an unsafe or malformed one, without failing', () => {
        for (const value of [{ href: 'javascript:0/alert(1)' }, { href: 1 }, {}, true, null]) {
            const html = link?.toHtml(value as never);
            expect(html?.tag).toBe('a');
            expect(html?.attrs).not.toHaveProperty('href');
        }
    });

    it('exports a link that opens a new tab with its target and rel and no text of its own', () => {
        const html = link?.toHtml({ href: 'https://example.com', openInNewTab: true });

        expect(html?.attrs).toMatchObject({ target: '_blank', rel: 'noopener noreferrer' });
        expect(html?.children).toBe(true);
    });
});

describe('the link look', () => {
    it('sets a custom property for each field of the look', () => {
        const plugin = linkPlugin({ look: { fontWeight: '600', color: 'var(--f-link)' } });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-link-font-weight': '600',
            '--rte-link-color': 'var(--f-link)',
        });
    });

    it('shares the default content when there is no look', () => {
        expect(linkPlugin().content).toBe(linkContent);
    });

    it('keeps the shared mark, so it registers next to the default content', () => {
        const plugin = linkPlugin({ look: { color: 'blue' } });

        expect(plugin.content?.marks?.link).toBe(linkContent.marks?.link);
        expect(() => buildContentRegistry([linkContent, plugin])).not.toThrow();
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => linkPlugin({ look: { color: 'red; display: none' } })).toThrow(/"color".*"link"/);
    });
});

type MarkPatternRule = Extract<RteInputRule, { kind: 'markPattern' }>;

const markPatternRule = (): MarkPatternRule => {
    const rule = linkPlugin().inputRules?.find(
        (candidate): candidate is MarkPatternRule => 'kind' in candidate && candidate.kind === 'markPattern',
    );
    if (rule === undefined) {
        throw new Error('the link plugin declares no typing rule that marks a token');
    }
    return rule;
};

/** Anchored the way the engine anchors the pattern. */
const readsAsToken = (rule: MarkPatternRule, value: string): boolean =>
    new RegExp(`^(?:${rule.pattern.source})$`, rule.pattern.flags).test(value);

describe('the link typing rule', () => {
    it('reads a web, mail or phone address as a token', () => {
        const rule = markPatternRule();

        expect(readsAsToken(rule, 'https://example.com/x')).toBe(true);
        expect(readsAsToken(rule, 'http://example.com')).toBe(true);
        expect(readsAsToken(rule, 'mailto:ana@example.com')).toBe(true);
        expect(readsAsToken(rule, 'tel:+41791234567')).toBe(true);
    });

    it('does not read a bare mail address, a plain host or a scheme with nothing after it', () => {
        const rule = markPatternRule();

        expect(readsAsToken(rule, 'ana@example.com')).toBe(false);
        expect(readsAsToken(rule, 'example.com')).toBe(false);
        expect(readsAsToken(rule, 'mailto:')).toBe(false);
    });

    it('declares the punctuation and brackets that end a sentence rather than an address', () => {
        const { trim } = markPatternRule();

        expect(trim?.punctuation.test('.')).toBe(true);
        expect(trim?.pairs).toMatchObject({ ')': '(' });
    });

    it('gives the address as the target', () => {
        expect(markPatternRule().value('https://example.com')).toEqual({ href: 'https://example.com' });
    });

    it('leaves an address too long to keep as typed', () => {
        expect(markPatternRule().value(`https://example.com/${'x'.repeat(2048)}`)).toBeNull();
    });
});

type PasteSetup = {
    text: string;
    selection: Pick<RteSelectionSnapshot, 'isCollapsed' | 'marks'>;
    source?: 'editor' | 'elsewhere';
};

const paste = ({ text, selection, source = 'elsewhere' }: PasteSetup) => {
    const insertText = vi.fn();
    const toggle = vi.fn();
    // The handler reads the selection and calls `insertText` and `marks.toggle`, so those are the only members the stub has.
    const api = { selection: { get: () => selection }, insertText, marks: { toggle } } as unknown as EditorControlApi;
    const handler: PasteHandler | undefined = linkPlugin().onPaste;
    if (handler === undefined) {
        throw new Error('the link plugin declares no paste handler');
    }
    const handled = handler({ text, html: null, source }, api);
    return { handled, insertText, toggle };
};

const CARET = { isCollapsed: true, marks: {} };
const SELECTED_TEXT = { isCollapsed: false, marks: {} };
const LINKED = { link: { coverage: 'all' as const, value: { href: '/old' } } };

describe('pasting an address with the link plugin', () => {
    it('goes in linked at a caret, as its own undo step', () => {
        const { handled, insertText } = paste({ text: 'https://example.com', selection: CARET });

        expect(handled).toBe(true);
        expect(insertText).toHaveBeenCalledWith(
            'https://example.com',
            { link: { href: 'https://example.com' } },
            { undo: 'marksFirst' },
        );
    });

    it('goes in linked at a caret when it is a mail or phone address, without the spaces around it', () => {
        const mail = paste({ text: 'mailto:ana@example.com', selection: CARET });
        const phone = paste({ text: ' tel:+41791234567 ', selection: CARET });

        expect(mail.insertText).toHaveBeenCalledWith(
            'mailto:ana@example.com',
            { link: { href: 'mailto:ana@example.com' } },
            { undo: 'marksFirst' },
        );
        expect(phone.insertText).toHaveBeenCalledWith(
            'tel:+41791234567',
            { link: { href: 'tel:+41791234567' } },
            { undo: 'marksFirst' },
        );
    });

    it('links the selected text', () => {
        const { handled, toggle } = paste({ text: 'https://example.com', selection: SELECTED_TEXT });

        expect(handled).toBe(true);
        expect(toggle).toHaveBeenCalledTimes(1);
        expect(toggle).toHaveBeenCalledWith('link', { href: 'https://example.com' });
    });

    it('takes the old link off selected text that is linked as a whole, then links it', () => {
        const { toggle } = paste({
            text: 'https://example.com',
            selection: { isCollapsed: false, marks: LINKED },
        });

        expect(toggle.mock.calls).toEqual([['link'], ['link', { href: 'https://example.com' }]]);
    });

    it('stays plain text inside a link, so no link nests in another', () => {
        const { handled, insertText } = paste({
            text: 'https://example.com',
            selection: { isCollapsed: true, marks: LINKED },
        });

        expect(handled).toBe(false);
        expect(insertText).not.toHaveBeenCalled();
    });

    it('is left to the editor at a caret when it was copied from an editor, which keeps its own link and marks', () => {
        const { handled, insertText } = paste({ text: 'https://example.com', selection: CARET, source: 'editor' });

        expect(handled).toBe(false);
        expect(insertText).not.toHaveBeenCalled();
    });

    it('is left to the editor when it is not an address', () => {
        for (const text of ['example.com', 'not a url', 'javascript:alert(1)']) {
            const { handled, insertText, toggle } = paste({ text, selection: CARET });

            expect(handled).toBe(false);
            expect(insertText).not.toHaveBeenCalled();
            expect(toggle).not.toHaveBeenCalled();
        }
    });
});
