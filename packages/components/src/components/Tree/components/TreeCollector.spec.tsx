/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { Profiler, type ReactNode, useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Tree } from '../Tree';

import { COLLECT_ATTR } from './TreeCollector';

const Leaf = ({ id }: { id: string }) => (
    <Tree.Item id={id}>
        <Tree.Label>{id}</Tree.Label>
    </Tree.Item>
);

let treeRowRenders = 0;
vi.mock(import('./TreeRow'), async (importOriginal) => {
    const mod = await importOriginal();
    return {
        ...mod,
        TreeRow: (props: Parameters<typeof mod.TreeRow>[0]) => {
            treeRowRenders += 1;
            return mod.TreeRow(props);
        },
    };
});

const Row = ({ id }: { id: string }) => (
    <Tree.Item id={id}>
        <Tree.Label>{id}</Tree.Label>
    </Tree.Item>
);

const Rows = ({ ids }: { ids: string[] }) => (
    <>
        {ids.map((id) => (
            <Row key={id} id={id} />
        ))}
    </>
);

const GrowingRows = () => {
    const [ids, setIds] = useState(['a', 'b', 'c']);
    useEffect(() => {
        const timer = setTimeout(() => setIds((prev) => [...prev, 'd']), 10);
        return () => clearTimeout(timer);
    }, []);
    return <Rows ids={ids} />;
};

const Pair = () => (
    <>
        <Leaf id="B" />
        <Leaf id="C" />
    </>
);

describe('TreeCollector', () => {
    it('renders to a string without throwing when rows sit inside a custom component', () => {
        expect(() =>
            renderToString(
                <Tree.Root>
                    <Pair />
                </Tree.Root>,
            ),
        ).not.toThrow();
    });

    it('adds no commit on re-render when no custom components are used', () => {
        let commits = 0;
        // A fresh element each call, so React cannot bail out on referential equality.
        const ui = () => (
            <Profiler
                id="tree"
                onRender={() => {
                    commits += 1;
                }}
            >
                <Tree.Root>
                    <Tree.Item id="A">
                        <Tree.Label>A</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </Profiler>
        );
        const { rerender } = render(ui());
        commits = 0;
        rerender(ui());
        expect(commits).toBe(1);
    });

    it('does not reuse rows from an earlier collect pass', () => {
        const Wrap = ({ children }: { children: ReactNode }) => <>{children}</>;
        const onRenamingChange = vi.fn();
        const ui = (wrapped: boolean, isRenaming: boolean) => {
            const row = (
                <Tree.Item id="x" onRename={() => {}} isRenaming={isRenaming} onRenamingChange={onRenamingChange}>
                    <Tree.Label>x</Tree.Label>
                </Tree.Item>
            );
            if (wrapped) {
                return (
                    <Tree.Root>
                        <Wrap>{row}</Wrap>
                    </Tree.Root>
                );
            }
            return <Tree.Root>{row}</Tree.Root>;
        };
        const { rerender } = render(ui(true, true));
        rerender(ui(false, false));
        expect(onRenamingChange).toHaveBeenCalledWith(false);
        onRenamingChange.mockClear();
        rerender(ui(true, false));
        expect(onRenamingChange).not.toHaveBeenCalled();
    });

    it('collects rows of custom components after mount', () => {
        render(
            <Tree.Root>
                <Tree.Item id="A">
                    <Tree.Label>A</Tree.Label>
                </Tree.Item>
                <Pair />
            </Tree.Root>,
        );
        expect(screen.getAllByRole('treeitem').map((row) => row.textContent?.trim())).toEqual(['A', 'B', 'C']);
        expect(document.querySelectorAll(`[${COLLECT_ATTR}]`)).toHaveLength(3);
    });

    it('keeps fragment rows of a folder distinct in the collect pass', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const ui = (showX: boolean) => (
            <Tree.Root>
                <Leaf id="z" />
                <Tree.Folder id="f" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>f</Tree.Label>
                    </Tree.FolderHeader>
                    {showX && (
                        <Tree.Item id="x">
                            <Tree.Label>x</Tree.Label>
                        </Tree.Item>
                    )}
                    <>
                        <Tree.Item id="a">
                            <Tree.Label>a</Tree.Label>
                        </Tree.Item>
                        <Tree.Item id="a2">
                            <Tree.Label>a2</Tree.Label>
                        </Tree.Item>
                    </>
                    <>
                        <Tree.Item id="b">
                            <Tree.Label>b</Tree.Label>
                        </Tree.Item>
                        <Tree.Item id="b2">
                            <Tree.Label>b2</Tree.Label>
                        </Tree.Item>
                    </>
                </Tree.Folder>
            </Tree.Root>
        );
        const { rerender } = render(ui(true));
        rerender(ui(false));
        expect(screen.getAllByRole('treeitem').map((row) => row.textContent?.trim())).toEqual([
            'z',
            'f',
            'a',
            'a2',
            'b',
            'b2',
        ]);
        expect(spy.mock.calls.some((call) => String(call[0]).includes('same key'))).toBe(false);
        spy.mockRestore();
    });

    describe('collect pass render cost', () => {
        it('renders rows twice per consumer commit at most', () => {
            const ui = () => (
                <Tree.Root>
                    <Rows ids={['a', 'b', 'c']} />
                </Tree.Root>
            );
            const { rerender } = render(ui());
            treeRowRenders = 0;
            rerender(ui());
            expect(treeRowRenders / 3).toBeLessThanOrEqual(2);
        });

        it('renders rows no more often than the static path when a row is added', () => {
            const staticUi = (ids: string[]) => (
                <Tree.Root>
                    {ids.map((id) => (
                        <Tree.Item key={id} id={id}>
                            <Tree.Label>{id}</Tree.Label>
                        </Tree.Item>
                    ))}
                </Tree.Root>
            );
            const staticView = render(staticUi(['a', 'b', 'c']));
            treeRowRenders = 0;
            staticView.rerender(staticUi(['a', 'b', 'c', 'd']));
            const staticRenders = treeRowRenders;
            staticView.unmount();

            vi.useFakeTimers();
            render(
                <Tree.Root>
                    <GrowingRows />
                </Tree.Root>,
            );
            treeRowRenders = 0;
            act(() => {
                vi.runAllTimers();
            });
            expect(screen.getAllByRole('treeitem')).toHaveLength(4);
            expect(treeRowRenders).toBeLessThanOrEqual(staticRenders);
            vi.useRealTimers();
        });
    });
});
