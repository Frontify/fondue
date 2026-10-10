/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { undoDepth } from 'prosemirror-history';
import { useEffect, useMemo, useRef, useState } from 'react';

import { bold, core } from '../../src/features';
import { fixtureChromeViews } from '../../src/features/__fixtures__/chrome/view';
import {
    fixtureHeadingSet,
    fixtureInputRules,
    fixtureItalic,
    fixtureLink,
} from '../../src/features/__fixtures__/features';
import { fixtureProfiles } from '../../src/features/__fixtures__/profiles';
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
} from '../../src/index';
import { compileContentModel, type ContentModel, type ContentNodeJSON } from '../../src/model';
import { boldRules } from '../../src/react/playground.stories';
import { RichTextReader } from '../../src/reader';
import { type EditorRuntime, runtimeOf } from '../../src/runtime/runtime';
import {
    createFakePersistenceService,
    createTestEnvironment,
    setSelection,
    type TestEnvironment,
} from '../../src/testing';

const model = compileContentModel(
    [core(), bold(), fixtureLink(), fixtureHeadingSet(), boldRules(), fixtureChromeViews()],
    {
        id: 'test.ct',
        version: 1,
    },
);
// Adds a `pre` code block and the heading input rule to the CT model (SPEC-rich-text-react/AC-066, AC-092).
const inputRulesModel = compileContentModel(
    [core(), bold(), fixtureItalic(), fixtureLink(), fixtureHeadingSet(), fixtureInputRules(), fixtureChromeViews()],
    { id: 'test.ct', version: 1 },
);
const ALLOW = { create: true, edit: true, remove: true, paste: true };
/** The CT model's definitions: every feature allowed, and paragraphs that may not change. */
const definitions = {
    open: defineEditor({ id: 'test.ct', model }),
    guarded: defineEditor({ id: 'test.ct', model, policy: { features: { core: { ...ALLOW, edit: false } } } }),
    // The heading input rule turns `## ` into a heading, which needs the typed space kept (SPEC-rich-text-react/AC-092).
    inputRules: defineEditor({ id: 'test.ct', model: inputRulesModel }),
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

/** A document of `blocks` in the CT model, which needs the features `capabilities` name. */
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

/** A document of one paragraph per text, in the CT model. */
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
            /** The injected environment when the probe mounts with `controlled`, whose timers run only when advanced. */
            readonly environment: TestEnvironment | undefined;
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

/** The editor props a test rerenders with, such as during a composition (SPEC-rich-text-react/AC-078). */
type Rerendered = Pick<
    Parameters<typeof RichTextEditor>[0],
    'status' | 'required' | 'aria-describedby' | 'placeholder'
>;

/** Mounts the CT model's editor after a focusable button, and reports each change's origin and HTML. */
export const EditorProbe = ({
    texts = ['ab'],
    blocks,
    readOnly = false,
    guarded = false,
    inputRules = false,
    placeholder,
    contentClassName,
    controlled = false,
    profile,
    withReader = false,
    inForm = false,
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
    /** Mounts with a test environment, so the test runs its microtasks, frames and timers. */
    readonly controlled?: boolean;
    /** Mounts a definition of this fixture profile in place of the CT model's. */
    readonly profile?: string;
    /** Renders the reader of the same document after the editor, in a region named Reader. */
    readonly withReader?: boolean;
    /** Puts the editor in a form. */
    readonly inForm?: boolean;
    readonly rerendered?: Rerendered;
    /** Mounts with the reference fake persistence service, which records each request in `window.rte.saves`. */
    readonly persistence?: boolean;
    /** Holds each save of the fake service until `window.rte.answerSaves()`. */
    readonly holdSaves?: boolean;
    readonly onChange?: (change: { readonly origin: string; readonly commandId: string | null }) => void;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const field = useRichTextFormField(ref);
    const [environment] = useState(() => {
        if (controlled) {
            return createTestEnvironment({ seed: 1 });
        }
        return undefined;
    });
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
    const [profileDefinition] = useState(() => {
        if (profile === undefined) {
            return undefined;
        }
        const features = fixtureProfiles()[profile] ?? [];
        return defineEditor({
            id: `test.${profile}`,
            model: compileContentModel(features, { id: 'test.ct', version: 1 }),
        });
    });
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
    if (profileDefinition !== undefined) {
        definition = profileDefinition;
    }
    useEffect(() => {
        if (ref.current !== null) {
            const handle = ref.current as EditorHandle;
            const runtime = runtimeOf(handle);
            window.rte = {
                handle,
                runtime,
                environment,
                setSelection,
                text: () => runtime?.view?.state.doc.textContent,
                undoDepth: () => {
                    if (runtime === undefined) {
                        return undefined;
                    }
                    return undoDepth(runtime.state);
                },
                saves,
                answerSaves: () => {
                    for (const answer of held.splice(0)) {
                        answer();
                    }
                },
                field,
            };
        }
    }, [environment, saves, held, field]);
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
                {...(environment === undefined ? {} : { environment })}
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
    return editor;
};

/** The editor under a Fondue theme that a button switches between light and dark (SPEC-rich-text-react/AC-053). */
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
