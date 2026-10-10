/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog, ThemeProvider } from '@frontify/fondue-components';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { bold, core } from '../../src/features';
import { fixtureCodeBlockView } from '../../src/features/__fixtures__/code-block/view';
import { fixtureItalic, fixtureLink, fixtureToolbar } from '../../src/features/__fixtures__/features';
import { fixtureMediaImageView } from '../../src/features/__fixtures__/media/view';
import { FixtureLinkPopover, FixtureMenu, FixtureSuggestions } from '../../src/features/__fixtures__/overlays/overlays';
import { fixtureTableBlockView } from '../../src/features/__fixtures__/table/view';
import {
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
    type ToolbarMode,
} from '../../src/index';
import { compileContentModel, type ContentNodeJSON } from '../../src/model';
import { runtimeOf } from '../../src/runtime/runtime';
import { setSelection } from '../../src/testing';

import { fixtureLocale, TOOLBAR } from './ToolbarProbe';

const model = compileContentModel(
    [
        core(),
        bold(),
        fixtureItalic(),
        fixtureLink(),
        fixtureToolbar(),
        fixtureCodeBlockView(),
        fixtureMediaImageView(),
        fixtureTableBlockView(),
    ],
    { id: 'test.overlays', version: 1 },
);
const definition = defineEditor({ id: 'test.overlays', model });
/** Undo and redo, then the toolbar stand-ins, as the touch toolbars start (SPEC-rich-text-react, Default toolbars). */
export const TOUCH_TOOLBAR: ReactPresentation['toolbar'] = [
    ['fixture.history.undo', 'fixture.history.redo'],
    ...TOOLBAR,
];

export type OverlayKind = 'link' | 'suggestions' | 'menu';

declare global {
    interface Window {
        /** The mounted overlay editor, for tests that drive it from the page. */
        overlayProbe?: {
            readonly handle: EditorHandle;
            readonly select: (target: Parameters<typeof setSelection>[1]) => void;
            readonly open: (kind: OverlayKind) => void;
            /** Removes the node with `nodeId`, as another author's change would. */
            readonly remove: (nodeId: string) => void;
            /** Inserts `text` at document position `at`, away from the selection. */
            readonly insert: (text: string, at: number) => void;
            /** The HTML of the runtime's document, without the kept selection. */
            readonly html: () => string;
            /** The modes `onToolbarModeChange` reported. */
            readonly modes: ToolbarMode[];
        };
    }
}

const paragraph = (text: string) =>
    ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }) as unknown as ContentNodeJSON;

/** Renders `children` in an open shadow root or an iframe's body, as a host page that embeds the editor does. */
const Embedded = ({ into, children }: { readonly into: 'shadow' | 'iframe'; readonly children: ReactNode }) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [target, setTarget] = useState<HTMLElement | ShadowRoot | null>(null);
    useEffect(() => {
        if (into === 'shadow' && hostRef.current !== null) {
            setTarget(hostRef.current.attachShadow({ mode: 'open' }));
        }
        const frame = frameRef.current;
        if (into === 'iframe' && frame !== null && frame.contentDocument !== null) {
            setTarget(frame.contentDocument.body);
        }
    }, [into]);
    let host = <div ref={hostRef} data-embed="shadow" />;
    if (into === 'iframe') {
        host = <iframe ref={frameRef} title="Embedded editor" style={{ inlineSize: 600, blockSize: 400 }} />;
    }
    return (
        <>
            {host}
            {target !== null && createPortal(children, target)}
        </>
    );
};

/**
 * Mounts `RichTextEditor.Root` with the fixed and bubble toolbars, the surface and the fixture overlay set between two
 * host buttons, optionally inside a host Fondue `Dialog`, a shadow root, an iframe or a scrolling container.
 */
export const OverlayProbe = ({
    blocks,
    texts = ['one two three'],
    toolbar = TOOLBAR,
    defaultToolbarMode,
    toolbarShortcut,
    bubble = true,
    within,
    scrollHeight,
    spacer = 0,
    width,
    hostContainer = false,
}: {
    readonly blocks?: readonly ContentNodeJSON[];
    readonly texts?: readonly string[];
    readonly toolbar?: ReactPresentation['toolbar'];
    readonly defaultToolbarMode?: ToolbarMode;
    readonly toolbarShortcut?: string;
    /** Composes `RichTextEditor.BubbleToolbar`. */
    readonly bubble?: boolean;
    readonly within?: 'dialog' | 'shadow' | 'iframe';
    /** Puts the editor in a scrolling container of this height. */
    readonly scrollHeight?: number;
    /** The height of host content above the editor, which moves it towards the viewport's bottom edge. */
    readonly spacer?: number;
    readonly width?: number;
    /** Passes a host element as `portalContainer`. */
    readonly hostContainer?: boolean;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const [open, setOpen] = useState<OverlayKind | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [modes] = useState<ToolbarMode[]>([]);
    const presentation = useMemo(
        () => defineReactPresentation({ toolbar, ...(toolbarShortcut === undefined ? {} : { toolbarShortcut }) }),
        [toolbar, toolbarShortcut],
    );
    const [defaultValue] = useState(() => ({
        documentId: 'document-1',
        revision: null,
        document: {
            format: 'frontify.rich-text' as const,
            formatVersion: 1 as const,
            model: model.ref,
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id: 'fixture.code-block', version: 1 },
                { id: 'fixture.media-image', version: 1 },
                { id: 'fixture.table-block', version: 1 },
            ],
            content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks ?? texts.map(paragraph) },
        },
    }));
    useEffect(() => {
        const timer = setInterval(() => {
            const handle = ref.current as EditorHandle | null;
            if (handle === null) {
                return;
            }
            clearInterval(timer);
            window.overlayProbe = {
                handle,
                select: (target) => setSelection(handle, target),
                open: (kind) => setOpen(kind),
                remove: (nodeId) => runtimeOf(handle)?.nodeActions(nodeId).remove(),
                insert: (text, at) => {
                    const view = runtimeOf(handle)?.view;
                    view?.dispatch(view.state.tr.insertText(text, at));
                },
                html: () => {
                    const view = runtimeOf(handle)?.view;
                    if (view === undefined) {
                        return '';
                    }
                    const copy = view.dom.cloneNode(true) as HTMLElement;
                    for (const decoration of copy.querySelectorAll('[data-rte-selection]')) {
                        decoration.replaceWith(...decoration.childNodes);
                    }
                    copy.normalize();
                    return copy.innerHTML;
                },
                modes,
            };
        }, 10);
        return () => clearInterval(timer);
    }, [modes]);
    const overlay = (kind: OverlayKind) => ({
        open: open === kind,
        onOpenChange: (next: boolean) => setOpen(next ? kind : null),
    });
    let editor = (
        <RichTextEditor.Root
            aria-label="Notes"
            definition={definition}
            presentation={presentation}
            defaultValue={defaultValue}
            locale={fixtureLocale}
            {...(defaultToolbarMode === undefined ? {} : { defaultToolbarMode })}
            {...(hostContainer ? { portalContainer: container } : {})}
            onToolbarModeChange={(mode) => modes.push(mode)}
            ref={ref}
        >
            <RichTextEditor.Toolbar />
            {bubble && <RichTextEditor.BubbleToolbar />}
            <RichTextEditor.Surface />
            <FixtureLinkPopover {...overlay('link')} />
            <FixtureSuggestions {...overlay('suggestions')} />
            <FixtureMenu {...overlay('menu')} />
        </RichTextEditor.Root>
    );
    // The context menu opens by key, as the table's does (SPEC-rich-text-react, Overlay focus).
    editor = (
        <div
            onKeyDown={(event) => {
                if (event.key === 'F10' && event.shiftKey) {
                    event.preventDefault();
                    setOpen('menu');
                }
            }}
        >
            {editor}
        </div>
    );
    if (scrollHeight !== undefined) {
        editor = (
            <div data-scroller="" style={{ blockSize: scrollHeight, overflowY: 'auto' }}>
                {editor}
            </div>
        );
    }
    let body = (
        <>
            {/* An explicit tabindex, since WebKit leaves buttons out of the Tab order by default. */}
            <button type="button" tabIndex={0}>
                Before
            </button>
            {editor}
            <button type="button" tabIndex={0}>
                After
            </button>
        </>
    );
    if (within === 'dialog') {
        body = (
            <Dialog.Root modal open>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Host dialog</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>{body}</Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>
        );
    }
    if (within === 'shadow' || within === 'iframe') {
        body = <Embedded into={within}>{body}</Embedded>;
    }
    return (
        <ThemeProvider theme="light">
            <div style={{ blockSize: spacer }} />
            <div style={{ inlineSize: width }}>{body}</div>
            <div ref={setContainer} data-host-container="" />
        </ThemeProvider>
    );
};
