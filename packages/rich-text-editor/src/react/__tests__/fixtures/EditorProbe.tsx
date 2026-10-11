/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { bold, core } from '#/features';
import { fixtureChromeViews } from '#/features/__tests__/fixtures/chrome/view';
import { fixtureHeadingSet, fixtureLink } from '#/features/__tests__/fixtures/features';
import { fixtureProfiles } from '#/features/__tests__/fixtures/profiles';
import { type CompiledEditorDefinition, defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { boldRules } from '#/react/playground.stories';
import { RichTextReader } from '#/reader';
import { undoDepth } from '#/runtime/history';
import { type EditorRuntime, runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

const model = compileContentModel(
    [core(), bold(), fixtureLink(), fixtureHeadingSet(), boldRules(), fixtureChromeViews()],
    {
        id: 'test.ct',
        version: 1,
    },
);
const ALLOW = { create: true, edit: true, remove: true, paste: true };
/** The component-test model's definitions: every feature allowed, and paragraphs that may not change. */
const definitions = {
    open: defineEditor({ id: 'test.ct', model }),
    guarded: defineEditor({ id: 'test.ct', model, policy: { features: { core: { ...ALLOW, edit: false } } } }),
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
    placeholder,
    profile,
    withReader = false,
    inForm = false,
    rerendered = {},
    onChange,
}: {
    readonly texts?: readonly string[];
    /** The document's blocks as stored JSON, in place of `texts`, such as the node view stand-ins of `fixture.chrome`. */
    readonly blocks?: readonly ContentNodeJSON[];
    readonly readOnly?: boolean;
    /** Mounts the definition whose policy keeps every paragraph as it is. */
    readonly guarded?: boolean;
    readonly placeholder?: string;
    /** Mounts a definition of this fixture profile in place of the component-test model's. */
    readonly profile?: string;
    /** Renders the reader of the same document after the editor, in a region named Reader. */
    readonly withReader?: boolean;
    /** Puts the editor in a form. */
    readonly inForm?: boolean;
    readonly rerendered?: Rerendered;
    readonly onChange?: (change: { readonly origin: string; readonly commandId: string | null }) => void;
}) => {
    const ref = useRef<EditorHandle<object>>(null);
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
    let definition: CompiledEditorDefinition<object> = definitions.open;
    if (guarded) {
        definition = definitions.guarded;
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
                setSelection,
                text: () => runtime?.view?.state.doc.textContent,
                undoDepth: () => (runtime === undefined ? undefined : undoDepth(runtime.state)),
            };
        }
    }, []);
    const editor = (
        <>
            <button type="button">Before</button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue}
                readOnly={readOnly}
                {...(placeholder === undefined ? {} : { placeholder })}
                {...rerendered}
                ref={ref}
                onDocumentChange={({ origin, commandId }) => onChange?.({ origin, commandId })}
            />
            {withReader && (
                <section aria-label="Reader">
                    <RichTextReader document={defaultValue.document} model={model} />
                </section>
            )}
        </>
    );
    if (inForm) {
        return <form onSubmit={(event) => event.preventDefault()}>{editor}</form>;
    }
    return editor;
};
