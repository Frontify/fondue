/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { FormControl } from '@components/FormControl';
import { Modal } from '@components/Modal';
import { InternalLinkDocument, InternalLinkDocumentLoader } from '@components/RichTextEditor/Plugins/types';
import { TextInput } from '@components/TextInput';
import { Tree, TreeItem } from '@components/Tree';
import { IconCheckMark, IconLink } from '@foundation/Icon';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { FC, useEffect } from 'react';
import { InsertModalStateProps } from './types';

type Props = {
    state: InsertModalStateProps;
    onTextChange: (value: string) => void;
    onUrlChange: (value: string) => void;
    onToggleTab: (checked: boolean) => void;
    onCancel: () => void;
    onSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => void;
    hasValues: boolean;
    isValidUrlOrEmpty: () => boolean | undefined;
    loadInternalLinkDocument?: InternalLinkDocumentLoader;
    testId?: string;
    children?: React.ReactNode;
};

export const InsertModal: FC<Props> = ({
    state,
    onTextChange,
    onUrlChange,
    onToggleTab,
    onCancel,
    onSave,
    isValidUrlOrEmpty,
    loadInternalLinkDocument,
    hasValues,
    testId,
    children,
}) => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedUrl, setSelectedUrl] = React.useState<string>();
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
    const [internalLinkDocument, setInternalLinkDocument] = React.useState<InternalLinkDocument>();

    useEffect(() => {
        if (loadInternalLinkDocument) {
            loadInternalLinkDocument().then((document) => setInternalLinkDocument(document));
        }
    }, [loadInternalLinkDocument]);

    return (
        <div
            data-test-id={testId}
            className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px] tw-overflow-y-auto"
        >
            <FormControl
                label={{
                    children: 'Text',
                    htmlFor: 'linkText',
                    required: true,
                }}
            >
                <TextInput id="linkText" value={state.text} placeholder="Link Text" onChange={onTextChange} />
            </FormControl>

            {children}

            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'URL',
                        htmlFor: 'url',
                        required: true,
                    }}
                >
                    <TextInput
                        id="url"
                        value={state.url}
                        placeholder="https://example.com"
                        focusOnMount
                        onChange={onUrlChange}
                    />
                </FormControl>
                {!isValidUrlOrEmpty() && <div className="tw-text-red-65 tw-mt-3">Please enter a valid URL.</div>}
            </div>
            <div className="tw-pt-5">
                <Checkbox value="new-tab" label="Open in new tab" state={state.newTab} onChange={onToggleTab} />
            </div>
            {internalLinkDocument && (
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
                                    selectedIds={selectedUrl ? [selectedUrl] : []}
                                    onSelect={(url) => setSelectedUrl(url)}
                                    expandedIds={expandedIds}
                                    onExpand={(id, isExpanded) => {
                                        if (isExpanded) {
                                            setExpandedIds([...expandedIds, id]);
                                        } else {
                                            setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
                                        }
                                    }}
                                >
                                    {internalLinkDocument.categories.map((category, index) => (
                                        <TreeItem key={index} id={category.url} label={category.title}>
                                            {category.pages.map((page, index) => (
                                                <TreeItem key={index} id={page.url} label={page.title}>
                                                    {page.sections.map((section, index) => (
                                                        <TreeItem key={index} id={section.url} label={section.title} />
                                                    ))}
                                                </TreeItem>
                                            ))}
                                        </TreeItem>
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
                                        onUrlChange(selectedUrl ?? '');
                                        closeLinkTree();
                                    },
                                    style: ButtonStyle.Default,
                                    emphasis: ButtonEmphasis.Strong,
                                },
                            ]}
                        />
                    </Modal>
                </div>
            )}
            <div className="tw-mt-3">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={onCancel}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Default}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSave}
                        size={ButtonSize.Medium}
                        icon={<IconCheckMark />}
                        disabled={!isValidUrlOrEmpty() || !hasValues}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
