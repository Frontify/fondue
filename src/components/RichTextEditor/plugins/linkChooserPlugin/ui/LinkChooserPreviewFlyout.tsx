import { Flyout } from '@components/Flyout';
import { LINK_CHOOSER_CLASS_NAMES } from '@components/RichTextEditor/components/chosen-link';
import { IconPen, IconTrash } from '@foundation/Icon';
import React, { HTMLAttributes, MutableRefObject, ReactNode } from 'react';

type LinkChooserFlyoutProps = {
    isFlyoutOpen: boolean;
    setIsFlyoutOpen: (open: boolean) => void;
    href: string;
    onEditClick: () => void;
    onRemoveClick: () => void;
    trigger:
        | ReactNode
        | ((
              triggerProps: HTMLAttributes<HTMLElement>,
              ref: MutableRefObject<HTMLElement | null>,
              triggerState: { isFocusVisible: boolean; isPressed: boolean },
          ) => JSX.Element);
};

export const LinkChooserPreviewFlyout = ({
    isFlyoutOpen,
    setIsFlyoutOpen,
    trigger,
    href,
    onEditClick,
    onRemoveClick,
}: LinkChooserFlyoutProps) => {
    return (
        <>
            <Flyout
                isOpen={isFlyoutOpen}
                onOpenChange={setIsFlyoutOpen}
                onCancel={() => setIsFlyoutOpen(false)}
                legacyFooter={false}
                trigger={trigger}
            >
                <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between tw-p-4">
                    <span className={`${LINK_CHOOSER_CLASS_NAMES} tw-pointer-events-none`}>{href}</span>
                    <span className="tw-flex tw-gap-2">
                        <span
                            role="button"
                            tabIndex={0}
                            data-test-id={'edit-link-button'}
                            className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                            onMouseDown={() => onEditClick()}
                        >
                            <IconPen />
                        </span>

                        <span
                            role="button"
                            tabIndex={0}
                            data-test-id={'remove-link-button'}
                            className="tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1"
                            onMouseDown={() => onRemoveClick()}
                        >
                            <IconTrash />
                        </span>
                    </span>
                </span>
            </Flyout>
        </>
    );
};
