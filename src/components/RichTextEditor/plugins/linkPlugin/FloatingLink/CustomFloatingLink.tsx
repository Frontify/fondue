import { Button, ButtonSize, ButtonStyle } from '@components/Button/Button';
import { LINK_CLASSES } from '@components/RichTextEditor/components';
import { IconCheckMark, IconPen, IconTrashBin } from '@foundation/Icon';
import {
    ELEMENT_LINK,
    findNode,
    floatingLinkActions,
    getPluginType,
    PlateEditor,
    submitFloatingLink,
    TLinkElement,
    useEditorRef,
    useFloatingLinkSelectors,
    Value,
} from '@udecode/plate';
import React, { useState } from 'react';
import { FloatingLink } from './FloatingLink';

const getUrlFromEditor = (editor: PlateEditor<Value>) => {
    const entry = findNode<TLinkElement>(editor, {
        match: { type: getPluginType(editor, ELEMENT_LINK) },
    });
    if (!entry) return;

    const [link] = entry;

    return link.url;
};

export const CustomFloatingLink = () => {
    const isEditing = useFloatingLinkSelectors().isEditing();
    const editor = useEditorRef();
    const [isUrlInValid, setIsUrlInValid] = useState(false);

    const input = (
        <div className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px]">
            <FloatingLink.TextInput />
            <div className="tw-pt-5">
                <FloatingLink.UrlInput />
            </div>
            {isUrlInValid && <span>URL is invalid</span>}

            <div className="tw-mt-8">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={(e) => {
                            setIsUrlInValid(false);
                            floatingLinkActions.hide();
                        }}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Secondary}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => {
                            if (submitFloatingLink(editor)) {
                                e?.preventDefault();

                                setIsUrlInValid(false);
                            } else {
                                setIsUrlInValid(true);
                            }
                        }}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Primary}
                        icon={<IconCheckMark />}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
    const editContent = !isEditing ? (
        <div className="tw-bg-white tw-rounded tw-shadow tw-p-4 tw-min-w-[400px]">
            <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between">
                <span className={`${LINK_CLASSES} tw-pointer-events-none`}>{getUrlFromEditor(editor)}</span>
                <span className="tw-flex tw-gap-2">
                    <span
                        role="button"
                        tabIndex={0}
                        data-test-id={'edit-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                    >
                        <FloatingLink.EditButton>
                            <IconPen />
                        </FloatingLink.EditButton>
                    </span>

                    <span
                        role="button"
                        tabIndex={0}
                        data-test-id={'remove-link-button'}
                        className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                    >
                        <FloatingLink.UnlinkButton>
                            <IconTrashBin />
                        </FloatingLink.UnlinkButton>
                    </span>
                </span>
            </span>
        </div>
    ) : (
        input
    );

    return (
        <>
            <FloatingLink.InsertRoot>{input}</FloatingLink.InsertRoot>

            <FloatingLink.EditRoot>{editContent}</FloatingLink.EditRoot>
        </>
    );
};
