/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { Profiler } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Tree } from '../Tree';

import { COLLECT_ATTR } from './TreeCollector';

const Leaf = ({ id }: { id: string }) => (
    <Tree.Item id={id}>
        <Tree.Label>{id}</Tree.Label>
    </Tree.Item>
);

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
});
