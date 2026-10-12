/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import {
    bold,
    code,
    core,
    heading,
    inputRules,
    italic,
    quote,
    strike,
    subscript,
    superscript,
    underline,
} from '#/features';
import {
    type AuthoringPolicy,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
    type RichTextEditorProps,
} from '#/index';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    type Feature,
    type RichTextDocument,
} from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

type Rules = RichTextEditorProps<object>['inputRules'];
type Typography = NonNullable<NonNullable<Parameters<typeof inputRules>[0]>['typography']>;

/** Every feature of the text pair, with the typography rules that `typography` turns on, else the factory default. */
export const textFeatures = (typography?: Typography): readonly Feature[] => {
    let rules = inputRules();
    if (typography !== undefined) {
        rules = inputRules({ typography });
    }
    return [
        core(),
        bold(),
        italic(),
        underline(),
        strike(),
        code(),
        subscript(),
        superscript(),
        heading(),
        quote(),
        rules,
    ];
};

export const textModel = (features: readonly Feature[] = textFeatures()): ContentModel =>
    compileContentModel(features, { id: 'test.text', version: 1 });

export const para = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [...content],
});
export const text = (value: string, ...marks: readonly string[]): ContentNodeJSON => {
    if (marks.length === 0) {
        return { type: 'text', text: value };
    }
    return { type: 'text', text: value, marks: marks.map((type) => ({ type })) };
};

/** A stored document of `blocks` in `model`, which declares every capability the model installs. */
export const storedIn = (model: ContentModel, blocks: readonly ContentNodeJSON[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

interface Mount {
    readonly model?: ContentModel;
    readonly blocks?: readonly ContentNodeJSON[];
    readonly document?: RichTextDocument;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly toolbar?: ReactPresentation['toolbar'];
    readonly inputRules?: Rules;
}

/** Mounts `RichTextEditor` and runs the first frame, so the editor is `ready`. */
export const mountText = ({
    model = textModel(),
    blocks = [para()],
    document,
    policy,
    toolbar,
    inputRules: rules,
}: Mount = {}) => {
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    let definition = defineEditor({ id: 'test.text', model });
    if (policy !== undefined) {
        definition = defineEditor({ id: 'test.text', model, policy });
    }
    let shown: { readonly presentation?: ReactPresentation } = {};
    if (toolbar !== undefined) {
        shown = { presentation: defineReactPresentation({ toolbar }) };
    }
    const element = (inputRules: Rules) => {
        let rules: { readonly inputRules?: NonNullable<Rules> } = {};
        if (inputRules !== undefined) {
            rules = { inputRules };
        }
        return (
            <RichTextEditor
                {...shown}
                {...rules}
                aria-label="Notes"
                definition={definition}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: document ?? storedIn(model, blocks),
                }}
                onDocumentChange={(change) => changes.push(change)}
                ref={ref}
            />
        );
    };
    const rendered = render(element(rules));
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    if (handle === null) {
        throw new Error('The editor did not mount.');
    }
    const view = runtimeOf(handle)?.view;
    if (view === undefined) {
        throw new Error('The editor has no view.');
    }
    return {
        ...rendered,
        handle,
        view,
        changes,
        rerenderWith: (inputRules: Rules) => rendered.rerender(element(inputRules)),
    };
};
