/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeFolder } from '../components/TreeFolder';
import { TreeItem } from '../components/TreeItem';
import { TreeItemAction } from '../components/TreeItemAction';
import { TreeLoading } from '../components/TreeLoading';

import { parseChildren } from './parseChildren';

describe('parseChildren', () => {
    it('returns an empty parse for no children', () => {
        const result = parseChildren(null);
        expect(result.items).toEqual([]);
        expect(result.parentIsLoading).toBe(false);
    });

    it('parses a flat list of items with the root parent id by default', () => {
        const result = parseChildren([
            <TreeItem key="1" id="1" label="One" />,
            <TreeItem key="2" id="2" label="Two" />,
        ]);
        expect(result.items).toHaveLength(2);
        expect(result.items[0]).toMatchObject({ id: '1', name: 'One', isFolder: false, parentId: 'root' });
        expect(result.items[1]).toMatchObject({ id: '2', name: 'Two', isFolder: false, parentId: 'root' });
    });

    it('uses the provided parentId for items', () => {
        const result = parseChildren(<TreeItem id="1" label="One" />, 'folder-a');
        expect(result.items[0]?.parentId).toBe('folder-a');
    });

    it('parses a folder with nested children and records direct child ids', () => {
        const result = parseChildren(
            <TreeFolder id="f" label="Folder">
                <TreeItem id="a" label="A" />
                <TreeItem id="b" label="B" />
            </TreeFolder>,
        );
        const folder = result.items.find((item) => item.id === 'f');
        expect(folder).toMatchObject({ isFolder: true, parentId: 'root' });
        expect(folder?.children).toEqual(['a', 'b']);
        // Descendants are appended to the same flat list.
        expect(result.items.map((item) => item.id)).toEqual(['f', 'a', 'b']);
        expect(result.items.find((item) => item.id === 'a')?.parentId).toBe('f');
    });

    it('records only direct children on a folder when grandchildren are present', () => {
        const result = parseChildren(
            <TreeFolder id="f" label="Folder">
                <TreeFolder id="g" label="Inner">
                    <TreeItem id="gx" label="GX" />
                </TreeFolder>
                <TreeItem id="leaf" label="Leaf" />
            </TreeFolder>,
        );
        const f = result.items.find((item) => item.id === 'f');
        expect(f?.children).toEqual(['g', 'leaf']);
        const g = result.items.find((item) => item.id === 'g');
        expect(g?.children).toEqual(['gx']);
    });

    it('surfaces TreeLoading at the top level via parentIsLoading', () => {
        const result = parseChildren([<TreeItem key="1" id="1" label="One" />, <TreeLoading key="loading" />]);
        expect(result.parentIsLoading).toBe(true);
        // TreeLoading itself produces no flat item.
        expect(result.items.map((item) => item.id)).toEqual(['1']);
    });

    it('marks the surrounding folder as loading when TreeLoading appears inside it', () => {
        const result = parseChildren(
            <TreeFolder id="f" label="Folder">
                <TreeItem id="a" label="A" />
                <TreeLoading />
            </TreeFolder>,
        );
        const folder = result.items.find((item) => item.id === 'f');
        expect(folder?.isLoading).toBe(true);
        // Top-level loading is unaffected by a nested loading row.
        expect(result.parentIsLoading).toBe(false);
    });

    it('extracts TreeItemAction children into the actions slot', () => {
        const result = parseChildren(
            <TreeItem id="1" label="One">
                <TreeItemAction>
                    <span data-test-id="action">action</span>
                </TreeItemAction>
            </TreeItem>,
        );
        expect(result.items[0]?.actions).toBeTruthy();
    });

    it('forwards folder-specific props (accepts, isExpanded, onExpandChange, tags)', () => {
        const accepts = () => true;
        const onExpandChange = () => {};
        const result = parseChildren(
            <TreeFolder id="f" label="Folder" isExpanded onExpandChange={onExpandChange} accepts={accepts} tags={['x']}>
                <TreeItem id="a" label="A" />
            </TreeFolder>,
        );
        const folder = result.items.find((item) => item.id === 'f');
        expect(folder?.isExpanded).toBe(true);
        expect(folder?.onExpandChange).toBe(onExpandChange);
        expect(folder?.accepts).toBe(accepts);
        expect(folder?.tags).toEqual(['x']);
    });

    it('ignores non-Tree children', () => {
        const result = parseChildren([
            <div key="div">not-a-tree-node</div>,
            <TreeItem key="1" id="1" label="One" />,
            'string-child',
            null,
            undefined,
            false,
        ]);
        expect(result.items.map((item) => item.id)).toEqual(['1']);
    });
});
