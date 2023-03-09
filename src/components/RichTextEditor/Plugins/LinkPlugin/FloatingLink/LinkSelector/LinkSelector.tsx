/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType } from '@components/Button';
import { Modal } from '@components/Modal';
import { LinkLoader, LinkNode, LinkTree } from '@components/RichTextEditor/Plugins/types';
import { Tree, TreeItem } from '@components/Tree';
import { useTreeContext } from '@components/Tree/TreeContext';
import { IconLink } from '@foundation/Icon';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { merge } from '@utilities/merge';
import React, { ReactElement, useEffect } from 'react';
import { getExpandedIds, getLinkNodeByProp } from '../../utils';

type TreeLinkItemProps = {
    node: LinkNode;
};

const TreeLinkItem = ({ node: { id, title, icon } }: TreeLinkItemProps): ReactElement => {
    const { treeState } = useTreeContext();
    const isActive = treeState.selectedIds.has(id);

    return (
        <div className="tw-flex tw-flex-auto tw-space-x-2">
            <span className="tw-ml-1">{icon}</span>
            <span className="tw-text-s">{title}</span>
            <span
                className={merge([
                    'tw-flex-auto tw-font-sans tw-text-xs tw-text-right',
                    !isActive && 'tw-text-text-weak',
                    isActive && 'tw-text-text-white',
                ])}
            >
                {title}
            </span>
        </div>
    );
};

type LinkItemProps = {
    node: LinkNode;
    level?: number;
};

const LinkItem = ({ node, level = 0 }: LinkItemProps): ReactElement => {
    return (
        <TreeItem id={node.id} contentComponent={() => <TreeLinkItem node={node} />} level={level}>
            {node.subNodes?.map((subNode) => (
                <LinkItem key={subNode.id} node={subNode} level={++level} />
            ))}
        </TreeItem>
    );
};

type LinkSelectorProps = {
    url: string;
    loadLinkTree: LinkLoader;
    onUrlChange: (value: string) => void;
};

export const LinkSelector = ({ url, loadLinkTree: loadLinkTree, onUrlChange }: LinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
    const [linkTree, setLinkTree] = React.useState<LinkTree>();

    useEffect(() => {
        if (!linkTree) {
            loadLinkTree().then((linkTree) => {
                setLinkTree(linkTree);
                const linkNode = getLinkNodeByProp('url', url, linkTree.nodes ?? []);
                setSelectedId(linkNode?.id ?? '');
                setExpandedIds(linkNode ? getExpandedIds(linkNode, linkTree) : []);
            });
        }
    }, [linkTree, loadLinkTree, url]);

    return (
        <>
            <Button
                icon={<IconLink />}
                size={ButtonSize.Medium}
                type={ButtonType.Button}
                style={ButtonStyle.Default}
                emphasis={ButtonEmphasis.Default}
                onClick={() => openLinkTree()}
            >
                Internal link
            </Button>
            <Modal onClose={() => closeLinkTree()} isOpen={isLinkTreeOpen}>
                <Modal.Header title="Select internal link" />
                <Modal.Body>
                    <div className="link-tree-container">
                        <Tree
                            id="link-tree"
                            selectedIds={selectedId ? [selectedId] : []}
                            onSelect={(id) => (id === selectedId ? setSelectedId(null) : setSelectedId(id))}
                            expandedIds={expandedIds}
                            onExpand={(id, isExpanded) => {
                                const linkNode = getLinkNodeByProp('id', id, linkTree?.nodes ?? []);

                                if (!linkNode || !linkTree) {
                                    return;
                                }

                                setExpandedIds(isExpanded ? getExpandedIds(linkNode, linkTree) : []);
                            }}
                        >
                            {linkTree && linkTree.nodes?.map((node) => <LinkItem key={node.id} node={node} />)}
                        </Tree>
                    </div>
                </Modal.Body>
                <Modal.Footer
                    buttons={[
                        {
                            children: 'Cancel',
                            onClick: () => closeLinkTree(),
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Default,
                        },
                        {
                            children: 'Confirm',
                            onClick: (event) => {
                                event?.preventDefault();
                                if (!selectedId || !linkTree) {
                                    return;
                                }

                                onUrlChange(getLinkNodeByProp('id', selectedId, linkTree.nodes ?? [])?.url ?? '');
                                closeLinkTree();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            disabled: !selectedId,
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
