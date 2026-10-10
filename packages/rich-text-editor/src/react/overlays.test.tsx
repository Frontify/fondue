/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { deDE as fondueDeDE } from '@frontify/fondue-components/locales';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { type ComponentType, createRef, lazy, type ReactNode, useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineNodeView } from '#/bridge/define';
import { fixtureCodeBlockView } from '#/features/__fixtures__/code-block/view';
import { fixtureItalic, fixtureLink, fixtureToolbar } from '#/features/__fixtures__/features';
import { fixtureMediaImage } from '#/features/__fixtures__/media/feature';
import { fixtureMediaImageView } from '#/features/__fixtures__/media/view';
import {
    type FixtureOverlayProps,
    FixtureLinkPopover,
    FixtureMenu,
    FixtureSuggestions,
    LinkForm,
} from '#/features/__fixtures__/overlays/overlays';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, type ContentNodeJSON, type JsonValue } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { createTestEnvironment, setSelection, typeText } from '#/testing';

import { fixtureLocale, TOOLBAR } from '../../fixtures/editor/ToolbarProbe';

import { defineEditor, defineReactPresentation } from './define';
import { useEditorHandle } from './hooks';
import { RichTextEditor } from './rich-text-editor';
import { type EditorHandle, type RichTextEditorBaseProps } from './types';

const model = compileContentModel(
    [core(), bold(), fixtureItalic(), fixtureLink(), fixtureToolbar(), fixtureCodeBlockView(), fixtureMediaImageView()],
    { id: 'test.overlays', version: 1 },
);
const definition = defineEditor({ id: 'test.overlays', model });
const presentation = defineReactPresentation({ toolbar: TOOLBAR });
const text = (value: string) => ({ type: 'text', text: value, marks: [] });
const para = (value: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [text(value)] });
const image = { type: 'media_image', attrs: { nodeId: 'image-1', assetId: null, alt: '' } };
const loaded = (...blocks: readonly JsonValue[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: model.ref,
        requiredCapabilities: [
            { id: 'core', version: 1 },
            { id: 'fixture.media-image', version: 1 },
        ],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks as unknown as ContentNodeJSON[] },
    },
});

type Props = Partial<RichTextEditorBaseProps<object>> & { readonly children?: ReactNode };

/** Composes the fixed and bubble toolbars, the surface and `children` in `RichTextEditor.Root`, ready. */
const mount = ({ children, ...rest }: Props) => {
    const environment = createTestEnvironment({ seed: 1 });
    const ref = createRef<EditorHandle<object>>();
    const view = render(
        <>
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                defaultValue={loaded(para('one two three'))}
                locale={fixtureLocale}
                environment={environment}
                ref={ref}
                {...rest}
            >
                <RichTextEditor.Toolbar />
                <RichTextEditor.BubbleToolbar />
                <RichTextEditor.Surface />
                {children}
            </RichTextEditor.Root>
            <button type="button">Host</button>
        </>,
    );
    act(() => environment.flushFrames());
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }
        return ref.current;
    };
    return { ...view, environment, handle };
};

/** An overlay that starts open and reports each close. */
const Opened = ({
    Overlay,
    onClose = () => undefined,
}: {
    readonly Overlay: ComponentType<FixtureOverlayProps>;
    readonly onClose?: () => void;
}) => {
    const [open, setOpen] = useState(true);
    return (
        <Overlay
            open={open}
            onOpenChange={(next) => {
                if (!next) {
                    onClose();
                }
                setOpen(next);
            }}
        />
    );
};

const surface = () => screen.getByRole('textbox', { name: 'Notes' });
const bubble = () => screen.queryByRole('toolbar', { name: 'Selection formatting' });
const popover = () => screen.queryByTestId('fixture-link-popover');
/** Selects `value` with focus in the surface, which shows the bubble toolbar. */
const selectWithFocus = (handle: EditorHandle<object>, value: string) => {
    act(() => surface().focus());
    act(() => setSelection(handle, { text: value }));
};

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('editor overlays', () => {
    it('SPEC-rich-text-react/AC-045 renders an overlay into the overlay root inside the editor, or into its own root inside portalContainer', () => {
        const { unmount } = mount({ children: <Opened Overlay={FixtureLinkPopover} /> });
        const overlayRoot = popover()?.closest('[data-rte-overlays]');
        const inEditor =
            overlayRoot?.closest('[data-test-id="fondue-rich-text-editor"]') ===
            screen.getByTestId('fondue-rich-text-editor');
        unmount();
        const host = document.createElement('div');
        document.body.append(host);
        mount({ portalContainer: host, children: <Opened Overlay={FixtureLinkPopover} /> });

        expect(inEditor).toBe(true);
        const ownRoot = popover()?.closest('[data-rte-overlays]');
        expect(ownRoot?.parentElement).toBe(host);
        host.remove();
    });

    it.each(['tooltip', 'More menu', 'menu', 'alternative text dialog'] as const)(
        'SPEC-rich-text-react/AC-045 renders the %s into the overlay root inside the editor, or into its own root inside portalContainer',
        async (kind) => {
            const host = document.createElement('div');
            document.body.append(host);
            const results: { inside: boolean; owner: boolean; host: boolean }[] = [];
            for (const portalContainer of [undefined, host]) {
                let props: Props = {};
                if (kind === 'menu') {
                    props = { ...props, children: <Opened Overlay={FixtureMenu} /> };
                }
                if (kind === 'alternative text dialog') {
                    props = { ...props, defaultValue: loaded(para('one'), image) };
                }
                if (portalContainer !== undefined) {
                    props = { ...props, portalContainer };
                }
                const { unmount, environment } = mount(props);
                // Node chrome renders once the portal store's microtask runs.
                await act(() => environment.flushMicrotasks());
                let overlay: HTMLElement | undefined;
                if (kind === 'tooltip') {
                    act(() => {
                        fireEvent.focus(screen.getAllByRole('button', { name: 'Bold' })[0] as HTMLElement);
                    });
                    overlay = screen.getAllByRole('tooltip')[0];
                }
                if (kind === 'More menu') {
                    act(() => {
                        fireEvent.keyDown(document.querySelector('[data-rte-toolbar-more]') as HTMLElement, {
                            key: 'Enter',
                        });
                    });
                    overlay = screen.getByRole('menu');
                }
                if (kind === 'menu') {
                    overlay = screen.getByTestId('fixture-menu');
                }
                if (kind === 'alternative text dialog') {
                    act(() => {
                        fireEvent.click(screen.getByRole('button', { name: 'Alternative text' }));
                    });
                    overlay = screen.getByRole('dialog', { name: 'Alternative text' });
                }
                let root: Element | null = null;
                if (overlay !== undefined) {
                    root = overlay.closest('[data-rte-overlays]');
                }
                let own = false;
                if (portalContainer === undefined) {
                    own =
                        root?.closest('[data-test-id="fondue-rich-text-editor"]') ===
                        screen.getByTestId('fondue-rich-text-editor');
                } else {
                    own = root?.parentElement === portalContainer;
                }
                results.push({
                    inside: own,
                    owner: overlay?.ownerDocument === document,
                    host: root !== null,
                });
                unmount();
            }
            host.remove();

            expect(results).toEqual([
                { inside: true, owner: true, host: true },
                { inside: true, owner: true, host: true },
            ]);
        },
    );

    it('SPEC-rich-text-react/AC-047 keeps every overlay open while focus moves between the surface, toolbars and overlays', () => {
        const closed = vi.fn<(overlay: string) => void>();
        const { handle } = mount({
            children: (
                <>
                    <Opened Overlay={FixtureLinkPopover} onClose={() => closed('link')} />
                    <Opened Overlay={FixtureSuggestions} onClose={() => closed('suggestions')} />
                </>
            ),
        });
        selectWithFocus(handle(), 'two');
        expect(bubble()).not.toBeNull();

        for (const target of [
            () => screen.getByRole('textbox', { name: 'URL' }),
            () => surface(),
            () => screen.getAllByRole('button', { name: 'Bold' })[0],
            () => screen.getByRole('toolbar', { name: 'Selection formatting' }).querySelector('button'),
            () => screen.getByRole('button', { name: 'Apply' }),
            () => surface(),
        ]) {
            act(() => target()?.focus());
        }

        expect(closed).not.toHaveBeenCalled();
        expect(bubble()).not.toBeNull();
        expect(popover()).not.toBeNull();
        expect(screen.getByTestId('fixture-suggestions')).toBeInTheDocument();
    });

    it('SPEC-rich-text-react/AC-048 counts a host modal root registered through useEditorHandle as inside the editor', () => {
        const hostModal = document.createElement('div');
        hostModal.innerHTML = '<button type="button">Pick asset</button>';
        document.body.append(hostModal);
        const unregisterRef: { current: (() => void) | undefined } = { current: undefined };
        const Register = () => {
            const handle = useEditorHandle();
            useEffect(() => {
                if (handle !== null) {
                    unregisterRef.current = handle.registerInteractionRoot(hostModal);
                }
            }, [handle]);
            return null;
        };
        const closed = vi.fn();
        mount({
            children: (
                <>
                    <Register />
                    <Opened Overlay={FixtureLinkPopover} onClose={closed} />
                </>
            ),
        });
        const pick = () => hostModal.querySelector('button');

        act(() => pick()?.focus());
        const whileRegistered = closed.mock.calls.length;
        act(() => screen.getByRole('textbox', { name: 'URL' }).focus());
        unregisterRef.current?.();
        act(() => pick()?.focus());

        expect(whileRegistered).toBe(0);
        expect(closed).toHaveBeenCalledTimes(1);
        hostModal.remove();
    });

    it('SPEC-rich-text-react/AC-049 leaves a second editor unchanged when the first opens an overlay, with every ID unique', () => {
        const environment = createTestEnvironment({ seed: 1 });
        const Editor = ({ label, children }: { readonly label: string; readonly children?: ReactNode }) => (
            <RichTextEditor.Root
                aria-label={label}
                definition={definition}
                presentation={presentation}
                defaultValue={loaded(para('one two three'))}
                locale={fixtureLocale}
                environment={environment}
            >
                <RichTextEditor.Toolbar />
                <RichTextEditor.Surface />
                {children}
            </RichTextEditor.Root>
        );
        const Page = ({ open }: { readonly open: boolean }) => (
            <>
                <Editor label="A">{open && <Opened Overlay={FixtureLinkPopover} />}</Editor>
                <Editor label="B" />
            </>
        );
        const { rerender } = render(<Page open={false} />);
        act(() => environment.flushFrames());
        const editorB = () =>
            screen.getByRole('textbox', { name: 'B' }).closest('[data-test-id="fondue-rich-text-editor"]');
        const before = editorB()?.innerHTML;

        rerender(<Page open />);

        expect(popover()).not.toBeNull();
        expect(editorB()?.contains(popover())).toBe(false);
        expect(editorB()?.innerHTML).toBe(before);
        const ids = [...document.querySelectorAll('[id]')].map(({ id }) => id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('SPEC-rich-text-react/AC-049 keeps two editors that share a host portalContainer in their own interaction scopes', () => {
        const host = document.createElement('div');
        document.body.append(host);
        const environment = createTestEnvironment({ seed: 1 });
        const closedA = vi.fn();
        const Later = () => {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setOpen(true)}>
                        Open B
                    </button>
                    <FixtureLinkPopover open={open} onOpenChange={setOpen} />
                </>
            );
        };
        const Editor = ({ label, children }: { readonly label: string; readonly children: ReactNode }) => (
            <RichTextEditor.Root
                aria-label={label}
                definition={definition}
                presentation={presentation}
                defaultValue={loaded(para('one two three'))}
                locale={fixtureLocale}
                environment={environment}
                portalContainer={host}
            >
                <RichTextEditor.Surface />
                {children}
            </RichTextEditor.Root>
        );
        render(
            <>
                <Editor label="A">
                    <Opened Overlay={FixtureLinkPopover} onClose={closedA} />
                </Editor>
                <Editor label="B">
                    <Later />
                </Editor>
            </>,
        );
        act(() => environment.flushFrames());
        act(() => screen.getByRole('textbox', { name: 'URL' }).focus());

        // A click with no press, so only the focus move into B's popover can close A's.
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Open B' }));
        });

        expect(closedA).toHaveBeenCalledTimes(1);
        expect(host.querySelectorAll(':scope > [data-rte-overlays]')).toHaveLength(2);
        host.remove();
    });

    it('SPEC-rich-text-react/AC-090 calls onFocus and onBlur for moves into the link popover and back, and out to a host button', () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        const events: string[] = [];
        onFocus.mockImplementation(() => events.push('focus'));
        onBlur.mockImplementation(() => events.push('blur'));
        const Link = () => {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setOpen(true)}>
                        Open link
                    </button>
                    <FixtureLinkPopover open={open} onOpenChange={setOpen} />
                </>
            );
        };
        mount({ onFocus, onBlur, children: <Link /> });

        act(() => surface().focus());
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Open link' }));
        });
        act(() => screen.getByRole('textbox', { name: 'URL' }).focus());
        act(() => surface().focus());
        act(() => screen.getByRole('button', { name: 'Host' }).focus());

        expect(events).toEqual(['focus', 'blur', 'focus', 'blur']);
    });

    it('SPEC-rich-text-react/AC-023 keeps the surface mounted and editable while the link popover suspends', async () => {
        let release: () => void = () => undefined;
        const LazyForm = lazy(
            () =>
                new Promise<{ default: typeof LinkForm }>((resolve) => {
                    release = () => resolve({ default: LinkForm });
                }),
        );
        const Lazy = (props: FixtureOverlayProps) => <FixtureLinkPopover {...props} Body={LazyForm} />;
        const { handle } = mount({ children: <Opened Overlay={Lazy} /> });
        const viewBefore = runtimeOf(handle())?.view;
        selectWithFocus(handle(), 'three');

        act(() => typeText(handle(), 'x'));
        const suspended = {
            view: runtimeOf(handle())?.view,
            editable: surface().getAttribute('contenteditable'),
            field: screen.queryByRole('textbox', { name: 'URL' }),
            focusInEditor: surface()
                .closest('[data-test-id="fondue-rich-text-editor"]')
                ?.contains(document.activeElement),
        };
        await act(async () => {
            release();
            await Promise.resolve();
        });

        expect(suspended).toEqual({ view: viewBefore, editable: 'true', field: null, focusInEditor: true });
        expect(surface().textContent).toBe('one two x');
        expect(screen.getByRole('textbox', { name: 'URL' })).toBeInTheDocument();
        expect(runtimeOf(handle())?.view).toBe(viewBefore);
    });

    it('SPEC-rich-text-react/AC-095 switches to the bubble toolbar and back from More, reporting each mode', () => {
        const onToolbarModeChange = vi.fn();
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                defaultValue={loaded(para('one two three'))}
                locale={fixtureLocale}
                environment={environment}
                onToolbarModeChange={onToolbarModeChange}
                ref={ref}
            />,
        );
        act(() => environment.flushFrames());
        const openMore = (toolbar: HTMLElement) =>
            act(() => {
                fireEvent.keyDown(toolbar.querySelector('[data-rte-toolbar-more]') as HTMLElement, { key: 'Enter' });
            });

        openMore(screen.getByRole('toolbar', { name: 'Text formatting' }));
        act(() => {
            fireEvent.click(screen.getByRole('menuitem', { name: 'Show toolbar on selection only' }));
        });
        const fixedAfterSwitch = screen.queryByRole('toolbar', { name: 'Text formatting' });
        selectWithFocus(ref.current as EditorHandle<object>, 'two');
        const shownBubble = bubble();
        openMore(shownBubble as HTMLElement);
        act(() => {
            fireEvent.click(screen.getByRole('menuitem', { name: 'Always show toolbar' }));
        });

        expect(fixedAfterSwitch).toBeNull();
        expect(shownBubble).not.toBeNull();
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeInTheDocument();
        expect(bubble()).toBeNull();
        expect(onToolbarModeChange.mock.calls).toEqual([['bubble'], ['fixed']]);
    });

    it('SPEC-rich-text-persistence/AC-031 closes the editor overlays at replacement step 8', async () => {
        const closed = vi.fn();
        const { handle } = mount({ children: <Opened Overlay={FixtureLinkPopover} onClose={closed} /> });
        expect(popover()).not.toBeNull();

        await act(async () => {
            await handle().replaceDocument({
                expected: handle().getSnapshot().stamp,
                next: { ...loaded(para('next')), documentId: 'document-2' },
                unsaved: { action: 'reject' },
                selection: 'start',
                history: 'reset',
            });
        });

        expect(closed).toHaveBeenCalledTimes(1);
        expect(popover()).toBeNull();
    });
});

describe('overlay accessibility', () => {
    it('SPEC-rich-text-accessibility/AC-075 isolates each mention label in one bdi inside the English list', () => {
        mount({ children: <Opened Overlay={FixtureSuggestions} /> });

        const options = within(screen.getByRole('listbox', { name: 'Mentions' })).getAllByRole('option');
        expect(options.map((option) => [...option.querySelectorAll('bdi')].map((bdi) => bdi.textContent))).toEqual([
            ['Ada'],
            ['Grace'],
            ['Linus'],
            ['נועה'],
        ]);
    });

    it('SPEC-rich-text-react/AC-101 SPEC-rich-text-output/AC-034 renders the editor markup on the server under a German theme', () => {
        const html = renderToString(
            <ThemeProvider locale={fondueDeDE}>
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    presentation={presentation}
                    defaultValue={loaded(para('one'))}
                />
            </ThemeProvider>,
        );

        expect(html).toContain('data-rte-surface=""');
        expect(html).toContain('aria-label="Text formatting"');
    });

    it('SPEC-rich-text-react/AC-101 SPEC-rich-text-react/AC-003 renders at once in English, then takes the German strings of the ThemeProvider locale on the same view', async () => {
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        render(
            <ThemeProvider locale={fondueDeDE}>
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    presentation={presentation}
                    defaultValue={loaded(para('one'), image)}
                    environment={environment}
                    ref={ref}
                />
            </ThemeProvider>,
        );
        act(() => environment.flushFrames());
        const handle = ref.current;
        if (handle === null) {
            throw new Error('no handle');
        }
        const view = runtimeOf(handle)?.view;

        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeInTheDocument();
        expect(view).toBeDefined();
        const toolbar = await screen.findByRole('toolbar', { name: 'Textformatierung' });
        await act(() => environment.flushMicrotasks());
        expect(within(toolbar).getByRole('button', { name: 'Fett' })).toBeInTheDocument();
        expect(within(toolbar).getByRole('button', { name: 'Mehr' })).toBeInTheDocument();
        expect(ref.current).toBe(handle);
        expect(runtimeOf(handle)?.view).toBe(view);
        // The stand-in's own labels are in no package locale, so the chrome button shows its key.
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'RichTextEditor_fixtureAltText' }));
        });
        expect(within(screen.getByRole('dialog')).getByRole('button', { name: 'Schließen' })).toBeInTheDocument();
    });

    it('SPEC-rich-text-accessibility/AC-017 leaves every overlay open for 10 minutes', () => {
        // Frames stay real, since Floating UI repositions an open overlay in each one.
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] });
        const closed = vi.fn();
        const { handle, environment } = mount({
            children: (
                <>
                    <Opened Overlay={FixtureLinkPopover} onClose={closed} />
                    <Opened Overlay={FixtureSuggestions} onClose={closed} />
                    <Opened Overlay={FixtureMenu} onClose={closed} />
                </>
            ),
        });
        selectWithFocus(handle(), 'two');

        // The editor's own timers run on the environment clock, which the fake timers do not move.
        act(() => {
            vi.advanceTimersByTime(10 * 60 * 1000);
            environment.advance(600_000);
            environment.flushFrames();
        });

        expect(closed).not.toHaveBeenCalled();
        expect(bubble()).not.toBeNull();
        expect(popover()).not.toBeNull();
        expect(screen.getByTestId('fixture-suggestions')).toBeInTheDocument();
        expect(screen.getByTestId('fixture-menu')).toBeInTheDocument();
    });

    it('SPEC-rich-text-accessibility/AC-021 names every overlay, the Flyout dialogs included, and labels every field', async () => {
        const { handle, environment } = mount({
            defaultValue: loaded(para('one two three'), image),
            children: (
                <>
                    <Opened Overlay={FixtureLinkPopover} />
                    <Opened Overlay={FixtureSuggestions} />
                    <Opened Overlay={FixtureMenu} />
                </>
            ),
        });
        // Node chrome renders once the portal store's microtask runs.
        await act(() => environment.flushMicrotasks());
        selectWithFocus(handle(), 'two');
        /** The visible text of the `label` element of the field named `name`. */
        const labelOf = (name: string) =>
            document.querySelector(`label[for="${screen.getByRole('textbox', { name }).id}"]`)?.textContent;
        // Radix names the menu by its hidden trigger too, which accessible name 1.2 skips for being empty.
        const names = [bubble(), screen.getByTestId('fixture-menu')].map((overlay) =>
            overlay?.getAttribute('aria-label'),
        );
        // Radix Popover gives each Flyout's content `role="dialog"`, which needs its own name.
        const flyouts = [
            bubble()?.closest('[role="dialog"]'),
            popover(),
            screen.getByTestId('fixture-suggestions'),
        ].map((flyout) => flyout?.getAttribute('aria-label'));
        const url = labelOf('URL');
        // The modal dialog hides the rest of the page from the accessibility tree.
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Alternative text' }));
        });

        expect(names).toEqual(['Selection formatting', 'Block actions']);
        expect(flyouts).toEqual(['Selection formatting', 'Link', 'Mentions']);
        expect(screen.getByRole('dialog', { name: 'Alternative text' })).toBeInTheDocument();
        expect([url, labelOf('Description')]).toEqual(['URL', 'Description']);
    });

    it('SPEC-rich-text-accessibility/AC-077 names the alternative text dialog by its heading, with a description that holds no control', async () => {
        const { environment } = mount({ defaultValue: loaded(para('one'), image) });
        await act(() => environment.flushMicrotasks());

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Alternative text' }));
        });

        const dialog = screen.getByRole('dialog');
        const heading = screen.getByRole('heading', { name: 'Alternative text' });
        expect(dialog).toHaveAccessibleName('Alternative text');
        expect(dialog.getAttribute('aria-labelledby')).toBe(heading.id);
        const description = document.getElementById(dialog.getAttribute('aria-describedby') ?? '');
        expect(description).toHaveTextContent('Describe the image for people who cannot see it.');
        expect(description?.querySelector('button, input, select, textarea, [href], [tabindex]')).toBeNull();
    });

    it('SPEC-rich-text-accessibility/AC-027 keeps focus on a toolbar press only while the toolbar is docked above the on-screen keyboard', () => {
        const viewport = Object.assign(new EventTarget(), { height: 800, offsetTop: 0 });
        Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
        vi.spyOn(window, 'matchMedia').mockImplementation(
            (query: string) => ({ matches: query === '(pointer: coarse)' }) as MediaQueryList,
        );
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800);
        mount({});
        act(() => surface().focus());
        const press = () => fireEvent.mouseDown(screen.getByRole('button', { name: 'Bold' }));
        const undocked = press();

        act(() => {
            viewport.height = 400;
            viewport.dispatchEvent(new Event('resize'));
        });
        const docked = press();

        // `fireEvent` returns false once a handler prevented the default.
        expect([undocked, docked]).toEqual([true, false]);
        // The docked toolbar's top edge sits its height above the keyboard, which happy-dom lays out as 0.
        expect(screen.getByRole('toolbar', { name: 'Text formatting' }).style.insetBlockStart).toBe('400px');
        Reflect.deleteProperty(window, 'visualViewport');
    });

    it('SPEC-rich-text-react/AC-096 leaves the toolbar undocked and lets a press take focus when the pointer is not coarse, though the viewport shrinks', () => {
        const viewport = Object.assign(new EventTarget(), { height: 800, offsetTop: 0 });
        Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
        vi.spyOn(window, 'matchMedia').mockImplementation(() => ({ matches: false }) as MediaQueryList);
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800);
        mount({});
        act(() => surface().focus());

        act(() => {
            viewport.height = 400;
            viewport.dispatchEvent(new Event('resize'));
        });
        const pressed = fireEvent.mouseDown(screen.getByRole('button', { name: 'Bold' }));

        // `fireEvent` returns true while no handler prevented the default.
        expect(pressed).toBe(true);
        expect(screen.getByRole('toolbar', { name: 'Text formatting' }).style.insetBlockStart).toBe('');
        Reflect.deleteProperty(window, 'visualViewport');
    });
});

describe('overlay focus and loading', () => {
    it('SPEC-rich-text-react/AC-023 keeps the surface mounted and editable while a dialog that node chrome loads lazily suspends, then shows it', async () => {
        let release: () => void = () => undefined;
        const LazyPart = lazy(
            () =>
                new Promise<{ default: () => ReactNode }>((resolve) => {
                    release = () => resolve({ default: () => <p>Loaded</p> });
                }),
        );
        const Chrome = () => {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setOpen(true)}>
                        Open lazy
                    </button>
                    {open && <LazyPart />}
                </>
            );
        };
        const lazyModel = compileContentModel(
            [core(), defineNodeView(fixtureMediaImage(), { node: 'media_image', component: Chrome })],
            { id: 'test.overlays', version: 1 },
        );
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={defineEditor({ id: 'test.overlays', model: lazyModel })}
                defaultValue={loaded(para('one'), image)}
                locale={fixtureLocale}
                environment={environment}
                ref={ref}
            >
                <RichTextEditor.Surface />
            </RichTextEditor.Root>,
        );
        act(() => environment.flushFrames());
        await act(() => environment.flushMicrotasks());
        const viewBefore = runtimeOf(ref.current as object)?.view;

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Open lazy' }));
        });

        expect(runtimeOf(ref.current as object)?.view).toBe(viewBefore);
        expect(surface().getAttribute('contenteditable')).toBe('true');
        expect(surface()).toBeVisible();
        await act(async () => {
            release();
            await Promise.resolve();
        });
        expect(screen.getByText('Loaded')).toBeInTheDocument();
    });

    it('SPEC-rich-text-accessibility/AC-014 keeps the bubble toolbar closed after Escape while a command only maps the selection', () => {
        const { handle } = mount({});
        selectWithFocus(handle(), 'two');
        expect(bubble()).not.toBeNull();
        act(() => {
            fireEvent.keyDown(surface(), { key: 'Escape' });
        });
        expect(bubble()).toBeNull();

        act(() => {
            (handle() as unknown as EditorHandle).execute('mark.bold.toggle');
        });

        expect(bubble()).toBeNull();
    });
});
