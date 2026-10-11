/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { columns, core, inputRules, quote, rule } from '#/features';
import { fixtureImage } from '#/features/__tests__/fixtures/features';
import {
    type AuthoringPolicy,
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
} from '#/index';
import { compileContentModel, type ContentModel, type ContentNodeJSON, type Feature } from '#/model';
import { storedIn } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

/** The layout features, a quote to nest blocks in, and the `fixture.image` leaf that stands in for `media.image`. */
export const layoutFeatures = (): readonly Feature[] => [
    core(),
    quote(),
    rule(),
    columns(),
    fixtureImage(),
    inputRules(),
];

export const layoutModel = (features: readonly Feature[] = layoutFeatures()): ContentModel =>
    compileContentModel(features, { id: 'test.layout', version: 1 });

export const columnBreak = (): ContentNodeJSON => ({ type: 'column_break' });
export const horizontalRule = (): ContentNodeJSON => ({ type: 'horizontal_rule' });
export const image = (assetId: string): ContentNodeJSON => ({ type: 'image', attrs: { assetId } });

interface LayoutMount {
    readonly model?: ContentModel;
    readonly blocks: readonly ContentNodeJSON[];
    readonly columns?: number;
    readonly columnGap?: string;
    readonly toolbar?: ReactPresentation['toolbar'];
    readonly policy?: Partial<AuthoringPolicy>;
    /** The input rules the editor leaves out. */
    readonly excludeRules?: readonly string[];
}

/** Mounts `RichTextEditor` with a presentation of `columns` and runs the first frame, so the editor is `ready`. */
export const mountLayout = ({
    model = layoutModel(),
    blocks,
    columns: count = 1,
    columnGap = 'normal',
    toolbar = [],
    policy = {},
    excludeRules = [],
}: LayoutMount) => {
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    const definition = defineEditor({ id: 'test.layout', model, policy });
    const document = storedIn(model, blocks);
    const element = (shown: number) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={defineReactPresentation({ columns: shown, columnGap, toolbar })}
            inputRules={{ exclude: excludeRules }}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            onDocumentChange={(change) => changes.push(change)}
            ref={ref}
        />
    );
    const rendered = render(element(count));
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const runtime = handle === null ? undefined : runtimeOf(handle);
    if (handle === null || runtime === undefined || runtime.view === undefined) {
        throw new Error('The editor did not mount.');
    }
    return {
        unmount: rendered.unmount,
        handle,
        runtime,
        view: runtime.view,
        changes,
        document,
        blocks: () => handle.getSnapshot().document.content.content,
        rerenderWithColumns: (shown: number) => rendered.rerender(element(shown)),
    };
};

/** Presses a key at the surface, with the legacy `keyCode` ProseMirror reads for Enter, Backspace, Delete and arrows. */
export const press = (
    { view }: { readonly view: ReturnType<typeof mountLayout>['view'] },
    key: string,
    modifiers: { readonly meta?: boolean; readonly ctrl?: boolean; readonly shift?: boolean } = {},
) => {
    const codes: Readonly<Record<string, number>> = {
        Backspace: 8,
        Enter: 13,
        Delete: 46,
        ArrowLeft: 37,
        ArrowUp: 38,
        ArrowRight: 39,
        ArrowDown: 40,
    };
    const event = new KeyboardEvent('keydown', {
        key,
        metaKey: modifiers.meta === true,
        ctrlKey: modifiers.ctrl === true,
        shiftKey: modifiers.shift === true,
        bubbles: true,
        cancelable: true,
    });
    Object.defineProperty(event, 'keyCode', { get: () => codes[key] ?? 0 });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};

/** Pretends to run on an Apple platform, where `Mod` is ⌘, or on another one, where it is Ctrl. */
export const onPlatform = (apple: boolean) =>
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue(apple ? 'MacIntel' : 'Win32');
