import { Button, ButtonSize, ButtonStyle } from '@components/Button/Button';
import { LINK_CLASSES } from '@components/RichTextEditor/components';
import { IconCheckMark, IconPen, IconTrashBin } from '@foundation/Icon';
import {
    floatingLinkActions,
    submitFloatingLink,
    useEditorRef,
    useFloatingLinkSelectors,
    useFloatingLinkUrlInput,
} from '@udecode/plate';
import React, { useState } from 'react';
import { FloatingLink } from './FloatingLink';

export const CustomFloatingLink = () => {
    const isEditing = useFloatingLinkSelectors().isEditing();
    const editor = useEditorRef();
    const [isUrlInValid, setIsUrlInValid] = useState(false);
    const urlHtmlProps = useFloatingLinkUrlInput({});

    const input = (
        <div data-test-id="floating-link-insert" className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px]">
            <FloatingLink.TextInput />
            <div className="tw-pt-5">
                <FloatingLink.UrlInput />
            </div>
            {isUrlInValid && <div className="tw-text-red-65 tw-mt-3">Url is invalid.</div>}

            <div className="tw-mt-3">
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
        <div data-test-id="floating-link-edit" className="tw-bg-white tw-rounded tw-shadow tw-p-4 tw-min-w-[400px]">
            <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between">
                <span className={`${LINK_CLASSES} tw-pointer-events-none`}>{urlHtmlProps.defaultValue}</span>
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
