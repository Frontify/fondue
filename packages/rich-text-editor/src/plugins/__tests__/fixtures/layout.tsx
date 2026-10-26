/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import { type AuthoringPolicy, defineEditor, type EditorHandle, type ReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel, type ContentModel, type ContentNodeJSON, type Feature } from '#/model';
import { columns, core, inputRules, image as imageFeature, quote, rule } from '#/plugins';
import { unitsOf, type UnitCommands } from '#/plugins/__tests__/fixtures/units';
import { storedIn } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';

/** The layout features, a quote to nest blocks in, and `media.image`, whose figure holds a leaf image. */
export const layoutFeatures = () => [core(), quote(), rule(), columns(), imageFeature(), inputRules()] as const;

export const layoutModel = <const Features extends readonly Feature[] = ReturnType<typeof layoutFeatures>>(
    features: Features = layoutFeatures() as unknown as Features,
): ContentModel<Features> => compileContentModel(features, { id: 'test.layout', version: 1 });

export const columnBreak = (): ContentNodeJSON => ({ type: 'column_break' });
export const horizontalRule = (): ContentNodeJSON => ({ type: 'horizontal_rule' });
/** A figure that holds one decorative image of `assetId`. */
export const image = (assetId: string): ContentNodeJSON => ({
    type: 'figure',
    attrs: { nodeId: `figure-${assetId}`, align: 'center' },
    content: [
        {
            type: 'asset_image',
            attrs: {
                nodeId: `image-${assetId}`,
                assetId,
                labelSnapshot: `${assetId}.png`,
                altIntent: 'decorative',
                altText: '',
                width: null,
                height: null,
                displayWidth: null,
                mediaType: null,
            },
        },
    ],
});

type LayoutMount = {
    model?: ContentModel;
    blocks: readonly ContentNodeJSON[];
    columns?: number;
    columnGap?: string;
    toolbar?: ReactPresentation['toolbar'];
    policy?: Partial<AuthoringPolicy>;
    /** The input rules the editor leaves out. */
    excludeRules?: readonly string[];
};

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
    // A given model keeps the layout features, so the handle takes their commands.
    const ref = createRef<EditorHandle<UnitCommands>>();
    const changes: DocumentChange[] = [];
    const definition = defineEditor({ id: 'test.layout', model, policy, plugins: unitsOf(model) });
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
    { view }: { view: ReturnType<typeof mountLayout>['view'] },
    key: string,
    modifiers: { meta?: boolean; ctrl?: boolean; shift?: boolean } = {},
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
