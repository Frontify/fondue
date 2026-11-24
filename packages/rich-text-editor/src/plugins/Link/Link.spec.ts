/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it, vi } from 'vitest';

import {
    buildContentRegistry,
    type EditorControlApi,
    type PasteHandler,
    type RteInputRule,
    type RteSelectionSnapshot,
} from '#/core';

import { APPEARANCES } from './helpers/appearance';
import { ALL_LINK_APPEARANCES, type LinkKind } from './helpers/value';
import { type LinkContentOptions, linkContent, linkPlugin, type LinkPluginOptions } from './Link';

const BUTTON_KINDS: readonly LinkKind[] = ['text', 'button'];

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
        const plugin = linkPlugin({ look: { text: { fontWeight: '600', color: 'var(--f-link)' } } });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-link-font-weight': '600',
            '--rte-link-color': 'var(--f-link)',
        });
    });

    it('shares the default content when there is no look', () => {
        expect(linkPlugin().content).toBe(linkContent());
    });

    it('shares the mark, so a content list with `linkContent()` and the looked link still builds', () => {
        const plugin = linkPlugin({ look: { text: { color: 'blue' } } });

        expect(plugin.content?.marks?.link).toBe(linkContent().marks?.link);
        expect(() => buildContentRegistry([linkContent(), plugin])).not.toThrow();
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => linkPlugin({ look: { text: { color: 'red; display: none' } } })).toThrow(/"color".*"link"/);
    });
});

describe('the link mark with an appearance', () => {
    it('has a class for every appearance in the stylesheet', () => {
        for (const appearance of ALL_LINK_APPEARANCES) {
            expect(APPEARANCES[appearance].className).toBeTruthy();
        }
    });

    for (const appearance of ALL_LINK_APPEARANCES) {
        it(`writes a ${appearance} button as a link with its class and appearance`, () => {
            const html = link?.toHtml({ href: 'https://example.com', appearance });

            expect(html?.tag).toBe('a');
            expect(html?.attrs?.href).toBe('https://example.com');
            expect(html?.attrs?.class).toContain(APPEARANCES[appearance].className);
            expect(html?.attrs?.['data-appearance']).toBe(appearance);
        });
    }

    it('writes a plain link for an appearance it does not know', () => {
        for (const appearance of ['quaternary', 1, null, 'toString']) {
            const html = link?.toHtml({ href: 'https://example.com', appearance } as never);

            expect(html?.attrs).not.toHaveProperty('data-appearance');

            for (const known of ALL_LINK_APPEARANCES) {
                expect(html?.attrs?.class).not.toContain(APPEARANCES[known].className);
            }
        }
    });

    it('writes a link without an appearance exactly as before', () => {
        const html = link?.toHtml({ href: 'https://example.com' });

        expect(html?.attrs).not.toHaveProperty('data-appearance');
        expect(Object.keys(html?.attrs ?? {}).sort()).toEqual(['class', 'href']);
    });

    it('writes the appearance whatever the editor offers', () => {
        const offering = linkPlugin({ kinds: BUTTON_KINDS }).content?.marks?.link;

        expect(link?.toHtml({ href: '/a', appearance: 'primary' }).attrs).toEqual(
            offering?.toHtml({ href: '/a', appearance: 'primary' }).attrs,
        );
    });
});

const parseAnchor = (attributes: Record<string, string>, options?: LinkPluginOptions): unknown => {
    const anchor = window.document.createElement('a');

    for (const [name, value] of Object.entries(attributes)) {
        anchor.setAttribute(name, value);
    }

    const rule = linkPlugin(options).content?.marks?.link?.parse[0];

    if (rule === undefined || rule.tag === undefined || rule.value === undefined) {
        throw new Error('the link mark declares no rule that reads an anchor');
    }

    return rule.value(anchor);
};

describe('reading a pasted link', () => {
    it('keeps an appearance this editor offers', () => {
        const value = parseAnchor(
            { href: 'https://example.com', 'data-appearance': 'secondary' },
            { kinds: BUTTON_KINDS },
        );

        expect(value).toEqual({ href: 'https://example.com', appearance: 'secondary' });
    });

    it('drops any appearance when the editor does not offer buttons, and keeps all three when it does', () => {
        for (const appearance of ALL_LINK_APPEARANCES) {
            const attributes = { href: 'https://example.com', 'data-appearance': appearance };

            expect(parseAnchor(attributes)).toEqual({ href: 'https://example.com' });
            expect(parseAnchor(attributes, { kinds: BUTTON_KINDS })).toEqual({
                href: 'https://example.com',
                appearance,
            });
        }
    });

    it('drops the appearance although button looks are set, because a look never offers buttons', () => {
        const attributes = { href: 'https://example.com', 'data-appearance': 'primary' };

        expect(parseAnchor(attributes, { kinds: ['text'], look: { button: { primary: { color: 'white' } } } })).toEqual(
            {
                href: 'https://example.com',
            },
        );
    });

    it('drops an appearance that is not one', () => {
        const value = parseAnchor({ href: 'https://example.com', 'data-appearance': 'huge' }, { kinds: BUTTON_KINDS });

        expect(value).toEqual({ href: 'https://example.com' });
    });

    it('reads a plain link and a new tab link as before', () => {
        expect(parseAnchor({ href: 'https://example.com' })).toEqual({ href: 'https://example.com' });
        expect(parseAnchor({ href: 'https://example.com', target: '_blank' })).toEqual({
            href: 'https://example.com',
            openInNewTab: true,
        });
    });

    it('reads a new tab target in any letter case', () => {
        for (const target of ['_BLANK', '_Blank']) {
            expect(parseAnchor({ href: 'https://example.com', target })).toEqual({
                href: 'https://example.com',
                openInNewTab: true,
            });
        }
    });

    it('reads a target that lowercases to _blank only outside ASCII as the same tab', () => {
        // U+212A is the Kelvin sign, which Unicode lowercasing turns into k.
        expect(parseAnchor({ href: 'https://example.com', target: '_blan\u212A' })).toEqual({
            href: 'https://example.com',
        });
    });
});

describe('the link plugin button looks', () => {
    it('sets a custom property for each field of a look, and of its hover look', () => {
        const plugin = linkPlugin({
            look: {
                button: {
                    primary: {
                        color: 'var(--f-theme-settings-button-primary-color)',
                        paddingTop: '4px',
                        hover: { backgroundColor: 'navy' },
                    },
                },
            },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-button-primary-color': 'var(--f-theme-settings-button-primary-color)',
            '--rte-button-primary-padding-top': '4px',
            '--rte-button-primary-hover-background-color': 'navy',
        });
    });

    it('compiles the button looks only from `look.button`, and none from `look.text`', () => {
        const plugin = linkPlugin({ look: { text: { color: 'blue' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-link-color': 'blue' });
    });

    it('shares the default content when kinds is only text and there is no look', () => {
        expect(linkPlugin().content).toBe(linkContent());
        expect(linkPlugin({ kinds: ['text'] }).content).toBe(linkContent());
    });

    it('sets no button custom properties for offered buttons without a look', () => {
        const plugin = linkPlugin({ kinds: BUTTON_KINDS });

        expect(plugin.content?.contentProperties).toEqual({});
    });

    it('styles a stored button from `look.button` without offering buttons', () => {
        const plugin = linkPlugin({ look: { button: { primary: { color: 'white' } } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-button-primary-color': 'white' });
        expect(plugin.content?.marks?.link?.toHtml({ href: '/a', appearance: 'primary' }).attrs).toMatchObject({
            'data-appearance': 'primary',
        });
    });

    it('refuses a value that could break out of its declaration, naming the appearance and the field', () => {
        expect(() => linkPlugin({ look: { button: { secondary: { borderColor: 'red; display: none' } } } })).toThrow(
            /"borderColor".*"button-secondary"/,
        );
        expect(() => linkPlugin({ look: { button: { tertiary: { hover: { color: '' } } } } })).toThrow(
            /"color".*"button-tertiary-hover"/,
        );
    });
});

describe('the link kinds', () => {
    it('refuses kinds that leave out text, naming the option', () => {
        expect(() => linkPlugin({ kinds: ['button'] })).toThrow(/kinds must include 'text'/);
        expect(() => linkContent({ kinds: ['button'] })).toThrow(/kinds must include 'text'/);
        expect(() => linkPlugin({ kinds: [] })).toThrow(/kinds must include 'text'/);
    });

    it('shares the mark between content that offers buttons, so the registry accepts them together', () => {
        const plugin = linkPlugin({ kinds: BUTTON_KINDS, look: { text: { color: 'blue' } } });

        expect(plugin.content?.marks?.link).toBe(linkContent({ kinds: BUTTON_KINDS }).marks?.link);
        expect(() => buildContentRegistry([linkContent({ kinds: BUTTON_KINDS }), plugin])).not.toThrow();
    });
});

describe('the link content', () => {
    it('hands out one shared content when given no look', () => {
        expect(linkContent()).toBe(linkContent({}));
    });

    it('carries the same look as the plugin given the same look', () => {
        const look = { text: { color: 'blue' } };

        expect(linkContent({ look })).toEqual(linkPlugin({ look }).content);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => linkContent({ look: { text: { color: 'red; display: none' } } })).toThrow(/"color".*"link"/);
    });

    it('carries the same content as the plugin given the same kinds and looks', () => {
        const options: LinkContentOptions = {
            kinds: BUTTON_KINDS,
            look: { text: { color: 'blue' }, button: { primary: { color: 'white' } } },
        };

        expect(linkContent(options)).toEqual(linkPlugin(options).content);
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
