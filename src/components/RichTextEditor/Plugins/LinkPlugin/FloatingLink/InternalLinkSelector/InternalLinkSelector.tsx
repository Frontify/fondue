/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType } from '@components/Button';
import { Modal } from '@components/Modal';
import { InternalLinkNode, InternalLinksLoader } from '@components/RichTextEditor/Plugins/types';
import { Tree, TreeItem } from '@components/Tree';
import { IconLink } from '@foundation/Icon';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement, useEffect } from 'react';
import { getExpandedIds, getLinkNodeByProp } from '../../utils';

type InternalLinkSelectorProps = {
    url: string;
    loadInternalLinks: InternalLinksLoader;
    onUrlChange: (value: string) => void;
};

type InternalLinkItemProps = {
    node: InternalLinkNode;
    level?: number;
};

const InternalLinkItem = ({ node, level = 0 }: InternalLinkItemProps): ReactElement => {
    return (
        <TreeItem id={node.id} label={node.title} level={level}>
            {node.subNodes?.map((subNode) => (
                <InternalLinkItem key={subNode.id} node={subNode} level={++level} />
            ))}
        </TreeItem>
    );
};

export const InternalLinkSelector = ({
    url,
    loadInternalLinks,
    onUrlChange,
}: InternalLinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
    const [internalLinkDocument, setInternalLinkDocument] = React.useState<InternalLinkNode>();

    useEffect(() => {
        if (!internalLinkDocument) {
            loadInternalLinks().then((document) => {
                setInternalLinkDocument(document);
                const linkNode = getLinkNodeByProp('url', url, document);
                setSelectedId(linkNode?.id ?? '');
                setExpandedIds(linkNode ? getExpandedIds(linkNode, document) : []);
            });
        }
    }, [internalLinkDocument, loadInternalLinks, url]);

    return (
        <div className="tw-pt-5">
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
                            onSelect={(id) => setSelectedId(id)}
                            expandedIds={expandedIds}
                            onExpand={(id, isExpanded) => {
                                if (isExpanded) {
                                    setExpandedIds([...expandedIds, id]);
                                } else {
                                    setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
                                }
                            }}
                        >
                            {internalLinkDocument ? <InternalLinkItem node={internalLinkDocument} /> : 'No links found'}
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

                                onUrlChange(getLinkNodeByProp('id', selectedId, internalLinkDocument)?.url ?? '');
                                closeLinkTree();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            disabled: !selectedId,
                        },
                    ]}
                />
            </Modal>
        </div>
    );
};
