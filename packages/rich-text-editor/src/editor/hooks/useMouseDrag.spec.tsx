/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { useMouseDrag } from './useMouseDrag';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

/** Mounts the hook, handing back its latest result. */
const mountDrag = (): (() => ReturnType<typeof useMouseDrag>) => {
    let latest: ReturnType<typeof useMouseDrag> | undefined;
    const Probe = (): ReactNode => {
        latest = useMouseDrag();
        return null;
    };
    const root = createRoot(window.document.createElement('div'));
    act(() => root.render(<Probe />));
    teardown.push(() => act(() => root.unmount()));
    return () => {
        if (latest === undefined) {
            throw new Error('the hook never ran');
        }
        return latest;
    };
};

describe('a mouse drag', () => {
    it.each(['mouseup', 'dragend', 'drop', 'pointercancel', 'blur'])('ends on %s in the window', (type) => {
        const drag = mountDrag();
        act(() => drag().startDragging());
        expect(drag().isDragging).toBe(true);

        act(() => {
            window.dispatchEvent(new Event(type));
        });

        expect(drag().isDragging).toBe(false);
    });

    it('ends on a drop whose target stops it', () => {
        const drag = mountDrag();
        const target = window.document.createElement('div');
        window.document.body.append(target);
        target.addEventListener('drop', (event) => event.stopPropagation());
        act(() => drag().startDragging());

        act(() => {
            target.dispatchEvent(new Event('drop', { bubbles: true }));
        });

        expect(drag().isDragging).toBe(false);
        target.remove();
    });
});
