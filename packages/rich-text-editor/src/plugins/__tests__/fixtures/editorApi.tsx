/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineEditorPart, type EditorApi, useEditorApi } from '#/entries/authoring';
import { type AuthoringPolicy, defineEditor, type EditorHandle, type ReactPresentation, RichTextEditor } from '#/index';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { bold, codeBlock, core, fontColor, heading, link, image, quote } from '#/plugins';
import { spotlight } from '#/plugins/__tests__/fixtures/spotlight/feature';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { type DocumentChange } from '#/runtime/types';
import { pressKey, setSelection } from '#/testing';

export const PANEL = 'fixture.api';

// The probe's commands take any payload, which the shipped command map does not name.
export type Handle = EditorHandle<Record<string, unknown>>;

export const ProbePanel = () => <section aria-label="Probe panel" />;

export const model = compileContentModel(
    [core(), bold(), heading(), link(), fontColor(), codeBlock(), image(), quote(), spotlight()],
    { id: 'fixture.api', version: 1 },
);

export const paragraph: ContentNodeJSON = {
    type: 'paragraph',
    attrs: { lang: null },
    content: [
        { type: 'text', text: 'Plain ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
    ],
};
export const title: ContentNodeJSON = {
    type: 'heading',
    attrs: { nodeId: 'heading-1', level: 2, lang: null },
    content: [{ type: 'text', text: 'Title' }],
};
export const stored = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title] },
} as unknown as RichTextDocument;

export type Mount = {
    presentation?: ReactPresentation;
    policy?: Partial<AuthoringPolicy>;
    limits?: Partial<ResourceLimits>;
    readOnly?: boolean;
    disabled?: boolean;
    model?: ContentModel;
    document?: RichTextDocument;
};

export const blocksOf = (handle: Handle) => handle.getSnapshot().document.content.content;
export const blockAt = (handle: Handle, index: number) => {
    const blocks = blocksOf(handle);

    return blocks?.[index];
};

export const attrsAt = (handle: Handle, index: number) => {
    const block = blockAt(handle, index);

    return block?.attrs;
};

export const childAt = (handle: Handle, index: number) => {
    const block = blockAt(handle, index);
    const children = block?.content;

    return children?.[0];
};

export const selectAll = (handle: Handle) => {
    act(() => {
        pressKey(handle, 'Mod-a');
    });
};

export const probePanel = () => screen.queryByRole('region', { name: 'Probe panel' });

export const text = (value: string, marks?: ContentNodeJSON['marks']): ContentNodeJSON => ({
    type: 'text',
    text: value,
    ...(marks === undefined ? {} : { marks }),
});
export const heading2 = (value: string): ContentNodeJSON => ({
    type: 'heading',
    attrs: { level: 2 },
    content: [text(value)],
});
export const textsOf = (handle: Handle) =>
    blocksOf(handle)?.map((block) => (block.content ?? []).map((child) => child.text ?? '').join(''));

export type ProbeHooks = {
    script: () => (api: EditorApi) => boolean;
    setScript: (run: (api: EditorApi) => boolean) => void;
    setLive?: (api: EditorApi | undefined) => void;
};

/** The probe plugin and the helpers that run it, bound to the spec's own script and live API. */
export const probeHarness = (hooks: ProbeHooks) => {
    const script = (api: EditorApi) => hooks.script()(api);

    const Grab = () => {
        const api = useEditorApi();
        if (hooks.setLive !== undefined) {
            hooks.setLive(api);
        }

        return null;
    };

    const probe = defineEditorPart(spotlight, {
        needs: [
            'attributes',
            'blocks',
            'commands',
            'content',
            'history',
            'insert',
            'lists',
            'marks',
            'nodeState',
            'overlays',
            'panels',
            'services',
            'targets',
            'uploads',
        ],
        commands: {
            'fixture.api.run': { run: (api) => script(api) },
            'fixture.api.read-only': { readOnly: true, run: (api) => script(api) },
            'fixture.api.open': {
                run: (api) => {
                    api.panels.open(PANEL);

                    return true;
                },
            },
            'fixture.api.enabled': {
                enabled: (api) => {
                    api.panels.open(PANEL);

                    return true;
                },
                run: (api) => api.insert.text('x'),
            },
        },
        keys: { 'Mod-Alt-8': (api) => script(api) },
        overlays: [Grab],
        panels: [{ control: PANEL, component: ProbePanel }],
    });

    const mount = (options?: Mount) => {
        let given: Mount = {};
        if (options !== undefined) {
            given = options;
        }

        const {
            presentation,
            policy = {},
            limits = {},
            readOnly = false,
            disabled = false,
            model: own = model,
            document = stored,
        } = given;
        const definition = defineEditor({
            id: 'fixture.api',
            model: own,
            plugins: unitsOf(own, [probe]),
            policy,
            limits,
        });
        const ref = createRef<EditorHandle>();
        const changes: DocumentChange[] = [];
        const shown: { presentation?: ReactPresentation } = {};
        if (presentation !== undefined) {
            shown.presentation = presentation;
        }

        render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
                {...shown}
                readOnly={readOnly}
                disabled={disabled}
                onDocumentChange={(change) => changes.push(change)}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        if (ref.current === null) {
            throw new Error('The editor did not mount.');
        }

        return { handle: ref.current as unknown as Handle, changes };
    };

    /** Runs `run` as a plugin command, as a key or the toolbar would, with the caret in `at`. */
    const runIn = (handle: Handle, at: string, run: (api: EditorApi) => boolean, id = 'fixture.api.run') => {
        hooks.setScript(run);
        setSelection(handle, { text: at, from: 1, to: 1 });
        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute(id);
        });

        return result;
    };

    return { mount, runIn };
};
