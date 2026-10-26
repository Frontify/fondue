/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import {
    type AuthoringPolicy,
    defineEditor,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
    type ToolbarMode,
} from '#/index';
import { type ContentModel, type ContentNodeJSON, type Diagnostic } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

import { COLOR_TOKENS, STYLE_MAP, styledDocument, styleModel } from './styles';
import { unitsOf, type UnitCommands } from './units';

type Mount = {
    readonly model?: ContentModel;
    readonly blocks: readonly ContentNodeJSON[];
    readonly presentation?: Partial<ReactPresentation>;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly toolbarMode?: ToolbarMode;
};

/** Mounts `RichTextEditor` over the brand style and colour features with the shared style map and tokens, and runs the first frame. */
export const mountStyled = ({
    model = styleModel(),
    blocks,
    presentation = {},
    policy,
    toolbarMode = 'fixed',
}: Mount) => {
    const ref = createRef<EditorHandle<UnitCommands>>();
    const changes: DocumentChange[] = [];
    const diagnostics: Diagnostic[] = [];
    let definition = defineEditor({ id: 'test.styles', model, plugins: unitsOf(model) });
    if (policy !== undefined) {
        definition = defineEditor({ id: 'test.styles', model, policy, plugins: unitsOf(model) });
    }
    const document = styledDocument(model, blocks);
    const element = (shown: ReactPresentation) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={shown}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            defaultToolbarMode={toolbarMode}
            onDocumentChange={(change) => changes.push(change)}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            ref={ref}
        />
    );
    const first = defineReactPresentation({ styles: STYLE_MAP, colorTokens: COLOR_TOKENS, ...presentation });
    const rendered = render(element(first));
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
        diagnostics,
        rerenderWith: (next: Partial<ReactPresentation>) =>
            rendered.rerender(
                element(defineReactPresentation({ styles: STYLE_MAP, colorTokens: COLOR_TOKENS, ...next })),
            ),
    };
};
