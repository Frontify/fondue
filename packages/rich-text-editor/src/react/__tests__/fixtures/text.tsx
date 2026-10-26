/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { type EditorPart } from '#/bridge/plugin';
import { defineReactPresentation } from '#/entries/authoring';
import {
    type AuthoringPolicy,
    defineEditor,
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
    type RichTextLocale,
} from '#/model';
import {
    bold,
    code,
    core,
    heading,
    inputRules,
    italic,
    quote,
    strikethrough,
    subscript,
    superscript,
    underline,
} from '#/plugins';
import { storedIn } from '#/plugins/__tests__/fixtures/documents';
import { type UnitCommands, unitsOf } from '#/plugins/__tests__/fixtures/units';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

type Rules = RichTextEditorProps<object>['inputRules'];
type Typography = NonNullable<NonNullable<Parameters<typeof inputRules>[0]>['typography']>;

/** Every feature of the text pair, with the typography rules that `typography` turns on, else the factory default. */
export const textFeatures = (typography?: Typography) => {
    let rules = inputRules();
    if (typography !== undefined) {
        rules = inputRules({ typography });
    }

    return [
        core(),
        bold(),
        italic(),
        underline(),
        strikethrough(),
        code(),
        subscript(),
        superscript(),
        heading(),
        quote(),
        rules,
    ] as const;
};

export const textModel = <const Features extends readonly Feature[] = ReturnType<typeof textFeatures>>(
    features: Features = textFeatures() as unknown as Features,
): ContentModel<Features> => compileContentModel(features, { id: 'test.text', version: 1 });

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

export { storedIn };

type Mount<Model extends ContentModel> = {
    model?: Model;
    blocks?: readonly ContentNodeJSON[];
    document?: RichTextDocument;
    policy?: Partial<AuthoringPolicy>;
    toolbar?: ReactPresentation['toolbar'];
    inputRules?: Rules;
    readOnly?: boolean;
    /** Host editor parts, for features a test adds. */
    plugins?: readonly EditorPart[];
};

/** Mounts `RichTextEditor` and runs the first frame, so the editor is `ready`. */
export const mountText = <Model extends ContentModel = ContentModel<ReturnType<typeof textFeatures>>>(
    options?: Mount<Model>,
) => {
    let given: Mount<Model> = {};
    if (options !== undefined) {
        given = options;
    }

    const {
        model = textModel() as unknown as Model,
        blocks = [para()],
        document,
        policy,
        toolbar,
        inputRules: rules,
        readOnly,
        plugins,
    } = given;
    const ref = createRef<EditorHandle<UnitCommands>>();
    const changes: DocumentChange[] = [];
    const units = unitsOf(model, plugins);
    let definition = defineEditor({ id: 'test.text', model, plugins: units });
    if (policy !== undefined) {
        definition = defineEditor({
            id: 'test.text',
            model,
            policy,
            plugins: units,
        });
    }

    let shown: { presentation?: ReactPresentation } = {};
    if (toolbar !== undefined) {
        shown = { presentation: defineReactPresentation({ toolbar }) };
    }

    let locale: RichTextLocale | undefined;
    const element = (inputRules: Rules) => {
        let rules: { inputRules?: NonNullable<Rules> } = {};
        if (inputRules !== undefined) {
            rules = { inputRules };
        }

        return (
            <RichTextEditor
                {...shown}
                {...rules}
                {...(locale === undefined ? {} : { locale })}
                aria-label="Notes"
                definition={definition}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: document ?? storedIn(model, blocks),
                }}
                onDocumentChange={(change) => changes.push(change)}
                {...(readOnly === undefined ? {} : { readOnly })}
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
        rerenderLocale: (next: RichTextLocale) => {
            locale = next;
            rendered.rerender(element(rules));
        },
    };
};
