/* (c) Copyright Frontify Ltd., all rights reserved. */

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconDocument } from '@foundation/Icon';

import type { TreeItemStyling, TreeProps } from '@components/Tree/types';
import {
    TreeItem,
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
    Tree as TreeView,
    useTreeItem,
} from '@components/Tree';
import {
    type TreeItemMock,
    treeItemsMock,
    useDynamicNavigationMock,
    useNavigationWithLazyLoadedItemsMock,
} from '@components/Tree/utils';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { Container } from '@components/Container';
import { InlineDialog } from '@components/InlineDialog';
import { DialogBody } from '@components/DialogBody';
import { Modality } from '../../types';

export default {
    title: 'Components/Tree',
    component: TreeView,
    tags: ['autodocs'],
    args: {
        id: 'storybook-tree',
        draggable: true,
        selectedIds: ['2'],
        dragHandlerPosition: 'left',
        showDragHandlerOnHoverOnly: true,
        showContentWhileDragging: false,
        spacingY: 'none',
        contentHight: 'single-line',
        shadow: 'none',
        borderRadius: 'small',
        borderWidth: 'none',
        borderStyle: 'none',
        activeColorStyle: 'neutral',
    },
    argTypes: {
        draggable: {
            control: { type: 'boolean' },
        },
        showDragHandlerOnHoverOnly: {
            table: { category: 'Item Options' },
            control: { type: 'boolean' },
        },
        showContentWhileDragging: {
            table: { category: 'Item Options' },
            control: { type: 'boolean' },
        },
        dragHandlerPosition: {
            table: { category: 'Item Options' },
            options: ['left', 'right', 'none'],
            control: { type: 'inline-radio' },
        },
        spacingY: {
            table: { category: 'Item Style' },
            name: 'itemStyle.spacingY',
            options: [...Object.keys(TreeItemSpacingClassMap)],
            mapping: [...Object.values(TreeItemSpacingClassMap)],
            control: { type: 'inline-radio' },
        },
        contentHight: {
            table: { category: 'Item Style' },
            name: 'itemStyle.contentHight',
            options: ['content-fit', 'single-line'],
            control: { type: 'inline-radio' },
        },
        shadow: {
            table: { category: 'Item Style' },
            name: 'itemStyle.shadow',
            options: [...Object.keys(TreeItemShadowClassMap)],
            mapping: [...Object.values(TreeItemShadowClassMap)],
            control: { type: 'select' },
        },
        borderRadius: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderRadius',
            options: [...Object.keys(TreeItemBorderRadiusClassMap)],
            mapping: [...Object.values(TreeItemBorderRadiusClassMap)],
            control: { type: 'select' },
        },
        borderWidth: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderWidth',
            options: [...Object.keys(TreeItemBorderClassMap)],
            mapping: [...Object.values(TreeItemBorderClassMap)],
            control: { type: 'select' },
        },
        borderStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderStyle',
            options: [...Object.keys(TreeItemBorderStyleClassMap)],
            mapping: [...Object.values(TreeItemBorderStyleClassMap)],
            control: { type: 'select' },
        },
        activeColorStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.activeColorStyle',
            options: [...Object.keys(TreeItemColorsClassMap)],
            mapping: [...Object.values(TreeItemColorsClassMap)],
            control: { type: 'inline-radio' },
        },
        selectedIds: {
            control: { type: 'object' },
        },
        expandedIds: {
            control: { type: 'object' },
        },
    },
} as Meta<TreeProps & TreeItemStyling>;

const TreeItemContentComponent = ({ title }: { title: string }) => {
    return (
        <div className="tw-flex tw-space-x-1.5 tw-w-full">
            <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{<IconDocument />}</span>
            <span>{title}</span>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTreeItem = ({ label, contentComponent, nodes, ...otherProps }: TreeItemMock) => {
    const customLabel = `${label} CUSTOM`;

    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeItem label={customLabel} {...otherProps} onDrop={onDrop}>
            {nodes?.map((node) => renderCustomTreeItem({ ...node, nodes: node.nodes }))}
        </TreeItem>
    );
};

const renderCustomTreeItem = ({ id, onDrop, ...treeItem }: TreeItemMock) => {
    return <CustomTreeItem key={`${id}-custom`} id={id} onDrop={onDrop ?? action('onDrop')} {...treeItem} />;
};

const renderTreeItemLabel = ({ nodes, onDrop, ignoreItemDoubleClick, expandOnSelect, ...treeItem }: TreeItemMock) => {
    return (
        <TreeItem
            {...treeItem}
            ignoreItemDoubleClick={ignoreItemDoubleClick}
            expandOnSelect={expandOnSelect}
            key={treeItem.id}
            onDrop={onDrop ?? action('onDrop')}
        >
            {nodes?.map((node) =>
                renderTreeItemLabel({
                    ...node,
                    nodes: node.nodes,
                    onDrop,
                    ignoreItemDoubleClick,
                    expandOnSelect,
                }),
            )}
        </TreeItem>
    );
};

const renderTreeItemComponent = ({ nodes, label, numChildNodes, onDrop, ...treeItem }: TreeItemMock) => {
    const nodesLength = nodes?.length ?? 0;
    const showCaret = numChildNodes !== undefined ? !!numChildNodes : nodesLength > 0;
    return (
        <TreeItem
            {...treeItem}
            key={treeItem.id}
            contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
            onDrop={onDrop ?? action('onDrop')}
            showCaret={showCaret}
        >
            {nodes?.map(renderTreeItemComponent)}
        </TreeItem>
    );
};

const cleanProps = ({ ...args }) => {
    const itemStyle = {
        spacingY: args.spacingY,
        contentHight: args.contentHight,
        shadow: args.shadow,
        borderRadius: args.borderRadius,
        borderWidth: args.borderWidth,
        borderStyle: args.borderStyle,
        activeColorStyle: args.activeColorStyle,
        ...args.itemStyle,
    };

    delete args.spacingY;
    delete args.contentHight;
    delete args.shadow;
    delete args.borderRadius;
    delete args.borderWidth;
    delete args.borderStyle;
    delete args.activeColorStyle;

    return { ...args, itemStyle };
};

export const WithLabel = ({ ...args }) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map((item) => renderTreeItemLabel({ ...item, onDrop }))}
            </TreeView>
        </Container>
    );
};

export const WithCustomTreeItem = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map((item) => renderCustomTreeItem({ ...item, onDrop }))}
            </TreeView>
        </Container>
    );
};

export const ScrollableWithLabel = ({ ...args }: TreeProps) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const handleItemExpand = useCallback((id: string) => {
        setExpandedIds((ids) => [...ids, id]);
    }, []);

    const handleItemShrink = useCallback((id: string) => {
        setExpandedIds((ids) => ids.filter((itemId: string) => itemId !== id));
    }, []);

    return (
        <div style={{ position: 'fixed', height: '800px', width: '800px', backgroundColor: 'white' }}>
            <div style={{ width: '800px', height: '300px', overflow: 'auto', position: 'absolute' }}>
                <TreeView
                    id={args.id}
                    {...cleanProps(args)}
                    expandedIds={expandedIds}
                    onExpand={handleItemExpand}
                    onShrink={handleItemShrink}
                >
                    {treeItemsMock.map(renderTreeItemLabel)}
                </TreeView>
            </div>
        </div>
    );
};

export const WithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(renderTreeItemComponent)}
            </TreeView>
        </Container>
    );
};

export const WithAwaitedItem = ({ ...args }: TreeProps) => {
    const [awaitedItems, setAwaitedItems] = useState<TreeItemMock[]>([]);
    const cleanArgs = cleanProps(args);

    useEffect(() => {
        setTimeout(() => {
            setAwaitedItems([
                {
                    id: '2-1',
                    label: 'Document Category 2',
                    nodes: [
                        {
                            id: '2-1-1',
                            label: 'Home',
                            type: 'document-page',
                        },
                        {
                            id: '2-1-2',
                            label: 'Members',
                            type: 'document-page',
                        },
                        {
                            id: '2-1-3',
                            label: 'About us',
                            type: 'document-page',
                        },
                    ],
                    type: 'document-category',
                    accepts: ['document-page', 'document-page-within', 'document-category'].join(', '),
                },
            ]);
        }, 500);
    }, []);

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanArgs}>
                {treeItemsMock.map(renderTreeItemComponent)}
                {awaitedItems.map(renderTreeItemComponent)}
            </TreeView>
        </Container>
    );
};

const DynamicNavigation = ({ ...args }: TreeProps) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [nodes] = useDynamicNavigationMock(expandedIds);

    const handleItemExpand = (id: string) => {
        setExpandedIds([...expandedIds, id]);
    };

    const handleItemShrink = (id: string) => {
        setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
    };

    return (
        <TreeView
            id={args.id}
            {...cleanProps(args)}
            draggable
            expandedIds={expandedIds}
            onExpand={handleItemExpand}
            onShrink={handleItemShrink}
        >
            {renderTreeItemComponent({ id: 'first-fixed-tree-item', draggable: false, label: 'First Fixed TreeItem' })}
            {nodes.length > 0 && (nodes as TreeItemMock[]).map(renderTreeItemComponent)}
            {renderTreeItemComponent({ id: 'last-fixed-tree-item', draggable: false, label: 'Last Fixed TreeItem' })}
        </TreeView>
    );
};

export const WithDynamicNavigation = ({ ...args }: TreeProps) => {
    return (
        <Container maxWidth="400px">
            <DynamicNavigation {...args} id="dynamic-navigation" />
        </Container>
    );
};

const LazyLoadingTreeItem = memo(({ label, numChildNodes, onDrop, ...otherProps }: TreeItemMock) => {
    const { isExpanded } = useTreeItem(otherProps.id);

    const { nodes } = useNavigationWithLazyLoadedItemsMock(otherProps.id, isExpanded);

    const nodesToRender = useMemo(() => {
        return nodes.map((n) => n);
    }, [nodes]);

    const handleDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeItem
            contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
            onDrop={onDrop ?? handleDrop}
            showCaret={!!numChildNodes}
            {...otherProps}
        >
            {nodesToRender.map(renderLazyLoadingTreeItem)}
        </TreeItem>
    );
});
LazyLoadingTreeItem.displayName = 'FondueStoryLazyLoadingTreeItem';

const renderLazyLoadingTreeItem = ({ id, ...treeItem }: TreeItemMock) => {
    return <LazyLoadingTreeItem key={`${id}-lazyloaded`} id={`${id}-lazyloaded`} {...treeItem} />;
};

const LazyLoadingTreeRoot = memo(({ ...args }: TreeProps) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const { nodes: rootNodesData } = useNavigationWithLazyLoadedItemsMock(undefined, true, true);

    const handleItemExpand = useCallback(
        (id: string) => {
            setExpandedIds([...expandedIds, id]);
        },
        [expandedIds],
    );

    const handleItemShrink = useCallback(
        (id: string) => {
            setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
        },
        [expandedIds],
    );

    const onRootDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeView {...args} draggable expandedIds={expandedIds} onExpand={handleItemExpand} onShrink={handleItemShrink}>
            {renderTreeItemComponent({
                id: 'first-fixed-tree-item',
                draggable: false,
                label: 'First Fixed TreeItem',
                onDrop: onRootDrop,
            })}
            {...rootNodesData.map(renderLazyLoadingTreeItem)}
            {renderTreeItemComponent({
                id: 'last-fixed-tree-item',
                draggable: false,
                label: 'Last Fixed TreeItem',
                onDrop: onRootDrop,
            })}
        </TreeView>
    );
});
LazyLoadingTreeRoot.displayName = 'FondueStoryLazyLoadingTreeRoot';

export const CustomItemsWithLazyLoadedChildren = ({ ...args }: TreeProps) => {
    return (
        <LazyLoadingTreeRoot {...cleanProps(args)} id="dynamic-navigation">
            {null}
        </LazyLoadingTreeRoot>
    );
};

export const WithCancelSelectionOnDoubleClick = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map((item) => renderTreeItemLabel({ ...item, onDrop, ignoreItemDoubleClick: true }))}
            </TreeView>
        </Container>
    );
};

export const WithExpandOnSelect = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map((item) => renderTreeItemLabel({ ...item, onDrop, expandOnSelect: true }))}
            </TreeView>
        </Container>
    );
};

export const InsideInlineDialog = ({ ...args }: TreeProps) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);

    const handleItemExpand = useCallback((id: string) => {
        setExpandedIds((ids) => [...ids, id]);
    }, []);

    const handleItemShrink = useCallback((id: string) => {
        setExpandedIds((ids) => ids.filter((itemId: string) => itemId !== id));
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Container maxWidth="800px">
            <Button
                ref={dialogTriggerRef}
                style={ButtonStyle.Default}
                emphasis={ButtonEmphasis.Strong}
                onClick={() => setIsOpen(!isOpen)}
            >
                Click me
            </Button>
            <InlineDialog
                anchor={dialogTriggerRef}
                open={isOpen}
                modality={Modality.NonModal}
                enablePortal={true}
                handleClose={() => setIsOpen(false)}
            >
                <DialogBody>
                    <TreeView
                        id={args.id}
                        {...cleanProps(args)}
                        expandedIds={expandedIds}
                        onExpand={handleItemExpand}
                        onShrink={handleItemShrink}
                    >
                        {treeItemsMock.map(renderTreeItemLabel)}
                    </TreeView>
                </DialogBody>
            </InlineDialog>
        </Container>
    );
};

const WithTreeItemsStyledContent: StoryFn<TreeProps & TreeItemStyling> = (args) => {
    return WithLabel(args);
};
export const WithTreeItemsStyled = WithTreeItemsStyledContent.bind({});
WithTreeItemsStyled.args = {
    id: 'storybook-tree',
    draggable: true,
    selectedIds: ['2'],
    dragHandlerPosition: 'left',
    showDragHandlerOnHoverOnly: true,
    showContentWhileDragging: true,
    spacingY: 'large',
    contentHight: 'content-fit',
    shadow: 'small',
    borderRadius: 'large',
    borderWidth: 'x-small',
    borderStyle: 'solid',
    activeColorStyle: 'soft',
};
