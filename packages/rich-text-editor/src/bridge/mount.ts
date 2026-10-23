/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '#/runtime/runtime';

export interface MountCoordinator {
    readonly runtime: EditorRuntime | undefined;
    /** The surface element's ref: attaching shows the runtime's view in it, detaching destroys that view at once. */
    readonly setSurface: (element: HTMLElement | null) => void;
    start(runtime: EditorRuntime): void;
    stop(): void;
}

/** Attaches the running session's view to whichever surface element is mounted, so neither waits for the other. */
export const createMountCoordinator = (): MountCoordinator => {
    let surface: HTMLElement | null = null;
    let current: EditorRuntime | undefined;
    const attach = (runtime: EditorRuntime, element: HTMLElement) => {
        runtime.attach(element);
    };
    return {
        get runtime() {
            return current;
        },
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
