/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { act, render, screen } from '@testing-library/react';
import { createRef, StrictMode } from 'react';
import { vi } from 'vitest';

import { compileContentModel, type ContentNodeJSON, type JsonValue } from '#/model';
import { type LoadedDocument } from '#/persistence/types';
import { fixtureItalic } from '#/plugins/__tests__/fixtures/features';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { liveResources, type RuntimeHandle } from '#/runtime/runtime';

import { defineEditor } from '../../compile/define';
import { RichTextEditor } from '../../RichTextEditor/RichTextEditor';
import { type EditorDefinitionOptions, type EditorHandle, type RichTextEditorBaseProps } from '../../types';

export const features = [core(), bold()];
export const boldModel = compileContentModel(features, { id: 'test.editor', version: 1 });
export const boldPlugins = pluginsFor(boldModel);
export const boldWith = (id: string, extra: Omit<EditorDefinitionOptions, 'id' | 'model' | 'plugins'> = {}) =>
    defineEditor({ id, model: boldModel, plugins: boldPlugins, ...extra });
export const definition = boldWith('test.editor');
export const italicModel = compileContentModel([core(), bold(), fixtureItalic()], { id: 'test.editor', version: 1 });
export const otherDefinition = defineEditor({ id: 'test.other', model: italicModel, plugins: pluginsFor(italicModel) });

export const para = (...content: readonly JsonValue[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
export const defaultValue = (...blocks: readonly JsonValue[]): LoadedDocument => ({
    documentId: 'document-1',
    revision: null,
    document: {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.editor', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: (blocks.length === 0 ? [para()] : blocks) as unknown as readonly ContentNodeJSON[],
        },
    },
});

export const ALLOWED = { create: true, edit: true, remove: true, paste: true };

export type Props = Partial<RichTextEditorBaseProps<object>>;

export type Theme = 'light' | 'dark';

/** Mounts an editor, under a Fondue `theme` when given, and runs its first frame, so it is `ready`. */
export const mount = (props: Props = {}, strict = false, theme?: Theme) => {
    const ref = createRef<EditorHandle<object>>();
    const element = (extra: Props) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
            ref={ref}
            {...props}
            {...extra}
        />
    );
    const wrap = (extra: Props, shown = theme) => {
        let editor = element(extra);
        if (strict) {
            editor = <StrictMode>{editor}</StrictMode>;
        }

        if (shown === undefined) {
            return editor;
        }

        return <ThemeProvider theme={shown}>{editor}</ThemeProvider>;
    };

    const view = render(wrap({}));
    act(() => {
        vi.runAllTimers();
    });
    const handle = () => {
        if (ref.current === null) {
            throw new Error('no handle');
        }

        return ref.current;
    };

    return {
        ...view,
        handle,
        rerender: (extra: Props = {}, shown?: Theme) => view.rerender(wrap(extra, shown)),
    };
};

export const surface = () => screen.getByRole('textbox', { name: 'Notes' });
/** Undoes once, and reads whether another undo step is left. */
export const undoOnce = (handle: EditorHandle<object>) => {
    const commands = handle as unknown as Pick<RuntimeHandle, 'execute' | 'query'>;

    return [commands.execute('history.undo').status, commands.query('history.undo').enabled];
};

export const viewOf = () => {
    const [view] = liveResources.views;
    if (view === undefined) {
        throw new Error('no live view');
    }

    return view;
};
