/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type PasteHandler, type RteInputRule, type RteSelectionSnapshot } from '#/core';

import { type LinkPluginOptions, linkPlugin } from './Link';

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

    it('writes no target the policy refuses, and no note for a same-tab link', () => {
        const restricted = linkPlugin({ allowedHosts: ['frontify.com'] }).content?.marks?.link;

        expect(restricted?.toHtml({ href: 'https://example.com' }).attrs).not.toHaveProperty('href');
        expect(restricted?.toHtml({ href: 'https://frontify.com' }).attrs?.href).toBe('https://frontify.com');
        expect(link?.toHtml({ href: 'https://example.com' }).children).toBe(true);
    });

    it('writes no new-tab attributes and no note for a target the policy refuses', () => {
        const restricted = linkPlugin({ allowedHosts: ['frontify.com'] }).content?.marks?.link;
        const html = restricted?.toHtml({ href: 'https://example.com', openInNewTab: true });

        expect(html?.attrs).not.toHaveProperty('href');
        expect(html?.attrs).not.toHaveProperty('target');
        expect(html?.attrs).not.toHaveProperty('rel');
        expect(html?.children).toBe(true);
    });

    it('exports a link that opens a new tab with its target and rel and no text of its own', () => {
        const html = link?.toHtml({ href: 'https://example.com', openInNewTab: true });

        expect(html?.attrs).toMatchObject({ target: '_blank', rel: 'noopener noreferrer' });
        expect(html?.children).toBe(true);
    });
});

type MarkPatternRule = Extract<RteInputRule, { kind: 'markPattern' }>;

const markPatternRule = (options: LinkPluginOptions = {}): MarkPatternRule => {
    const rule = linkPlugin(options).inputRules?.find(
        (candidate): candidate is MarkPatternRule => 'kind' in candidate && candidate.kind === 'markPattern',
    );
    if (rule === undefined) {
        throw new Error('the link plugin declares no typing rule that marks a token');
    }
    return rule;
};

/** Whether the rule's pattern takes the whole text as one token, as the engine reads it. */
const readsAsToken = (rule: MarkPatternRule, value: string): boolean =>
    new RegExp(`^(?:${rule.pattern.source})$`).test(value);

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

    it('gives the address as the target when the policy allows it', () => {
        expect(markPatternRule().value('https://example.com')).toEqual({ href: 'https://example.com' });
    });

    it('leaves an address the policy refuses as typed', () => {
        const rule = markPatternRule({ allowedHosts: ['frontify.com'] });

        expect(rule.value('https://example.com')).toBeNull();
        expect(rule.value('https://frontify.com')).toEqual({ href: 'https://frontify.com' });
    });
});

type PasteSetup = {
    options?: LinkPluginOptions;
    text: string;
    selection: Pick<RteSelectionSnapshot, 'isCollapsed' | 'marks'>;
    source?: 'editor' | 'elsewhere';
};

/** Runs the link's paste handler against the three calls it makes on the editor. */
const paste = ({ options, text, selection, source = 'elsewhere' }: PasteSetup) => {
    const insertText = vi.fn();
    const toggle = vi.fn();
    // The handler reads the selection and calls `insertText` and `marks.toggle`, so those are the only members the stub has.
    const api = { selection: { get: () => selection }, insertText, marks: { toggle } } as unknown as EditorControlApi;
    const handler: PasteHandler | undefined = linkPlugin(options).onPaste;
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

    it('is left to the editor when the policy refuses it, at a caret or over selected text', () => {
        const options = { allowedHosts: ['frontify.com'] };

        for (const selection of [CARET, SELECTED_TEXT]) {
            const { handled, insertText, toggle } = paste({ options, text: 'https://example.com', selection });

            expect(handled).toBe(false);
            expect(insertText).not.toHaveBeenCalled();
            expect(toggle).not.toHaveBeenCalled();
        }
    });

    it('is linked when the policy allows it', () => {
        const options = { allowedHosts: ['frontify.com'] };

        const { toggle } = paste({ options, text: 'https://frontify.com/x', selection: SELECTED_TEXT });

        expect(toggle).toHaveBeenCalledWith('link', { href: 'https://frontify.com/x' });
    });
});
