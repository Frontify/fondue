/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createRef, Profiler, type ReactNode, useContext } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AnnouncerContext } from '#/bridge/announcer';
import { fixtureCodeBlockView } from '#/features/__fixtures__/code-block/view';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { deDE } from '#/locales/de-DE';
import { enUS } from '#/locales/en-US';
import { compileContentModel, type ContentNodeJSON, featureFromManifest, type JsonValue } from '#/model';
import { createTestEnvironment, pressKey, setSelection, typeText } from '#/testing';

import { fixtureLocale, toolbarDefinitions, TOOLBAR } from '../../fixtures/editor/ToolbarProbe';
import pullQuoteManifest from '../../fixtures/manifest/acme-pull-quote.json';

import { defineEditor, defineReactPresentation } from './define';
import { boldRules } from './playground.stories';
import { RichTextEditor } from './rich-text-editor';
import { type EditorHandle, type ReactPresentation, type RichTextEditorBaseProps } from './types';

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

/** Mounts the toolbar stand-ins with a test environment, under `theme` when given, and runs the first frame, so the editor is `ready`. */
const mount = (props: Props = {}, toolbar: ReactPresentation['toolbar'] = TOOLBAR, theme?: Theme) => {
    const environment = createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const { children, ...rest } = props;
    const editorProps = {
        'aria-label': 'Notes',
        definition: toolbarDefinitions.open,
        presentation: defineReactPresentation({ toolbar }),
        defaultValue: loaded(para(text('one two three'))),
        locale: fixtureLocale,
        environment,
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
    act(() => environment.flushFrames());
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    return { ...view, environment, handle };
};

const button = (name: string) => screen.getByRole('button', { name });
/** A code block stand-in, whose text takes no marks. */
const codeBlock = (value: string) => ({
    type: 'chrome_code',
    attrs: { nodeId: 'code-1', language: 'plain' },
    content: [text(value)],
});

afterEach(() => vi.restoreAllMocks());

describe('the fixed toolbar', () => {
    it('SPEC-rich-text-react/AC-002 throws an error naming the missing root for the toolbar outside it', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        expect(() => render(<RichTextEditor.Toolbar />)).toThrow(
            'RichTextEditor.Toolbar must be rendered inside RichTextEditor.Root.',
        );
    });

    it('SPEC-rich-text-react/AC-024 renders none of the bold, italic and link buttons while 100 characters are typed', () => {
        let renders = 0;
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={toolbarDefinitions.open}
                presentation={defineReactPresentation({ toolbar: [TOOLBAR[0] ?? []] })}
                defaultValue={loaded(para(text('one two three')))}
                locale={fixtureLocale}
                environment={environment}
                ref={ref}
            >
                <Profiler id="toolbar" onRender={() => (renders += 1)}>
                    <RichTextEditor.Toolbar />
                </Profiler>
                <RichTextEditor.Surface />
            </RichTextEditor.Root>,
        );
        act(() => environment.flushFrames());
        const handle = ref.current as EditorHandle<object>;
        act(() => setSelection(handle, { text: 'three', from: 5 }));
        renders = 0;

        act(() => typeText(handle, 'x'.repeat(100)));

        expect(screen.getAllByRole('button').map((item) => item.getAttribute('aria-label'))).toEqual([
            'Bold',
            'Italic',
            'Link',
            'More',
        ]);
        expect(renders).toBe(0);
        expect(JSON.stringify(handle.getSnapshot().document.content)).toContain(`three${'x'.repeat(100)}`);
    });

    it('SPEC-rich-text-react/AC-037 reports mixed for half bold text and pressed for the block toggle the caret sits in', () => {
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
        expect(button('Link')).not.toHaveAttribute('aria-pressed');
    });

    it('SPEC-rich-text-react/AC-038 keeps an item that cannot run at the selection focusable, with the reason in its tooltip', async () => {
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

    it('SPEC-rich-text-react/AC-038 gives the reason read-only for a read-only editor', async () => {
        const { handle } = mount({ readOnly: true });
        act(() => setSelection(handle(), { text: 'two' }));

        act(() => button('Bold').focus());
        const tooltip = await screen.findByRole('tooltip');

        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
        expect(tooltip).toHaveTextContent('The content is read-only');
        expect(tooltip).not.toHaveTextContent('Not allowed in this editor');
    });

    it('SPEC-rich-text-react/AC-038 gives the reason not allowed for a command the policy refuses after mount', async () => {
        const model = compileContentModel([core(), bold(), boldRules()], { id: 'test.toolbar', version: 1 });
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
                'marks.bold': { create: false, edit: true, remove: true, paste: true },
            },
        });
        act(() => setSelection(handle(), { text: 'two' }));

        act(() => button('Bold').focus());
        const tooltip = await screen.findByRole('tooltip');

        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
        expect(tooltip).toHaveTextContent('Not allowed in this editor');
        expect(tooltip).not.toHaveTextContent('The content is read-only');
    });

    it('SPEC-rich-text-react/AC-036 leaves focus where the author moved it while the item ran', async () => {
        const { handle } = mount({ children: <button type="button">Host</button> });
        act(() => setSelection(handle(), { text: 'two' }));
        act(() => button('Bold').focus());

        fireEvent.click(button('Bold'));
        act(() => button('Host').focus());
        await act(() => Promise.resolve());

        expect(button('Host')).toHaveFocus();
        expect(button('Bold')).toHaveAttribute('aria-pressed', 'true');
    });

    it('SPEC-rich-text-react/AC-036 returns focus to the surface when nothing else took it', async () => {
        const { handle } = mount();
        act(() => setSelection(handle(), { text: 'two' }));
        act(() => button('Bold').focus());

        await act(() => fireEvent.click(button('Bold')));

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveFocus();
    });

    it('SPEC-rich-text-react/AC-099 SPEC-rich-text-react/AC-038 leaves out a command the policy refuses and keeps one the selection disables', () => {
        const { unmount } = mount({ definition: toolbarDefinitions.boldBlocked });
        const refused = screen.getAllByRole('button').map((item) => item.getAttribute('aria-label'));
        unmount();
        const { handle } = mount({ defaultValue: loaded(codeBlock('let code = 1')) });
        act(() => setSelection(handle(), { text: 'code' }));

        expect(refused).toEqual(['Italic', 'Link', 'List', 'More']);
        expect(button('Bold')).toHaveAttribute('aria-disabled', 'true');
    });

    it('SPEC-rich-text-react/AC-079 sets aria-keyshortcuts to Alt+F10, or to the presentation toolbarShortcut', () => {
        const { unmount } = mount();
        const fallback = screen.getByRole('toolbar').getAttribute('aria-keyshortcuts');
        unmount();
        mount({ presentation: defineReactPresentation({ toolbar: TOOLBAR, toolbarShortcut: 'Mod-Alt-t' }) });

        expect(fallback).toBe('Alt+F10');
        expect(screen.getByRole('toolbar')).toHaveAttribute('aria-keyshortcuts', 'Control+Alt+T');
    });

    it('SPEC-rich-text-react/AC-090 calls onFocus and onBlur for moves into the toolbar and back, and out to a host button', () => {
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

    it('SPEC-rich-text-react/AC-091 keeps the name of each toggle item when it toggles', () => {
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

    it('SPEC-rich-text-runtime/AC-037 leaves the document unchanged by the button, Mod-b and **x** when the policy refuses bold', async () => {
        const model = compileContentModel([core(), bold(), boldRules()], { id: 'test.toolbar', version: 1 });
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
        // The untyped handle, since the definition's commands are not known to this test.
        const executed = (handle() as EditorHandle).execute('mark.bold.toggle');

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

describe('the announcer', () => {
    const Announce = ({ message, coalesce }: { readonly message: string; readonly coalesce?: string }) => {
        const announcer = useContext(AnnouncerContext);
        return (
            <button type="button" onClick={() => announcer?.announce(message, coalesce)}>
                {message}
            </button>
        );
    };
    const region = () => screen.getByTestId('fondue-rich-text-editor-announcer');

    it('SPEC-rich-text-accessibility/AC-037 SPEC-rich-text-accessibility/AC-038 renders one polite region at mount, off the surface, that a save message reaches', () => {
        mount({ children: <Announce message="Saved" /> });
        const before = region().textContent;

        fireEvent.click(button('Saved'));

        expect(document.querySelectorAll('[aria-live]')).toHaveLength(1);
        expect(region()).toHaveAttribute('aria-live', 'polite');
        expect(screen.getByRole('textbox', { name: 'Notes' })).not.toHaveAttribute('aria-live');
        expect(document.querySelectorAll('[role="alert"], [aria-live="assertive"]')).toHaveLength(0);
        expect([before, region().textContent]).toEqual(['', 'Saved']);
    });

    it('SPEC-rich-text-accessibility/AC-039 clears the region before each message and changes a repeat with a no-break space', () => {
        mount({ children: <Announce message="Saved" /> });
        const observer = new MutationObserver(() => undefined);
        observer.observe(region(), { childList: true });

        fireEvent.click(button('Saved'));
        fireEvent.click(button('Saved'));
        fireEvent.click(button('Saved'));
        const records = observer
            .takeRecords()
            .flatMap((mutation) => [
                ...[...mutation.removedNodes].map(() => 'cleared'),
                ...[...mutation.addedNodes].map((node) => node.textContent),
            ]);
        observer.disconnect();

        expect(records).toEqual(['Saved', 'cleared', 'Saved\u00A0', 'cleared', 'Saved']);
    });

    it('SPEC-rich-text-accessibility/AC-040 announces only the latest of five find counts that arrive within 500 ms', () => {
        const counts = ['Results: 5', 'Results: 4', 'Results: 3', 'Results: 2', 'Results: 1'];
        const { environment } = mount({
            children: (
                <>
                    {counts.map((count) => (
                        <Announce key={count} message={count} coalesce="find" />
                    ))}
                </>
            ),
        });

        for (const count of counts) {
            fireEvent.click(button(count));
            act(() => environment.advance(100));
        }
        const early = region().textContent;
        act(() => environment.advance(500));

        expect(early).toBe('');
        expect(region().textContent).toBe('Results: 1');
    });

    /** The messages the region received, in order, whatever it shows now. */
    const spoken = () => {
        const seen: string[] = [];
        new MutationObserver((records) => {
            for (const record of records) {
                for (const node of record.addedNodes) {
                    seen.push(node.textContent ?? '');
                }
            }
        }).observe(region(), { childList: true });
        return seen;
    };

    it('SPEC-rich-text-accessibility/AC-040 coalesces two messages 499 ms apart and announces both 501 ms apart', async () => {
        const { environment } = mount({
            children: (
                <>
                    <Announce message="First" coalesce="find" />
                    <Announce message="Second" coalesce="find" />
                </>
            ),
        });
        const seen = spoken();

        fireEvent.click(button('First'));
        act(() => environment.advance(499));
        fireEvent.click(button('Second'));
        act(() => environment.advance(499));
        const coalesced = region().textContent;
        act(() => environment.advance(1));
        await Promise.resolve();
        const afterClose = [...seen];
        fireEvent.click(button('First'));
        act(() => environment.advance(501));
        fireEvent.click(button('Second'));
        act(() => environment.advance(501));
        await Promise.resolve();

        expect(coalesced).toBe('');
        expect(afterClose).toEqual(['Second']);
        expect(seen).toEqual(['Second', 'First', 'Second']);
    });

    it('SPEC-rich-text-accessibility/AC-040 coalesces per key, so a message with another key is not swallowed', async () => {
        const { environment } = mount({
            children: (
                <>
                    <Announce message="Find 3" coalesce="find" />
                    <Announce message="Saved" coalesce="save" />
                </>
            ),
        });
        const seen = spoken();

        fireEvent.click(button('Find 3'));
        fireEvent.click(button('Saved'));
        act(() => environment.advance(500));
        await Promise.resolve();

        expect(seen.filter((text) => text !== '').sort()).toEqual(['Find 3', 'Saved']);
    });
});

describe('toolbar theming and localization', () => {
    it('SPEC-rich-text/AC-074 labels a data manifest entry in the UI locale by RFC 4647 lookup, else en-US', () => {
        const [entry] = pullQuoteManifest.toolbar;
        // The fixture's platform-prefixed keys fail in the engine keymap today, and no label needs them.
        const manifest = {
            ...pullQuoteManifest,
            keys: {},
            toolbar: [
                {
                    ...entry,
                    label: {
                        'en-US': 'Pull quote',
                        de: 'Zitat',
                        'de-CH': 'Zitat CH',
                        'zh-Hant': '引言',
                        'zh-hant-tw': '引言 TW',
                    },
                },
            ],
        };
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), featureFromManifest(manifest)()], { id: 'test.toolbar', version: 1 }),
        });
        const labels = ['de-CH', 'DE-ch', 'de-AT', 'de', 'zh-Hant-TW', 'zh-Hant-HK', 'fr-FR'].map((lang) => {
            const { unmount } = mount({ definition, locale: { ...enUS, lang } }, [['acme.pull-quote.set']]);
            const name = within(screen.getByRole('toolbar')).getAllByRole('button')[0]?.getAttribute('aria-label');
            unmount();
            return name;
        });

        expect(labels).toEqual(['Zitat CH', 'Zitat CH', 'Zitat', 'Zitat', '引言 TW', '引言', 'Pull quote']);
    });

    it('SPEC-rich-text-accessibility/AC-032 shows the items of two editors with one presentation in the same order', () => {
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

        expect(first).toEqual(['Bold', 'Italic', 'Link', 'List', 'More']);
        expect(second).toEqual(first);
        unmount();
    });

    it('SPEC-rich-text-react/AC-060 takes the surface lang and dir from the theme when the document sets neither', () => {
        const { unmount } = mount({}, TOOLBAR, { lang: 'ar', dir: 'rtl' });

        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'ar');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('dir', 'rtl');
        unmount();
    });

    it('SPEC-rich-text-react/AC-061 takes the document lang and dir on the surface while the toolbar keeps the theme direction', () => {
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

    it('SPEC-rich-text-react/AC-061 gives node chrome inside an rtl Hebrew document the theme lang and dir', async () => {
        const stored = loaded(para(text('שלום')), codeBlock('let a'));
        const document = {
            ...stored.document,
            content: { ...stored.document.content, attrs: { lang: 'he', dir: 'rtl' } },
        };
        const { environment, unmount } = mount({ defaultValue: { ...stored, document } }, TOOLBAR, {
            lang: 'en-US',
            dir: 'ltr',
        });
        await act(() => environment.flushMicrotasks());

        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');
        if (slot === null) {
            throw new Error('no node chrome');
        }
        expect([slot.getAttribute('lang'), slot.getAttribute('dir')]).toEqual(['en-US', 'ltr']);
        unmount();
    });

    it('SPEC-rich-text-react/AC-061 gives node chrome the lang of the shown strings under a theme of another lang', async () => {
        const { environment, unmount } = mount({ locale: deDE, defaultValue: loaded(codeBlock('let a')) }, TOOLBAR, {
            lang: 'en-US',
            dir: 'ltr',
        });
        await act(() => environment.flushMicrotasks());

        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');
        if (slot === null) {
            throw new Error('no node chrome');
        }
        expect(slot).toHaveAttribute('lang', 'de-DE');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'en-US');
        unmount();
    });

    it('SPEC-rich-text-react/AC-061 sets the surface dir from a document with a dir and no lang, and leaves its lang to the theme', () => {
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

    it('SPEC-rich-text-react/AC-033 gives the node chrome toolbar the theme direction under rtl', async () => {
        const { environment, unmount } = mount({ defaultValue: loaded(codeBlock('let a')) }, TOOLBAR, { dir: 'rtl' });
        await act(() => environment.flushMicrotasks());

        expect(screen.getByRole('toolbar', { name: 'plain' })).toHaveAttribute('dir', 'rtl');
        unmount();
    });

    it('SPEC-rich-text-react/AC-061 marks the root with the language of the shown strings, while the surface keeps the theme one', () => {
        const { unmount } = mount({ locale: deDE }, TOOLBAR, { lang: 'en-US', dir: 'ltr' });

        expect(screen.getByTestId('fondue-rich-text-editor')).toHaveAttribute('lang', 'de-DE');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('lang', 'en-US');
        unmount();
    });

    it('SPEC-rich-text-react/AC-061 SPEC-rich-text/AC-074 gives the root, node chrome and manifest labels the theme lang when the locale has none', async () => {
        const [entry] = pullQuoteManifest.toolbar;
        const manifest = {
            ...pullQuoteManifest,
            keys: {},
            toolbar: [{ ...entry, label: { 'en-US': 'Pull quote', fr: 'Citation' } }],
        };
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), featureFromManifest(manifest)(), fixtureCodeBlockView()], {
                id: 'test.toolbar',
                version: 1,
            }),
        });
        const { environment, unmount } = mount(
            {
                definition,
                locale: { translationStrings: enUS.translationStrings },
                defaultValue: loaded(codeBlock('let a')),
            },
            [['acme.pull-quote.set']],
            { lang: 'fr-FR' },
        );
        await act(() => environment.flushMicrotasks());
        const slot = screen.getByRole('textbox', { name: 'Notes' }).querySelector('[data-rte-chrome]');

        expect(screen.getByTestId('fondue-rich-text-editor')).toHaveAttribute('lang', 'fr-FR');
        expect(slot).toHaveAttribute('lang', 'fr-FR');
        expect(screen.getByRole('button', { name: 'Citation' })).toBeInTheDocument();
        unmount();
    });

    it('SPEC-rich-text-react/AC-039 leaves out a plain binding that a mac: binding of the same key replaces on Apple platforms', () => {
        const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
        const manifest = {
            ...pullQuoteManifest,
            commands: {
                ...pullQuoteManifest.commands,
                'acme.pull-quote.unset': { capability: 'setBlock', node: 'paragraph' },
            },
            keys: { 'Mod-Alt-q': 'acme.pull-quote.set', 'mac:Mod-Alt-q': 'acme.pull-quote.unset' },
        };
        const definition = defineEditor({
            id: 'test.toolbar',
            model: compileContentModel([core(), featureFromManifest(manifest)()], { id: 'test.toolbar', version: 1 }),
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
