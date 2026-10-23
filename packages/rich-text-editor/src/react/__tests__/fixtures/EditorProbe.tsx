/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { bold, core } from '#/features';
import { fixtureChrome } from '#/features/__tests__/fixtures/chrome/feature';
import { fixtureHeadingSet, fixtureInputRules, fixtureItalic } from '#/features/__tests__/fixtures/features';
import { fixturePartsOf } from '#/features/__tests__/fixtures/parts';
import { links } from '#/features/links/feature';
import {
    type CompiledEditorDefinition,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type PersistenceService,
    RichTextEditor,
    type RichTextFormField,
    type SaveRequest,
    useRichTextFormField,
} from '#/index';
import { compileContentModel, type ContentModel, type ContentNodeJSON } from '#/model';
import { RichTextReader } from '#/reader';
import { undoDepth } from '#/runtime/history';
import { type EditorRuntime, runtimeOf } from '#/runtime/runtime';
import { createFakePersistenceService, setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), links(), fixtureHeadingSet(), fixtureChrome()], {
    id: 'test.ct',
    version: 1,
});
// Adds a `pre` code block and the heading input rule to the component-test model.
const inputRulesModel = compileContentModel(
    [core(), bold(), fixtureItalic(), links(), fixtureHeadingSet(), fixtureInputRules(), fixtureChrome()],
    { id: 'test.ct', version: 1 },
);
const ALLOW = { create: true, edit: true, remove: true, paste: true };
/** The component-test model's definitions: every feature allowed, and paragraphs that may not change. */
const definitions = {
    open: defineEditor({ id: 'test.ct', model, plugins: fixturePartsOf(model) }),
    guarded: defineEditor({
        id: 'test.ct',
        model,
        policy: { features: { core: { ...ALLOW, edit: false } } },
        plugins: fixturePartsOf(model),
    }),
    // The heading input rule turns `## ` into a heading, which needs the typed space kept.
    inputRules: defineEditor({ id: 'test.ct', model: inputRulesModel, plugins: fixturePartsOf(inputRulesModel) }),
};

/** A text, or a link around the text inside `[` and `]`, as `Read the [guide]`. */
const textOf = (text: string) =>
    text.split(/(\[[^\]]*\])/).flatMap((part) => {
        if (part === '') {
            return [];
        }
        if (!part.startsWith('[')) {
            return [{ type: 'text', text: part }];
        }
        const link = {
            type: 'link',
            attrs: { href: 'https://example.com/followed', openInNewWindow: false, styleId: null },
        };
        return [{ type: 'text', text: part.slice(1, -1), marks: [link] }];
    });

/** A document of `blocks` in the component-test model, which needs the features `capabilities` name. */
const documentOf = (blocks: readonly ContentNodeJSON[], capabilities: readonly string[]) => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.ct', version: 1 },
        requiredCapabilities: capabilities.map((id) => ({ id, version: 1 })),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    },
});

/** A document of one paragraph per text, in the component-test model. */
export const storedOf = (...texts: readonly string[]) =>
    documentOf(
        texts.map((text) => ({ type: 'paragraph', attrs: { lang: null }, content: textOf(text) })),
        ['core'],
    );

declare global {
    interface Window {
        /** The mounted editor's handle and the selection helper, for tests that drive it from the page. */
        rte?: {
            readonly handle: EditorHandle;
            /** The runtime behind the handle, which starts async operations through its coordinator. */
            readonly runtime: EditorRuntime | undefined;
            readonly setSelection: typeof setSelection;
            /** The text of the runtime's document. */
            readonly text: () => string | undefined;
            /** The undo steps of the runtime's history. */
            readonly undoDepth: () => number | undefined;
            /** Each request the fake persistence service got, when the probe mounts with `persistence`. */
            readonly saves: readonly SaveRequest[];
            /** Answers each save that `holdSaves` holds. */
            readonly answerSaves: () => void;
            /** The editor as a host form field. */
            readonly field: RichTextFormField;
        };
    }
}

/** The editor props a test rerenders with, such as during a composition. */
type Rerendered = Pick<
    Parameters<typeof RichTextEditor>[0],
    'status' | 'required' | 'aria-describedby' | 'placeholder'
>;

/** Mounts the component-test editor after a focusable button, and reports each change's origin and command. */
export const EditorProbe = ({
    texts = ['ab'],
    blocks,
    readOnly = false,
    guarded = false,
    inputRules = false,
    placeholder,
    contentClassName,
    withReader = false,
    inForm = false,
    inFrame = false,
    rerendered = {},
    persistence = false,
    holdSaves = false,
    onChange,
}: {
    readonly texts?: readonly string[];
    /** The document's blocks as stored JSON, in place of `texts`, such as the node view stand-ins of `fixture.chrome`. */
    readonly blocks?: readonly ContentNodeJSON[];
    readonly readOnly?: boolean;
    /** Mounts the definition whose policy keeps every paragraph as it is. */
    readonly guarded?: boolean;
    /** Mounts the definition with the heading input rule. */
    readonly inputRules?: boolean;
    readonly placeholder?: string;
    readonly contentClassName?: string;
    /** Renders the reader of the same document after the editor, in a region named Reader. */
    readonly withReader?: boolean;
    /** Puts the editor in a form. */
    readonly inForm?: boolean;
    /** Renders the editor in the body of a same-origin iframe, after a parent page button named Parent. */
    readonly inFrame?: boolean;
    readonly rerendered?: Rerendered;
    /** Mounts with the reference fake persistence service, which records each request in `window.rte.saves`. */
    readonly persistence?: boolean;
    /** Holds each save of the fake service until `window.rte.answerSaves()`. */
    readonly holdSaves?: boolean;
    readonly onChange?: (change: { readonly origin: string; readonly commandId: string | null }) => void;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const field = useRichTextFormField(ref);
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [frameBody, setFrameBody] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const frame = frameRef.current;
        if (inFrame && frame !== null && frame.contentDocument !== null) {
            setFrameBody(frame.contentDocument.body);
        }
    }, [inFrame]);
    const [saves] = useState<SaveRequest[]>([]);
    const [held] = useState<(() => void)[]>([]);
    const [services] = useState(() => {
        if (!persistence) {
            return undefined;
        }
        const server = createFakePersistenceService();
        const service: PersistenceService = {
            save: (request, context) => {
                saves.push(request);
                if (!holdSaves) {
                    return server.save(request, context);
                }
                return new Promise((resolve) => {
                    held.push(() => resolve(server.save(request, context)));
                });
            },
            read: server.read,
        };
        return { persistence: service };
    });
    let defaultValue = storedOf(...texts);
    if (blocks !== undefined) {
        defaultValue = documentOf(blocks, ['core', 'fixture.chrome']);
    }
    const presentation = useMemo(() => {
        if (contentClassName === undefined) {
            return undefined;
        }
        return defineReactPresentation({ contentClassName });
    }, [contentClassName]);
    let definition: CompiledEditorDefinition<object> = definitions.open;
    if (guarded) {
        definition = definitions.guarded;
    }
    let readerModel: ContentModel = model;
    if (inputRules) {
        definition = definitions.inputRules;
        readerModel = inputRulesModel;
    }
    useEffect(() => {
        if (ref.current !== null) {
            const handle = ref.current as EditorHandle;
            const runtime = runtimeOf(handle);
            window.rte = {
                handle,
                runtime,
                setSelection,
                text: () => runtime?.view?.state.doc.textContent,
                undoDepth: () => (runtime === undefined ? undefined : undoDepth(runtime.state)),
                saves,
                answerSaves: () => {
                    for (const answer of held.splice(0)) {
                        answer();
                    }
                },
                field,
            };
        }
    }, [saves, held, field, frameBody]);
    const editor = (
        <>
            <button type="button">Before</button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue}
                readOnly={readOnly}
                {...(placeholder === undefined ? {} : { placeholder })}
                {...(presentation === undefined ? {} : { presentation })}
                {...(services === undefined ? {} : { services })}
                {...rerendered}
                ref={ref}
                onDocumentChange={({ origin, commandId }) => onChange?.({ origin, commandId })}
            />
            {withReader && (
                <section aria-label="Reader">
                    <RichTextReader
                        document={defaultValue.document}
                        model={readerModel}
                        {...(presentation === undefined ? {} : { presentation })}
                    />
                </section>
            )}
        </>
    );
    if (inForm) {
        return <form onSubmit={(event) => event.preventDefault()}>{editor}</form>;
    }
    if (inFrame) {
        return (
            <>
                <button type="button">Parent</button>
                {/* oxlint-disable-next-line @eslint-react/dom-no-missing-iframe-sandbox -- WebKit runs no event listener in a sandboxed document. */}
                <iframe ref={frameRef} title="Embedded editor" style={{ inlineSize: 600, blockSize: 400 }} />
                {frameBody !== null && createPortal(editor, frameBody)}
            </>
        );
    }
    return editor;
};

/** The editor under a Fondue theme that a button switches between light and dark. */
export const ThemeSwitchProbe = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    let next: 'light' | 'dark' = 'dark';
    if (theme === 'dark') {
        next = 'light';
    }
    return (
        <>
            <button type="button" onClick={() => setTheme(next)}>
                Switch theme
            </button>
            <ThemeProvider theme={theme}>
                {/* Tests compare the editor with what the tokens compute to here, rather than restating token values. */}
                <span
                    data-token-probe=""
                    style={{ color: 'var(--color-primary-default)', backgroundColor: 'var(--color-surface-default)' }}
                />
                <EditorProbe texts={['ab']} />
            </ThemeProvider>
        </>
    );
};
