/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '#/runtime/runtime';

import { type ChromeView, createChromeView } from './chrome-view';
import { markReady } from './dev-checks';

export interface MountCoordinator {
    readonly runtime: EditorRuntime | undefined;
    /** What chrome sets on the view, which each view this coordinator attaches takes. */
    readonly chrome: ChromeView;
    /** The surface element's ref: attaching shows the runtime's view in it, detaching destroys that view at once. */
    readonly setSurface: (element: HTMLElement | null) => void;
    start(runtime: EditorRuntime): void;
    stop(): void;
}

/** Attaches the running session's view to whichever surface element is mounted, so neither waits for the other. */
export const createMountCoordinator = (): MountCoordinator => {
    let surface: HTMLElement | null = null;
    let current: EditorRuntime | undefined;
    const chrome = createChromeView();
    const attach = (runtime: EditorRuntime, element: HTMLElement) => {
        runtime.attach(element);
        if (runtime.view !== undefined) {
            chrome.take(runtime.view);
        }
    };
    return {
        get runtime() {
            return current;
        },
        chrome,
        setSurface: (element) => {
            surface = element;
            if (current === undefined) {
                return;
            }
            if (element === null) {
                current.detach();
                return;
            }
            attach(current, element);
            // A surface remounted in a ready session takes over its mark, which `ready` set on the first one (SPEC-rich-text-react/AC-080).
            if (process.env.NODE_ENV !== 'production' && current.handle.getSummary().phase === 'ready') {
                markReady(element);
            }
        },
        start: (runtime) => {
            current = runtime;
            if (surface !== null) {
                attach(runtime, surface);
            }
        },
        stop: () => {
            current = undefined;
        },
    };
};
