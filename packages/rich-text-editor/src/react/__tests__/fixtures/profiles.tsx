/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';

import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/features';
import { createEmptyDocument } from '#/model';
import { loadProfile } from '#/react/profiles';
import { RichTextEditor } from '#/react/rich-text-editor';
import { type EditorHandle, type RichTextEditorBaseProps, type RichTextProfile } from '#/react/types';
import { runtimeOf } from '#/runtime/runtime';

const MODELS = {
    inline: inlineModel,
    comment: commentModel,
    document: documentModel,
    'brand-document': brandDocumentModel,
} as const;

/** Mounts a shipped profile's editor with an empty document, once its module has loaded, with its view and live region. */
export const mountProfile = async (
    profile: RichTextProfile,
    props: Partial<Omit<RichTextEditorBaseProps<object>, 'profile' | 'ref' | 'defaultValue'>> = {},
) => {
    const ref = createRef<EditorHandle<object>>();
    const rendered = render(
        <RichTextEditor
            {...props}
            aria-label="Message"
            profile={profile}
            defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(MODELS[profile]) }}
            ref={ref}
        />,
    );
    await act(async () => {
        await loadProfile(profile);
    });
    const handle = ref.current;
    const view = handle === null ? undefined : runtimeOf(handle)?.view;
    if (handle === null || view === undefined) {
        throw new Error(`The ${profile} profile mounted no editor.`);
    }
    const announced = () => rendered.container.querySelector('[aria-live="polite"]')?.textContent;
    const content = () => handle.getSnapshot().document.content.content as unknown;
    return { handle, view, announced, content, rendered };
};
