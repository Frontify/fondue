/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { AnnouncerContext } from '../../src/bridge/announcer';
import { bold, core } from '../../src/features';
import { fixtureCodeBlockView } from '../../src/features/__fixtures__/code-block/view';
import { fixtureItalic, fixtureLink, fixtureList, fixtureToolbar } from '../../src/features/__fixtures__/features';
import {
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
} from '../../src/index';
import { enUS } from '../../src/locales/en-US';
import { compileContentModel, type ContentNodeJSON } from '../../src/model';
import { runtimeOf } from '../../src/runtime/runtime';
import { setSelection } from '../../src/testing';

const model = compileContentModel(
    [core(), bold(), fixtureItalic(), fixtureLink(), fixtureList(), fixtureToolbar(), fixtureCodeBlockView()],
    { id: 'test.toolbar', version: 1 },
);
const ALLOW = { create: true, edit: true, remove: true, paste: true };
export const toolbarDefinitions = {
    open: defineEditor({ id: 'test.toolbar', model }),
    // Bold may not be added, which the toolbar shows as an unavailable item (SPEC-rich-text-react/AC-038).
    boldBlocked: defineEditor({
        id: 'test.toolbar',
        model,
        policy: { features: { 'marks.bold': { ...ALLOW, create: false } } },
    }),
};

/** Labels for the stand-in commands, which no package locale names. */
export const fixtureLocale = {
    lang: 'en-US',
    translationStrings: {
        ...enUS.translationStrings,
        RichTextEditor_fixtureItalic: 'Italic',
        RichTextEditor_fixtureLink: 'Link',
        RichTextEditor_fixtureList: 'List',
        RichTextEditor_fixtureStrong: 'Strong',
        RichTextEditor_fixtureHeading1: 'Heading 1',
        RichTextEditor_fixtureHeading2: 'Heading 2',
        RichTextEditor_fixtureHeading3: 'Heading 3',
        RichTextEditor_fixtureHeading4: 'Heading 4',
        RichTextEditor_fixtureHeading5: 'Heading 5',
        RichTextEditor_fixtureHeading6: 'Heading 6',
        RichTextEditor_fixtureUndo: 'Undo',
        RichTextEditor_fixtureRedo: 'Redo',
        RichTextEditor_fixtureImage: 'Image',
        RichTextEditor_fixtureAltText: 'Alternative text',
        RichTextEditor_fixtureAltTextHint: 'Describe the image for people who cannot see it.',
        RichTextEditor_fixtureDescription: 'Description',
        RichTextEditor_fixtureSave: 'Save',
        RichTextEditor_fixtureTable: 'Table',
    },
};

/** Bold, italic and link, then the list stand-in, as two presentation groups. */
export const TOOLBAR: ReactPresentation['toolbar'] = [
    ['mark.bold.toggle', 'fixture.italic.toggle', 'fixture.link.edit'],
    ['fixture.list.toggle'],
];
/** The same with a group of six heading levels, too wide for 320 CSS pixels. */
export const WIDE_TOOLBAR: ReactPresentation['toolbar'] = [
    ...TOOLBAR,
    [1, 2, 3, 4, 5, 6].map((level) => ({ command: 'fixture.heading.set', payload: { level } })),
];

const paragraph = (text: string) =>
    ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }) as unknown as ContentNodeJSON;

declare global {
    interface Window {
        /** The mounted toolbar editor's handle, for tests that drive it from the page. */
        toolbarEditor?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            /** The HTML of the runtime's document, as the surface shows it. */
            readonly html: () => string;
            /** The runtime's view, which a theme or media change must keep (SPEC-rich-text-react/AC-053). */
            readonly view: () => object | undefined;
        };
    }
}

/** A button that announces a message through the editor's live region, which the tests press. */
const Announce = ({ message, coalesce }: { readonly message: string; readonly coalesce: string | undefined }) => {
    const announcer = useContext(AnnouncerContext);
    return (
        <button type="button" data-announce="" onClick={() => announcer?.announce(message, coalesce)}>
            Announce
        </button>
    );
};

/** Mounts the toolbar editor between two host buttons, in a form, with the stand-in commands in the toolbar. */
export const ToolbarProbe = ({
    texts = ['one two three'],
    blocks,
    disabled = false,
    readOnly = false,
    boldBlocked = false,
    dir = 'ltr',
    theme = 'light',
    toolbarShortcut,
    width,
    scrollHeight,
    compose = false,
    wide = false,
    controls,
    announce,
}: {
    readonly texts?: readonly string[];
    readonly blocks?: readonly ContentNodeJSON[];
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly boldBlocked?: boolean;
    readonly dir?: 'ltr' | 'rtl';
    readonly theme?: 'light' | 'dark';
    readonly toolbarShortcut?: string;
    /** The editor's width in CSS pixels. */
    readonly width?: number;
    /** Puts the editor in a scrolling container of this height. */
    readonly scrollHeight?: number;
    /** Composes `RichTextEditor.Root` with the toolbar and the surface in place of `RichTextEditor`. */
    readonly compose?: boolean;
    /** Adds the six heading levels to the toolbar. */
    readonly wide?: boolean;
    readonly controls?: ReactPresentation['controls'];
    /** Adds a button that announces this message, which the live region of the composed editor reads. */
    readonly announce?: string;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const presentation = useMemo(() => {
        let toolbar = TOOLBAR;
        if (wide) {
            toolbar = WIDE_TOOLBAR;
        }
        return defineReactPresentation({
            toolbar,
            ...(toolbarShortcut === undefined ? {} : { toolbarShortcut }),
            ...(controls === undefined ? {} : { controls }),
        });
    }, [toolbarShortcut, wide, controls]);
    const [defaultValue] = useState(() => {
        const content = blocks ?? texts.map(paragraph);
        return {
            documentId: 'document-1',
            revision: null,
            document: {
                format: 'frontify.rich-text' as const,
                formatVersion: 1 as const,
                model: model.ref,
                requiredCapabilities: [
                    { id: 'core', version: 1 },
                    { id: 'fixture.code-block', version: 1 },
                ],
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
            },
        };
    });
    useEffect(() => {
        const handle = ref.current as EditorHandle | null;
        if (handle === null) {
            return;
        }
        window.toolbarEditor = {
            handle,
            setSelection,
            view: () => runtimeOf(handle)?.view,
            html: () => {
                const view = runtimeOf(handle)?.view;
                if (view === undefined) {
                    return '';
                }
                // The kept selection is a decoration, not content.
                const copy = view.dom.cloneNode(true) as HTMLElement;
                for (const decoration of copy.querySelectorAll('[data-rte-selection]')) {
                    decoration.replaceWith(...decoration.childNodes);
                }
                copy.normalize();
                return copy.innerHTML;
            },
        };
    }, []);
    let definition = toolbarDefinitions.open;
    if (boldBlocked) {
        definition = toolbarDefinitions.boldBlocked;
    }
    const props = {
        'aria-label': 'Notes',
        definition,
        presentation,
        defaultValue,
        disabled,
        readOnly,
        locale: fixtureLocale,
        ref,
    } as const;
    let editor = <RichTextEditor {...props} />;
    if (compose || announce !== undefined) {
        editor = (
            <RichTextEditor.Root {...props}>
                <RichTextEditor.Toolbar />
                <RichTextEditor.Surface />
                {announce !== undefined && <Announce message={announce} coalesce={undefined} />}
            </RichTextEditor.Root>
        );
    }
    let body = editor;
    if (scrollHeight !== undefined) {
        body = (
            <div data-scroller="" style={{ blockSize: scrollHeight, overflowY: 'auto' }}>
                {editor}
            </div>
        );
    }
    return (
        <ThemeProvider theme={theme} dir={dir}>
            <form
                style={{ inlineSize: width, backgroundColor: 'var(--color-surface-default)' }}
                onSubmit={(event) => event.preventDefault()}
            >
                {/* An explicit tabindex, since WebKit leaves buttons out of the Tab order by default. */}
                <button type="button" tabIndex={0}>
                    Before
                </button>
                {body}
                <button type="button" tabIndex={0}>
                    After
                </button>
            </form>
        </ThemeProvider>
    );
};
