/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeAction } from '../components/TreeAction';
import { TreeFolder } from '../components/TreeFolder';
import { TreeFolderHeader } from '../components/TreeFolderHeader';
import { TreeIcon } from '../components/TreeIcon';
import { TreeItem } from '../components/TreeItem';
import { TreeLabel } from '../components/TreeLabel';
import { TreeLoading } from '../components/TreeLoading';

import { parseChildren } from './parseChildren';

const item = (id: string, name: string) => (
    <TreeItem key={id} id={id}>
        <TreeLabel>{name}</TreeLabel>
    </TreeItem>
);

describe('parseChildren', () => {
    it('returns an empty parse for no children', () => {
        const result = parseChildren(null);
        expect(result.items).toEqual([]);
        expect(result.parentIsLoading).toBe(false);
    });

    it('parses a flat list of items with the root parent id by default', () => {
        const result = parseChildren([item('1', 'One'), item('2', 'Two')]);
        expect(result.items).toHaveLength(2);
        expect(result.items[0]).toMatchObject({ id: '1', name: 'One', isFolder: false, parentId: 'root' });
        expect(result.items[1]).toMatchObject({ id: '2', name: 'Two', isFolder: false, parentId: 'root' });
    });

    it('uses the provided parentId for items', () => {
        const result = parseChildren(item('1', 'One'), 'folder-a');
        expect(result.items[0]?.parentId).toBe('folder-a');
    });

    it('parses a folder with nested children and records direct child ids', () => {
        const result = parseChildren(
            <TreeFolder id="f">
                <TreeFolderHeader>
                    <TreeLabel>Folder</TreeLabel>
                </TreeFolderHeader>
                {item('a', 'A')}
                {item('b', 'B')}
            </TreeFolder>,
        );
        const folder = result.items.find((entry) => entry.id === 'f');
        expect(folder).toMatchObject({ isFolder: true, parentId: 'root', name: 'Folder' });
        expect(folder?.children).toEqual(['a', 'b']);
        // Descendants are appended to the same flat list.
        expect(result.items.map((entry) => entry.id)).toEqual(['f', 'a', 'b']);
        expect(result.items.find((entry) => entry.id === 'a')?.parentId).toBe('f');
    });

    it('records only direct children on a folder when grandchildren are present', () => {
        const result = parseChildren(
            <TreeFolder id="f">
                <TreeFolderHeader>
                    <TreeLabel>Folder</TreeLabel>
                </TreeFolderHeader>
                <TreeFolder id="g">
                    <TreeFolderHeader>
                        <TreeLabel>Inner</TreeLabel>
                    </TreeFolderHeader>
                    {item('gx', 'GX')}
                </TreeFolder>
                {item('leaf', 'Leaf')}
            </TreeFolder>,
        );
        const f = result.items.find((entry) => entry.id === 'f');
        expect(f?.children).toEqual(['g', 'leaf']);
        const g = result.items.find((entry) => entry.id === 'g');
        expect(g?.children).toEqual(['gx']);
    });

    it('surfaces TreeLoading at the top level via parentIsLoading', () => {
        const result = parseChildren([item('1', 'One'), <TreeLoading key="loading" />]);
        expect(result.parentIsLoading).toBe(true);
        // TreeLoading itself produces no flat item.
        expect(result.items.map((entry) => entry.id)).toEqual(['1']);
    });

    it('marks the surrounding folder as loading when TreeLoading appears inside it', () => {
        const result = parseChildren(
            <TreeFolder id="f">
                <TreeFolderHeader>
                    <TreeLabel>Folder</TreeLabel>
                </TreeFolderHeader>
                {item('a', 'A')}
                <TreeLoading />
            </TreeFolder>,
        );
        const folder = result.items.find((entry) => entry.id === 'f');
        expect(folder?.isLoading).toBe(true);
        // Top-level loading is unaffected by a nested loading row.
        expect(result.parentIsLoading).toBe(false);
    });

    it('extracts TreeAction children into the actions slot', () => {
        const result = parseChildren(
            <TreeItem id="1">
                <TreeLabel>One</TreeLabel>
                <TreeAction>
                    <span data-test-id="action">action</span>
                </TreeAction>
            </TreeItem>,
        );
        expect(result.items[0]?.actions).toBeTruthy();
    });

    it('extracts TreeIcon children into the icon slot', () => {
        const result = parseChildren(
            <TreeItem id="1">
                <TreeIcon>
                    <span data-test-id="icon">icon</span>
                </TreeIcon>
                <TreeLabel>One</TreeLabel>
            </TreeItem>,
        );
        expect(result.items[0]?.icon).toBeTruthy();
        expect(result.items[0]?.name).toBe('One');
    });

    it('pulls a folder row parts from TreeFolderHeader, not from nested rows', () => {
        const result = parseChildren(
            <TreeFolder id="f">
                <TreeFolderHeader>
                    <TreeIcon>
                        <span>folder-icon</span>
                    </TreeIcon>
                    <TreeLabel>Folder</TreeLabel>
                    <TreeAction>
                        <button type="button">act</button>
                    </TreeAction>
                </TreeFolderHeader>
                {item('a', 'A')}
            </TreeFolder>,
        );
        const folder = result.items.find((entry) => entry.id === 'f');
        expect(folder?.name).toBe('Folder');
        expect(folder?.icon).toBeTruthy();
        expect(folder?.actions).toBeTruthy();
        const leaf = result.items.find((entry) => entry.id === 'a');
        expect(leaf?.name).toBe('A');
        expect(leaf?.icon).toBeUndefined();
        expect(leaf?.actions).toBeUndefined();
    });

    it('defaults a folder name to an empty string when no TreeFolderHeader is given', () => {
        const result = parseChildren(<TreeFolder id="f">{item('a', 'A')}</TreeFolder>);
        const folder = result.items.find((entry) => entry.id === 'f');
        expect(folder?.name).toBe('');
        expect(folder?.children).toEqual(['a']);
    });

    it('forwards folder-specific props (accepts, isExpanded, onExpandChange, tags)', () => {
        const accepts = () => true;
        const onExpandChange = () => {};
        const result = parseChildren(
            <TreeFolder id="f" isExpanded onExpandChange={onExpandChange} accepts={accepts} tags={['x']}>
                <TreeFolderHeader>
                    <TreeLabel>Folder</TreeLabel>
                </TreeFolderHeader>
                {item('a', 'A')}
            </TreeFolder>,
        );
        const folder = result.items.find((entry) => entry.id === 'f');
        expect(folder?.isExpanded).toBe(true);
        expect(folder?.onExpandChange).toBe(onExpandChange);
        expect(folder?.accepts).toBe(accepts);
        expect(folder?.tags).toEqual(['x']);
    });

    it('forwards rename props (isRenaming, onRenamingChange, onRename)', () => {
        const onRename = () => {};
        const onRenamingChange = () => {};
        const result = parseChildren(
            <TreeItem id="1" isRenaming onRenamingChange={onRenamingChange} onRename={onRename}>
                <TreeLabel>One</TreeLabel>
            </TreeItem>,
        );
        expect(result.items[0]).toMatchObject({ isRenaming: true, onRenamingChange, onRename });
    });

    it('ignores non-Tree children', () => {
        const result = parseChildren([
            <div key="div">not-a-tree-node</div>,
            item('1', 'One'),
            'string-child',
            null,
            undefined,
            false,
        ]);
        expect(result.items.map((entry) => entry.id)).toEqual(['1']);
    });
});
