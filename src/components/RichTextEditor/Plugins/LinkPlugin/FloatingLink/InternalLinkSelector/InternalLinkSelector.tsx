/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType } from '@components/Button';
import { Modal } from '@components/Modal';
import { InternalLinkNode, InternalLinkTree, InternalLinksLoader } from '@components/RichTextEditor/Plugins/types';
import { Tree, TreeItem } from '@components/Tree';
import { useTreeContext } from '@components/Tree/TreeContext';
import { IconLink } from '@foundation/Icon';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { merge } from '@utilities/merge';
import React, { ReactElement, useEffect } from 'react';
import { getExpandedIds, getLinkNodeByProp } from '../../utils';

type TreeLinkItemProps = {
    node: InternalLinkNode;
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

type InternalLinkItemProps = {
    node: InternalLinkNode;
    level?: number;
};

const InternalLinkItem = ({ node, level = 0 }: InternalLinkItemProps): ReactElement => {
    return (
        <TreeItem id={node.id} contentComponent={() => <TreeLinkItem node={node} />} level={level}>
            {node.subNodes?.map((subNode) => (
                <InternalLinkItem key={subNode.id} node={subNode} level={++level} />
            ))}
        </TreeItem>
    );
};

type InternalLinkSelectorProps = {
    url: string;
    loadInternalLinks: InternalLinksLoader;
    onUrlChange: (value: string) => void;
};

export const InternalLinkSelector = ({
    url,
    loadInternalLinks,
    onUrlChange,
}: InternalLinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
    const [internalLinkDocument, setInternalLinkDocument] = React.useState<InternalLinkTree>();

    useEffect(() => {
        if (!internalLinkDocument) {
            loadInternalLinks().then((internalLinks) => {
                setInternalLinkDocument(internalLinks);
                const linkNode = getLinkNodeByProp('url', url, internalLinks.nodes ?? []);
                setSelectedId(linkNode?.id ?? '');
                setExpandedIds(linkNode ? getExpandedIds(linkNode, internalLinks) : []);
            });
        }
    }, [internalLinkDocument, loadInternalLinks, url]);

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
                    <div className="internal-link-tree-container">
                        <Tree
                            id="internal-link-tree"
                            selectedIds={selectedId ? [selectedId] : []}
                            onSelect={(id) => (id === selectedId ? setSelectedId(null) : setSelectedId(id))}
                            expandedIds={expandedIds}
                            onExpand={(id, isExpanded) => {
                                if (isExpanded) {
                                    setExpandedIds([...expandedIds, id]);
                                } else {
                                    setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
                                }
                            }}
                        >
                            {internalLinkDocument &&
                                internalLinkDocument.nodes?.map((node) => (
                                    <InternalLinkItem key={node.id} node={node} />
                                ))}
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
                            onClick: () => {
                                if (!selectedId || !internalLinkDocument) {
                                    return;
                                }

                                onUrlChange(
                                    getLinkNodeByProp('id', selectedId, internalLinkDocument.nodes ?? [])?.url ?? '',
                                );
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
