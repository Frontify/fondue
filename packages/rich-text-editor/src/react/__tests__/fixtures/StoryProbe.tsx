/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Selection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { createElement, useEffect, useRef } from 'react';

import { liveResources, runtimeOfView } from '#/runtime/runtime';

import { COMPOSED_STORIES } from './composedStories';

/** The error reports a story throws on purpose, as its `reports` parameter allows them: each message bounded by count. */
interface Reports {
    readonly console: { readonly message: RegExp; readonly max: number };
    readonly page: { readonly message: RegExp; readonly max: number };
}

declare global {
    interface Window {
        storyProbe?: {
            /** Every story of the package, with what the harness reads of its tags and parameters. */
            stories: readonly {
                readonly file: string;
                readonly name: string;
                /** Tagged `documents-behavior`, so its play function must assert what it documents. */
                readonly documented: boolean;
                /** Its `noSurface` parameter: it renders no editable surface. */
                readonly noSurface: boolean;
                readonly reports: Reports | undefined;
            }[];
            /** `passed` once the play function resolved, `none` without one, else its error. */
            played: string;
            /** Records the live editor views and counts each `replaceDocument` from now on. */
            watch(): void;
            /** The `replaceDocument` calls since `watch`, and whether any view it recorded was replaced. */
            changes(): { readonly replaced: number; readonly remounted: boolean };
            /** Focuses the first editable surface with the caret at its last text position. */
            caretAtEnd(): void;
        };
    }
}

let watched: { readonly views: readonly EditorView[]; replaced: number } = { views: [], replaced: 0 };

window.storyProbe = {
    stories: COMPOSED_STORIES.map(({ file, name, tags, parameters }) => ({
        file,
        name,
        documented: tags.includes('documents-behavior'),
        noSurface: parameters.noSurface === true,
        reports: parameters.reports as Reports | undefined,
    })),
    played: 'pending',
    watch: () => {
        const views = [...liveResources.views];
        watched = { views, replaced: 0 };
        for (const view of views) {
            const handle = runtimeOfView(view)?.handle;
            if (handle === undefined) {
                continue;
            }
            // Counts a call when it starts, not when its `replace` metric fires at the end.
            const replaceDocument = handle.replaceDocument.bind(handle);
            handle.replaceDocument = (request) => {
                watched.replaced += 1;
                return replaceDocument(request);
            };
        }
    },
    changes: () => ({
        replaced: watched.replaced,
        remounted: watched.views.some((view) => !liveResources.views.has(view) || !view.dom.isConnected),
    }),
    caretAtEnd: () => {
        const view = [...liveResources.views].find((candidate) => candidate.editable && candidate.dom.isConnected);
        if (view === undefined) {
            throw new Error('No editable surface.');
        }
        view.focus();
        view.dispatch(view.state.tr.setSelection(Selection.atEnd(view.state.doc)));
    },
};

/** The story `name` of the story file at `file` under `src`, composed with the project annotations, and its play function run; no story without them. */
export const StoryProbe = ({ file, name }: { readonly file?: string; readonly name?: string }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const composed = COMPOSED_STORIES.find((story) => story.file === file && story.name === name);
    useEffect(() => {
        const probe = window.storyProbe;
        const canvasElement = canvasRef.current;
        if (composed === undefined || probe === undefined || canvasElement === null) {
            return undefined;
        }
        if (composed.play === undefined) {
            probe.played = 'none';
            return undefined;
        }
        // A play function of a story that has since unmounted must not set the result of the next one.
        let live = true;
        composed
            .play({ canvasElement })
            .then(() => {
                if (live) {
                    probe.played = 'passed';
                }
                return undefined;
            })
            .catch((error: unknown) => {
                if (live) {
                    probe.played = String(error);
                }
            });
        return () => {
            live = false;
        };
    }, [composed]);
    if (file === undefined || name === undefined) {
        return null;
    }
    if (composed === undefined) {
        throw new Error(`No story ${name} in ${file}.`);
    }
    // Each story is a module-level component that composeStories made once.
    return (
        <div key={`${file} ${name}`} ref={canvasRef}>
            {createElement(composed.Story)}
        </div>
    );
};
