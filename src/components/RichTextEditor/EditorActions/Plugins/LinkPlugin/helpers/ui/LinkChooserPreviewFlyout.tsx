/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@components/Flyout';
import { LINK_CLASSES } from '@components/RichTextEditor/components/link';
import { IconPen, IconTrashBin } from '@foundation/Icon';
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

const buttonClassName = 'tw-transition tw-cursor-pointer tw-rounded hover:tw-bg-black-10 tw-p-1';

export const LinkChooserPreviewFlyout = ({
    isFlyoutOpen,
    setIsFlyoutOpen,
    trigger,
    href,
    onEditClick,
    onRemoveClick,
}: LinkChooserFlyoutProps) => (
    <Flyout
        isOpen={isFlyoutOpen}
        onOpenChange={setIsFlyoutOpen}
        onCancel={() => setIsFlyoutOpen(false)}
        legacyFooter={false}
        trigger={trigger}
    >
        <span data-test-id={'preview-link-flyout'} className="tw-flex tw-justify-between tw-p-4">
            <span className={`${LINK_CLASSES} tw-pointer-events-none`}>{href}</span>
            <span className="tw-flex tw-gap-2">
                <span
                    role="button"
                    tabIndex={0}
                    data-test-id={'edit-link-button'}
                    className={buttonClassName}
                    onMouseDown={() => onEditClick()}
                >
                    <IconPen />
                </span>

                <span
                    role="button"
                    tabIndex={0}
                    data-test-id={'remove-link-button'}
                    className={buttonClassName}
                    onMouseDown={() => onRemoveClick()}
                >
                    <IconTrashBin />
                </span>
            </span>
        </span>
    </Flyout>
);
