/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { bold, contentChecks, core, fontColor, heading, language, links, mediaImage } from '#/features';
import { fixtureEditorsOf } from '#/features/__tests__/fixtures/editors';
import { fixtureHighlight } from '#/features/__tests__/fixtures/highlight';
import {
    type AuthoringPolicy,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type EditorPlugin,
    type EditorServices,
    RichTextEditor,
} from '#/index';
import { type ColorToken, compileContentModel, type ContentModel, type ContentNodeJSON, type Feature } from '#/model';
import { storedIn } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

export const COLOR_TOKENS: readonly ColorToken[] = [
    { id: 'pale', label: 'Pale', value: '#cccccc', usage: ['font_color', 'highlight'] },
    { id: 'ink', label: 'Ink', value: '#1a1a1a', usage: ['font_color'] },
];

export const checksFeatures = (options?: Parameters<typeof contentChecks>[0]): readonly Feature[] => [
    core(),
    bold(),
    heading(),
    links(),
    language(),
    fontColor(),
    fixtureHighlight(),
    mediaImage(),
    contentChecks(options),
];

export const checksModel = (features: readonly Feature[] = checksFeatures()): ContentModel =>
    compileContentModel(features, { id: 'test.checks', version: 1 });

export const text = (value: string, marks?: ContentNodeJSON['marks']): ContentNodeJSON =>
    marks === undefined ? { type: 'text', text: value } : { type: 'text', text: value, marks };
export const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});
export const headingBlock = (nodeId: string, level: number, value = ''): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId, level, lang: null },
    ...(value === '' ? {} : { content: [text(value)] }),
});
export const link = (value: string, href = 'https://example.com/page') =>
    text(value, [{ type: 'link', attrs: { href, openInNewWindow: false, styleId: null } }]);
export const colored = (value: string, tokenId: string) =>
    text(value, [{ type: 'font_color', attrs: { tokenId, value: null } }]);
export const image = (nodeId: string, attrs: Readonly<Record<string, unknown>> = {}): ContentNodeJSON => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align: 'center' },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId,
                assetId: `asset-${nodeId}`,
                labelSnapshot: 'Team.jpg',
                altIntent: 'missing',
                altText: '',
                width: null,
                height: null,
                displayWidth: null,
                mediaType: 'image/jpeg',
                ...attrs,
            },
        },
    ],
});

interface Mount {
    readonly blocks: readonly ContentNodeJSON[];
    readonly model?: ContentModel;
    readonly policy?: Partial<AuthoringPolicy>;
    readonly services?: EditorServices;
    readonly toolbar?: readonly (readonly string[])[];
    readonly plugins?: readonly EditorPlugin[];
    readonly readOnly?: boolean;
}

/** Mounts an editor with the content checks on a white page, with the Checks button and runs its first frame. */
export const mountChecks = ({
    blocks,
    model = checksModel(),
    policy,
    services,
    toolbar = [['checks.open', 'link.edit']],
    plugins = [],
    readOnly,
}: Mount) => {
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    const parts = [...fixtureEditorsOf(model), ...plugins];
    let definition = defineEditor({ id: 'test.checks', model, plugins: parts });
    if (policy !== undefined) {
        definition = defineEditor({ id: 'test.checks', model, policy, plugins: parts });
    }
    const rendered = render(
        <div style={{ backgroundColor: '#ffffff' }}>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({ toolbar, colorTokens: COLOR_TOKENS })}
                defaultValue={{ documentId: 'document-1', revision: null, document: storedIn(model, blocks) }}
                {...(services === undefined ? {} : { services })}
                {...(readOnly === undefined ? {} : { readOnly })}
                onDocumentChange={(change) => changes.push(change)}
                ref={ref}
            />
        </div>,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const runtime = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }
    return { ...rendered, handle, runtime, view: runtime.view, changes, model };
};
