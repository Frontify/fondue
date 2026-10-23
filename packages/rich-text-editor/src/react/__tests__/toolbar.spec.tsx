/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createRef, type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPlugin } from '#/bridge/plugin';
import { fixtureCodeBlock } from '#/features/__tests__/fixtures/code-block/feature';
import { fixtureCodeBlockEditor } from '#/features/__tests__/fixtures/code-block/view';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type ContentNodeJSON,
    type CommandRef,
    defineFeature,
    type JsonValue,
    type KeyBinding,
} from '#/model';
import { pressKey, setSelection, typeText } from '#/testing';

import { defineEditor, defineReactPresentation } from '../define';
import { RichTextEditor } from '../rich-text-editor';
import {
    type CommandsOfModel,
    type EditorHandle,
    type ReactPresentation,
    type RichTextEditorBaseProps,
} from '../types';

import { fixtureLocale, toolbarDefinitions, TOOLBAR } from './fixtures/ToolbarProbe';

const text = (value: string, marks: readonly JsonValue[] = []) => ({ type: 'text', text: value, marks });
const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const strong = { type: 'bold', attrs: {} };
const loaded = (...blocks: readonly JsonValue[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.toolbar', version: 1 },
        requiredCapabilities: [
            { id: 'core', version: 1 },
            { id: 'fixture.code-block', version: 1 },
        ],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks as unknown as ContentNodeJSON[] },
    },
});

type Props = Partial<RichTextEditorBaseProps<object>> & { readonly children?: ReactNode };
type Theme = Omit<Parameters<typeof ThemeProvider>[0], 'children'>;

/** Mounts the toolbar stand-ins, under `theme` when given, and runs the first frame, so the editor is `ready`. */
const mount = (props: Props = {}, toolbar: ReactPresentation['toolbar'] = TOOLBAR, theme?: Theme) => {
    const ref = createRef<EditorHandle<object>>();
    const { children, ...rest } = props;
    const editorProps = {
        'aria-label': 'Notes',
        definition: toolbarDefinitions.open,
        presentation: defineReactPresentation({ toolbar }),
        defaultValue: loaded(para(text('one two three'))),
        locale: fixtureLocale,
        ref,
        ...rest,
    } as const;
    let element = <RichTextEditor {...editorProps} />;
    if (children !== undefined) {
        element = (
            <RichTextEditor.Root {...editorProps}>
                <RichTextEditor.Toolbar />
                <RichTextEditor.Surface />
                {children}
            </RichTextEditor.Root>
        );
    }
    if (theme !== undefined) {
        element = <ThemeProvider {...theme}>{element}</ThemeProvider>;
    }
    const view = render(element);
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    return { ...view, handle };
};

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

const button = (name: string) => screen.getByRole('button', { name });
/** A code block stand-in, whose text takes no marks. */
const codeBlock = (value: string) => ({
    type: 'chrome_code',
    attrs: { nodeId: 'code-1', language: 'plain' },
    content: [text(value)],
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('the fixed toolbar', () => {
    it('throws an error naming the missing root for the toolbar outside it', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        expect(() => render(<RichTextEditor.Toolbar />)).toThrow(
            'RichTextEditor.Toolbar must be rendered inside RichTextEditor.Root.',
        );
    });

    it('reports mixed for half bold text and pressed for the block toggle the caret sits in', () => {
        const { handle } = mount({
            defaultValue: loaded(para(text('half '), text('bold', [strong])), {
                type: 'toggled_block',
                attrs: {},
                content: [text('quoted')],
            }),
        });

        act(() => setSelection(handle(), { text: 'half bold' }));
        const halfBold = button('Bold').getAttribute('aria-pressed');
        act(() => setSelection(handle(), { text: 'quoted', from: 2, to: 2 }));

        expect(halfBold).toBe('mixed');
        expect(button('List')).toHaveAttribute('aria-pressed', 'true');
        expect(button('Bold')).toHaveAttribute('aria-pressed', 'false');
    });

    it('keeps an item that cannot run at the selection focusable, with the reason in its tooltip', async () => {
        const { handle } = mount({ defaultValue: loaded(codeBlock('let code = 1')) });
        act(() => setSelection(handle(), { text: 'code' }));

        act(() => button('Bold').focus());
        const tooltip = await screen.findByRole('tooltip');

        expect(button('Bold')).toHaveFocus();
        expect(button('Bold')).not.toBeDisabled();
        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
        expect(tooltip).toHaveTextContent('Not available at the current selection');
        expect(button('Bold')).toHaveAccessibleDescription(
            expect.stringContaining('Not available at the current selection'),
        );
    });

    it('gives the reason read-only for a read-only editor', async () => {
        const { handle } = mount({ readOnly: true });
        act(() => setSelection(handle(), { text: 'two' }));

        act(() => button('Bold').focus());
        const tooltip = await screen.findByRole('tooltip');

        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
        expect(tooltip).toHaveTextContent('The content is read-only');
        expect(tooltip).not.toHaveTextContent('Not allowed in this editor');
    });

    it('gives the reason not allowed for a command the policy refuses after mount', async () => {
        const model = compileContentModel([core(), bold()], { id: 'test.toolbar', version: 1 });
        const definition = defineEditor({ id: 'test.toolbar', model });
        const { handle } = mount({
            definition,
            presentation: defineReactPresentation({ toolbar: [['mark.bold.toggle']] }),
        });
        const { authoring } = definition;
        handle().updatePolicy({
            ...authoring,
            features: {
                ...authoring.features,
                'marks.bold': { create: false, edit: true, remove: true },
            },
        });
        act(() => setSelection(handle(), { text: 'two' }));

        act(() => button('Bold').focus());
        const tooltip = await screen.findByRole('tooltip');

        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
        expect(tooltip).toHaveTextContent('Not allowed in this editor');
        expect(tooltip).not.toHaveTextContent('The content is read-only');
    });

    it('leaves focus where the author moved it while the item ran', async () => {
        const { handle } = mount({ children: <button type="button">Host</button> });
        act(() => setSelection(handle(), { text: 'two' }));
        act(() => button('Bold').focus());

        fireEvent.click(button('Bold'));
        act(() => button('Host').focus());
        await act(() => Promise.resolve());

        expect(button('Host')).toHaveFocus();
        expect(button('Bold')).toHaveAttribute('aria-pressed', 'true');
    });

    it('returns focus to the surface when nothing else took it', async () => {
        const { handle } = mount();
        act(() => setSelection(handle(), { text: 'two' }));
        act(() => button('Bold').focus());

        await act(() => fireEvent.click(button('Bold')));

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveFocus();
    });

    it('leaves out a command the policy refuses and keeps one the selection disables', () => {
        const { unmount } = mount({ definition: toolbarDefinitions.boldBlocked });
        const refused = screen.getAllByRole('button').map((item) => item.getAttribute('aria-label'));
        unmount();
        const { handle } = mount({ defaultValue: loaded(codeBlock('let code = 1')) });
        act(() => setSelection(handle(), { text: 'code' }));

        expect(refused).toEqual(['Italic', 'List', 'More']);
        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-keyshortcuts to Alt+F10, or to the presentation toolbarShortcut', () => {
        const { unmount } = mount();
        const fallback = screen.getByRole('toolbar').getAttribute('aria-keyshortcuts');
        unmount();
        mount({ presentation: defineReactPresentation({ toolbar: TOOLBAR, toolbarShortcut: 'Mod-Alt-t' }) });

        expect(fallback).toBe('Alt+F10');
        expect(screen.getByRole('toolbar')).toHaveAttribute('aria-keyshortcuts', 'Control+Alt+T');
    });

    it('calls onFocus and onBlur for moves into the toolbar and back, and out to a host button', () => {
        const calls: string[] = [];
        mount({
            onFocus: () => calls.push('focus'),
            onBlur: () => calls.push('blur'),
            children: <button type="button">Host</button>,
        });
        const surface = screen.getByRole('textbox', { name: 'Notes' });

        act(() => surface.focus());
        act(() => button('Bold').focus());
        act(() => surface.focus());
        act(() => button('Host').focus());

        expect(calls).toEqual(['focus', 'blur', 'focus', 'blur']);
    });

    it('keeps the name of each toggle item when it toggles', () => {
        const { handle } = mount();
        act(() => setSelection(handle(), { text: 'two' }));
        const names = () => ['Bold', 'Italic', 'List'].map((name) => button(name).getAttribute('aria-label'));
        const before = names();

        act(() => {
            fireEvent.click(button('Bold'));
        });
        act(() => {
            fireEvent.click(button('Italic'));
        });
        act(() => {
            fireEvent.click(button('List'));
        });

        expect(['Bold', 'Italic', 'List'].map((name) => button(name).getAttribute('aria-pressed'))).toEqual([
            'true',
            'true',
            'true',
        ]);
        expect(names()).toEqual(before);
    });

    it('leaves the document unchanged by the button, Mod-b and **x** when the policy refuses bold', async () => {
        const model = compileContentModel([core(), bold()], { id: 'test.toolbar', version: 1 });
        const ALLOW = { create: true, edit: true, remove: true, paste: true };
        const definition = defineEditor({ id: 'test.toolbar', model });
        const { handle } = mount({
            definition,
            presentation: defineReactPresentation({ toolbar: [['mark.bold.toggle']] }),
        });
        // A policy update after mount, so the button the mounted policy showed is still there to press.
        const { authoring } = definition;
        handle().updatePolicy({
            ...authoring,
            features: { ...authoring.features, 'marks.bold': { ...ALLOW, create: false } },
        });
        const content = () => JSON.stringify(handle().getSnapshot().document.content);
        act(() => setSelection(handle(), { text: 'two' }));
        const before = content();
        // The mount helper takes any definition, so its handle knows none of this model's commands.
        const executed = (handle() as EditorHandle<CommandsOfModel<typeof model>>).execute('mark.bold.toggle');

        await act(() => fireEvent.click(button('Bold')));
        act(() => pressKey(handle(), 'Mod-b'));
        const afterRoutes = content();
        act(() => setSelection(handle(), { text: 'three', from: 5 }));
        act(() => typeText(handle(), ' **x**'));

        expect(executed).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(afterRoutes).toBe(before);
        expect(content()).not.toContain('"bold"');
    });
});

const pullQuote = () =>
    defineFeature({
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: {},
                html: ['blockquote', { class: 'acme-pull-quote' }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote' }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    })();
const pullQuotePlugin = (
    label: Readonly<Record<string, string>> & { readonly 'en-US': string },
    keys: Readonly<Record<KeyBinding, CommandRef>> = {},
) =>
    defineEditorPlugin(pullQuote(), {
        commands: {
            'acme.pull-quote.set': {
                run: (api) => api.blocks.set('acme_pull_quote', undefined, { toggle: true }),
                active: (api) => api.blocks.active('acme_pull_quote'),
            },
            'acme.pull-quote.unset': {
                run: (api) => api.blocks.set('paragraph'),
                active: (api) => api.blocks.active('paragraph'),
            },
        },
        keys,
        toolbar: [
            {
                id: 'acme.pull-quote',
                kind: 'toggle',
                command: 'acme.pull-quote.set',
                label,
                icon: 'IconSpeechBubbleQuote',
            },
        ],
    });

describe('toolbar theming and localization', () => {
    it('labels a plugin entry in the UI locale by RFC 4647 lookup, else en-US', () => {
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), pullQuote()], { id: 'test.toolbar', version: 1 }),
            plugins: [
                pullQuotePlugin({
                    'en-US': 'Pull quote',
                    de: 'Zitat',
                    'de-CH': 'Zitat CH',
                    'zh-Hant': '引言',
                    'zh-hant-tw': '引言 TW',
                }),
            ],
        });
        const labels = ['de-CH', 'DE-ch', 'de-AT', 'de', 'zh-Hant-TW', 'zh-Hant-HK', 'fr-FR'].map((lang) => {
            const { unmount } = mount({ definition, locale: { ...enUS, lang } }, [['acme.pull-quote.set']]);
            const name = within(screen.getByRole('toolbar')).getAllByRole('button')[0]?.getAttribute('aria-label');
            unmount();
            return name;
        });

        expect(labels).toEqual(['Zitat CH', 'Zitat CH', 'Zitat', 'Zitat', '引言 TW', '引言', 'Pull quote']);
    });

    it('shows the items of two editors with one presentation in the same order', () => {
        const presentation = defineReactPresentation({ toolbar: TOOLBAR });
        const names = () =>
            screen.getAllByRole('toolbar', { name: 'Text formatting' }).map((toolbar) =>
                within(toolbar)
                    .getAllByRole('button')
                    .map((item) => item.getAttribute('aria-label')),
            );
        const { unmount } = mount({
            presentation,
            children: (
                <RichTextEditor
                    aria-label="Second"
                    definition={toolbarDefinitions.open}
                    presentation={presentation}
                    defaultValue={loaded(para(text('four five')))}
                    locale={fixtureLocale}
                />
            ),
        });
        const [first, second] = names();

        expect(first).toEqual(['Bold', 'Italic', 'List', 'More']);
        expect(second).toEqual(first);
        unmount();
    });

    it('takes the surface lang and dir from the theme when the document sets neither', () => {
        const { unmount } = mount({}, TOOLBAR, { lang: 'ar', dir: 'rtl' });

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'ar');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('dir', 'rtl');
        unmount();
    });

    it('takes the document lang and dir on the surface while the toolbar keeps the theme direction', () => {
        const stored = loaded(para(text('שלום')));
        const document = {
            ...stored.document,
            content: { ...stored.document.content, attrs: { lang: 'he', dir: 'rtl' } },
        };
        const { unmount } = mount({ defaultValue: { ...stored, document } }, TOOLBAR, { lang: 'en-US', dir: 'ltr' });

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'he');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('dir', 'rtl');
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toHaveAttribute('dir', 'ltr');
        expect(screen.getByRole('toolbar', { name: 'Text formatting' }).closest('[lang]')).toHaveAttribute(
            'lang',
            'en-US',
        );
        unmount();
    });

    it('gives node chrome inside an rtl Hebrew document the theme lang and dir', async () => {
        const stored = loaded(para(text('שלום')), codeBlock('let a'));
        const document = {
            ...stored.document,
            content: { ...stored.document.content, attrs: { lang: 'he', dir: 'rtl' } },
        };
        const { unmount } = mount({ defaultValue: { ...stored, document } }, TOOLBAR, {
            lang: 'en-US',
            dir: 'ltr',
        });
        await act(async () => {
            await new Promise((resolve) => {
                queueMicrotask(() => {
                    resolve(undefined);
                });
            });
        });

        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');
        if (slot === null) {
            throw new Error('no node chrome');
        }
        expect([slot.getAttribute('lang'), slot.getAttribute('dir')]).toEqual(['en-US', 'ltr']);
        unmount();
    });

    it('gives node chrome the lang of the shown strings under a theme of another lang', async () => {
        const { unmount } = mount({ locale: deDE, defaultValue: loaded(codeBlock('let a')) }, TOOLBAR, {
            lang: 'en-US',
            dir: 'ltr',
        });
        await act(async () => {
            await new Promise((resolve) => {
                queueMicrotask(() => {
                    resolve(undefined);
                });
            });
        });

        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');
        if (slot === null) {
            throw new Error('no node chrome');
        }
        expect(slot).toHaveAttribute('lang', 'de-DE');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'en-US');
        unmount();
    });

    it('sets the surface dir from a document with a dir and no lang, and leaves its lang to the theme', () => {
        const stored = loaded(para(text('שלום')));
        const document = {
            ...stored.document,
            content: { ...stored.document.content, attrs: { lang: null, dir: 'rtl' } },
        };
        const { unmount } = mount({ defaultValue: { ...stored, document } }, TOOLBAR, { lang: 'en-US', dir: 'ltr' });

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('dir', 'rtl');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'en-US');
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toHaveAttribute('dir', 'ltr');
        unmount();
    });

    it('gives the node chrome toolbar the theme direction under rtl', async () => {
        const { unmount } = mount({ defaultValue: loaded(codeBlock('let a')) }, TOOLBAR, { dir: 'rtl' });
        await act(async () => {
            await new Promise((resolve) => {
                queueMicrotask(() => {
                    resolve(undefined);
                });
            });
        });

        expect(screen.getByRole('toolbar', { name: 'plain' })).toHaveAttribute('dir', 'rtl');
        unmount();
    });

    it('marks the root with the language of the shown strings, while the surface keeps the theme one', () => {
        const { unmount } = mount({ locale: deDE }, TOOLBAR, { lang: 'en-US', dir: 'ltr' });

        expect(screen.getByTestId('fondue-rich-text-editor')).toHaveAttribute('lang', 'de-DE');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'en-US');
        unmount();
    });

    it('gives the root, node chrome and plugin labels the theme lang when the locale has none', async () => {
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), pullQuote(), fixtureCodeBlock()], {
                id: 'test.toolbar',
                version: 1,
            }),
            plugins: [pullQuotePlugin({ 'en-US': 'Pull quote', fr: 'Citation' }), fixtureCodeBlockEditor],
        });
        const { unmount } = mount(
            {
                definition,
                locale: { translationStrings: enUS.translationStrings },
                defaultValue: loaded(codeBlock('let a')),
            },
            [['acme.pull-quote.set']],
            { lang: 'fr-FR' },
        );
        await act(async () => {
            await new Promise((resolve) => {
                queueMicrotask(() => {
                    resolve(undefined);
                });
            });
        });
        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');

        expect(screen.getByTestId('fondue-rich-text-editor')).toHaveAttribute('lang', 'fr-FR');
        expect(slot).toHaveAttribute('lang', 'fr-FR');
        expect(screen.getByRole('button', { name: 'Citation' })).toBeInTheDocument();
        unmount();
    });

    it('leaves out a plain binding that a mac: binding of the same key replaces on Apple platforms', () => {
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
        const keys = { 'Mod-Alt-q': 'acme.pull-quote.set', 'mac:Mod-Alt-q': 'acme.pull-quote.unset' } as const;
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), pullQuote()], { id: 'test.toolbar', version: 1 }),
            plugins: [pullQuotePlugin({ 'en-US': 'Pull quote' }, keys)],
        });
        const shortcutOf = () => {
            const { unmount } = mount({ definition }, [['acme.pull-quote.set']]);
            const shown = screen.getByRole('button', { name: 'Pull quote' }).getAttribute('aria-keyshortcuts');
            unmount();
            return shown;
        };

        const apple = shortcutOf();
        platform.mockReturnValue('Win32');

        expect([apple, shortcutOf()]).toEqual([null, 'Control+Alt+Q']);
    });
});
