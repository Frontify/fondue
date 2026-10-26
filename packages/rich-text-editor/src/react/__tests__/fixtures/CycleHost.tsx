/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { type PerfFixtureName } from '../../../model/__tests__/fixtures/perf/documents';

import { perfValue, PerfTree } from './PerfEditor';

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** Mounts an editor over a perf fixture, waits for it to be ready, then unmounts it and removes its container. */
        rteCycle?: (fixture: PerfFixtureName) => Promise<void>;
    }
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Gives a component test a page function that mounts and unmounts one editor, as a host does across routes. */
export const CycleHost = () => {
    useEffect(() => {
        window.rteCycle = async (fixture) => {
            const container = document.createElement('div');
            document.body.append(container);
            const root = createRoot(container);
            await new Promise<void>((resolve) => {
                root.render(<PerfTree values={[perfValue(fixture)]} onReady={() => resolve()} />);
            });
            await nextFrame();
            root.unmount();
            container.remove();
        };

        return () => {
            delete window.rteCycle;
        };
    }, []);

    return null;
};
