/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, cleanup, render, screen } from '@testing-library/react';
import { type ComponentType } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const Greeting = ({ name }: { readonly name: string }) => <p>Hello {name}</p>;

describe('a lazy part', () => {
    const idle = new Map<number, () => void>();

    beforeEach(() => {
        let next = 0;
        idle.clear();
        vi.resetModules();
        vi.stubGlobal('requestIdleCallback', (callback: () => void) => {
            next += 1;
            idle.set(next, callback);
            return next;
        });
        vi.stubGlobal('cancelIdleCallback', (id: number) => {
            idle.delete(id);
        });
    });

    afterEach(() => {
        // Unmounting cancels the idle start, so it runs while the stubs stand.
        cleanup();
        vi.unstubAllGlobals();
    });

    const runIdle = async () => {
        await act(async () => {
            for (const callback of [...idle.values()]) {
                callback();
            }
            await vi.dynamicImportSettled();
        });
    };

    it('renders nothing until its module loads, then the component with its props', async () => {
        const { lazyPart } = await import('../lazyPart');
        let release: (component: ComponentType<{ readonly name: string }>) => void = () => undefined;
        const Part = lazyPart(
            () =>
                new Promise<ComponentType<{ readonly name: string }>>((resolve) => {
                    release = resolve;
                }),
        );

        const { container } = render(<Part name="Ada" />);
        expect(container).toBeEmptyDOMElement();

        await act(async () => {
            release(Greeting);
            await Promise.resolve();
        });

        expect(screen.getByText('Hello Ada')).toBeInTheDocument();
    });

    it('loads its module once for the first use and the prefetch together', async () => {
        const { lazyPart, prefetchPartsOnIdle } = await import('../lazyPart');
        const load = vi.fn(() => Promise.resolve(Greeting));
        const Part = lazyPart(load);

        prefetchPartsOnIdle();
        await runIdle();
        render(<Part name="Ada" />);
        await act(async () => {
            await Promise.resolve();
        });

        expect(load).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Hello Ada')).toBeInTheDocument();
    });

    it('prefetches when the page is idle and not before', async () => {
        const { lazyPart, prefetchPartsOnIdle } = await import('../lazyPart');
        const load = vi.fn(() => Promise.resolve(Greeting));
        lazyPart(load);

        prefetchPartsOnIdle();
        expect(load).not.toHaveBeenCalled();
        await runIdle();

        expect(load).toHaveBeenCalledTimes(1);
    });

    it('does not prefetch after the start was cancelled', async () => {
        const { lazyPart, prefetchPartsOnIdle } = await import('../lazyPart');
        const load = vi.fn(() => Promise.resolve(Greeting));
        lazyPart(load);

        prefetchPartsOnIdle()();
        await runIdle();

        expect(load).not.toHaveBeenCalled();
    });

    it('tries a module again on the next use after a load failed', async () => {
        const { lazyPart, prefetchPartsOnIdle } = await import('../lazyPart');
        const load = vi.fn<() => Promise<ComponentType<{ readonly name: string }>>>();
        load.mockRejectedValueOnce(new Error('offline')).mockResolvedValue(Greeting);
        const Part = lazyPart(load);

        prefetchPartsOnIdle();
        await runIdle();
        render(<Part name="Ada" />);
        await act(async () => {
            await Promise.resolve();
        });

        expect(load).toHaveBeenCalledTimes(2);
        expect(screen.getByText('Hello Ada')).toBeInTheDocument();
    });

    it('prefetches once the editor is ready, and not while its profile loads', async () => {
        const { lazyPart } = await import('../lazyPart');
        const { RichTextEditor } = await import('#/react/RichTextEditor');
        const { loadProfile } = await import('#/react/profiles');
        const { commentModel } = await import('#/features');
        const { createEmptyDocument } = await import('#/model');
        const load = vi.fn(() => Promise.resolve(Greeting));
        lazyPart(load);

        render(
            <RichTextEditor
                aria-label="Message"
                profile="comment"
                defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(commentModel) }}
            />,
        );
        expect([idle.size, load.mock.calls.length]).toEqual([0, 0]);

        await act(async () => {
            await loadProfile('comment');
        });
        expect([idle.size > 0, load.mock.calls.length]).toEqual([true, 0]);
        await runIdle();

        expect(load).toHaveBeenCalledTimes(1);
    });
});
