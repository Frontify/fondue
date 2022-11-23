/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCaretDown from '@foundation/Icon/Generated/IconCaretDown';
import { IconSize } from '@foundation/Icon/IconSize';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import React, { FC, HTMLAttributes } from 'react';
import { IconCross, IconExclamationMarkTriangle, IconTrashBin } from '@foundation/Icon';

export enum TriggerSize {
    Small = 'Small',
    Large = 'Large',
}

export type TriggerProps = {
    disabled?: boolean;
    isOpen?: boolean;
    onClear?: () => void;
    onDelete?: () => void;
    buttonProps?: HTMLAttributes<HTMLElement>;
    isFocusVisible?: boolean;
    size?: TriggerSize;
    showClear?: boolean;
    validation?: Validation;
};

export const Trigger: FC<TriggerProps> = ({
    buttonProps,
    onClear,
    onDelete,
    children,
    disabled = false,
    isOpen = false,
    isFocusVisible = false,
    size = TriggerSize.Small,
    showClear = false,
    validation = Validation.Default,
}) => {
    const { focusProps: clearableFocusProps, isFocusVisible: isClearFocusVisible } = useFocusRing();
    const { focusProps: onDeleteFocusProps, isFocusVisible: isOnDeleteFocusVisible } = useFocusRing();

    const appropriateTriggerTWBorderClass = isOpen ? 'tw-border-line-xx-strong' : 'tw-border-line';

    return (
        <div
            data-test-id="trigger"
            className={merge([
                'tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-rounded tw-transition-colors tw-min-h-[36px]',
                isFocusVisible && FOCUS_STYLE,
                disabled
                    ? 'tw-border-black-5 tw-bg-black-5 tw-pointer-events-none'
                    : merge([
                          'tw-bg-base hover:tw-border-line-xx-strong',
                          appropriateTriggerTWBorderClass,
                          validationClassMap[validation],
                      ]),
            ])}
        >
            {children}
            <div
                className={merge([
                    'tw-flex-none tw-flex tw-items-center tw-absolute',
                    size === TriggerSize.Large ? 'tw-right-5 tw-gap-1.5' : 'tw-right-3 tw-gap-1',
                ])}
            >
                {showClear && (
                    <button
                        {...clearableFocusProps}
                        data-test-id="dropdown-clear-button"
                        aria-label="Clear selection"
                        type="button"
                        className={merge([
                            isClearFocusVisible && FOCUS_STYLE,
                            disabled ? 'tw-pointer-events-none tw-text-black-40' : 'tw-text-black-80',
                        ])}
                        onClick={() => !!onClear && onClear()}
                    >
                        <IconCross size={IconSize.Size12} />
                    </button>
                )}
                {!!onDelete && (
                    <button
                        {...onDeleteFocusProps}
                        data-test-id="dropdown-delete-button"
                        aria-label="Delete selection"
                        type="button"
                        className={merge([
                            isOnDeleteFocusVisible && FOCUS_STYLE,
                            disabled ? 'tw-pointer-events-none tw-text-black-40' : 'tw-text-black-80',
                        ])}
                        onClick={onDelete}
                    >
                        <IconTrashBin size={IconSize.Size12} />
                    </button>
                )}
                <button
                    {...buttonProps}
                    aria-hidden="true"
                    type="button"
                    className={merge([
                        disabled
                            ? 'tw-pointer-events-none tw-text-black-40'
                            : merge(['group-hover:tw-text-black', isOpen ? 'tw-text-black-100' : 'tw-text-black-80']),
                    ])}
                >
                    <div className={merge(['tw-transition-transform', isOpen && 'tw-rotate-180'])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
                {validation === Validation.Error && (
                    <span
                        className="tw-flex tw-items-center tw-justify-center tw-text-red-60"
                        data-test-id="error-state-exclamation-mark-icon"
                    >
                        <IconExclamationMarkTriangle />
                    </span>
                )}
            </div>
        </div>
    );
};
