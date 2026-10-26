/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { defineReactPresentation } from '#/entries/authoring';
import {
    defineEditor,
    type EditorHandle,
    type EditorServices,
    type ReactPresentation,
    type ReferencePage,
    type ReferenceSearchRequest,
    RichTextEditor,
    type ServiceContext,
} from '#/index';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    type Diagnostic,
    type Feature,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import { core, mentions } from '#/plugins';
import { unitsOf, type UnitCommands } from '#/plugins/__tests__/fixtures/units';
import { activeSuggestion } from '#/runtime/capabilities/suggestions/plugin';
import { runtimeOf } from '#/runtime/runtime';
import { type ReferenceValue } from '#/runtime/types';

export const mentionModel = (features: readonly Feature[] = [core(), mentions()]): ContentModel =>
    compileContentModel(features, { id: 'test.mentions', version: 1 });

export const para = (...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [...content],
});
export const text = (value: string): ContentNodeJSON => ({ type: 'text', text: value });
export const mention = (nodeId: string, labelSnapshot: string, resourceId = 'user-1', resourceType = 'user') => ({
    type: 'mention',
    attrs: { nodeId, resourceType, resourceId, labelSnapshot },
});

export const storedIn = (model: ContentModel, blocks: readonly ContentNodeJSON[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

export const ADA: ReferenceValue = { resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada Lovelace' };
export const GRACE: ReferenceValue = { resourceType: 'user', resourceId: 'user-2', labelSnapshot: 'Grace Hopper' };
export const DESIGN: ReferenceValue = {
    resourceType: 'group',
    resourceId: 'group-1',
    labelSnapshot: 'Design team',
    kind: 'group',
};

/** One search the service received and has not answered yet. */
export type PendingSearch = {
    request: ReferenceSearchRequest;
    context: ServiceContext;
    resolve: (page: unknown) => void;
    reject: (error: unknown) => void;
};

/** A `ReferenceService` that answers each search only when the test does, in any order. */
export const deferredService = () => {
    const pending: PendingSearch[] = [];
    const search = vi.fn(
        (request: ReferenceSearchRequest, context: ServiceContext) =>
            new Promise<ReferencePage>((resolve, reject) => {
                pending.push({ request, context, resolve: resolve as (page: unknown) => void, reject });
            }),
    );

    return { service: { search }, search, pending };
};

/** A page with `items` and no next page. */
export const page = (items: readonly unknown[], nextCursor: string | null = null) => ({ items, nextCursor });

type Mount = {
    model?: ContentModel;
    blocks?: readonly ContentNodeJSON[];
    services?: EditorServices | undefined;
    presentation?: ReactPresentation | undefined;
    locale?: RichTextLocale | undefined;
    toolbar?: ReactPresentation['toolbar'];
    id?: string;
};

/** The optional props that are set, as `exactOptionalPropertyTypes` takes them. */
const setProps = (next: Pick<Mount, 'services' | 'presentation' | 'locale'>) => {
    const props: { services?: EditorServices; presentation?: ReactPresentation; locale?: RichTextLocale } = {};
    if (next.services !== undefined) {
        props.services = next.services;
    }

    if (next.presentation !== undefined) {
        props.presentation = next.presentation;
    }

    if (next.locale !== undefined) {
        props.locale = next.locale;
    }

    return props;
};

/** Mounts `RichTextEditor` and runs the first frame, so the editor is `ready`. */
export const mountMentions = (options?: Mount) => {
    let given: Mount = {};
    if (options !== undefined) {
        given = options;
    }

    const {
        model = mentionModel(),
        blocks = [para()],
        services,
        presentation,
        locale,
        toolbar,
        id = 'test.mentions',
    } = given;
    const ref = createRef<EditorHandle<UnitCommands>>();
    const diagnostics: Diagnostic[] = [];
    const definition = defineEditor({ id, model, plugins: unitsOf(model) });
    let shown = presentation;
    if (shown === undefined && toolbar !== undefined) {
        shown = defineReactPresentation({ toolbar });
    }

    const element = (next: Pick<Mount, 'services' | 'presentation' | 'locale'>) => (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: storedIn(model, blocks) }}
            {...setProps({ locale, ...next })}
            onDiagnostic={(diagnostic) => diagnostics.push(diagnostic)}
            ref={ref}
        />
    );
    const rendered = render(element({ services, presentation: shown }));
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

    const blocksOf = () => handle.getSnapshot().document.content.content ?? [];

    return {
        ...rendered,
        handle,
        view,
        diagnostics,
        blocksOf,
        /** The first paragraph's inline content. */
        inline: () => blocksOf()[0]?.content ?? [],
        textOf: () =>
            (blocksOf()[0]?.content ?? [])
                .map((node) => {
                    if (node.type === 'mention') {
                        return `@${typeof node.attrs?.labelSnapshot === 'string' ? node.attrs.labelSnapshot : ''}`;
                    }

                    return node.text ?? '';
                })
                .join(''),
        active: () => activeSuggestion(view.state),
        rerenderWith: (next: Pick<Mount, 'services' | 'presentation' | 'locale'>) => rendered.rerender(element(next)),
    };
};

/** Runs the timers `ms` ahead and settles the promises they start, as a search and its answer need. */
export const advance = async (ms: number) => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
};

/** Settles the promises a resolved or rejected search started, through the coordinator to the list. */
export const flush = async () => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
};
