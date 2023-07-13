/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCross, IconExclamationMarkTriangle, IconTrashBin } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE, FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import React, { HTMLAttributes, ReactElement, ReactNode } from 'react';

export enum TriggerSize {
    Small = 'Small',
    Large = 'Large',
}

export enum TriggerEmphasis {
    Default = 'Default',
    Weak = 'Weak',
}

export type TriggerProps = {
    disabled?: boolean;
    children?: ReactNode;
    isOpen?: boolean;
    onClear?: () => void;
    onDelete?: () => void;
    buttonProps?: HTMLAttributes<HTMLElement>;
    isFocusVisible?: boolean;
    size?: TriggerSize;
    showClear?: boolean;
    validation?: Validation;
    emphasis?: TriggerEmphasis;
};

const getTriggerClassNames = (
    isFocusVisible: boolean,
    disabled: boolean,
    isOpen: boolean,
    emphasis: TriggerEmphasis,
    validation: Validation,
) =>
    merge([
        'tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-rounded tw-transition-colors tw-min-h-[36px]',
        isFocusVisible && FOCUS_STYLE,
        disabled
            ? 'tw-border-black-5 tw-bg-black-5 tw-pointer-events-none'
            : merge([
                  'hover:tw-border-line-xx-strong',
                  emphasis === TriggerEmphasis.Weak ? '' : 'tw-bg-base',
                  isOpen ? 'tw-border-line-xx-strong' : 'tw-border-line',
                  emphasis === TriggerEmphasis.Weak
                      ? 'tw-border-0 hover:tw-outline hover:tw-outline-1'
                      : validationClassMap[validation],
              ]),
    ]);

export const Trigger = ({
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
    emphasis = TriggerEmphasis.Default,
}: TriggerProps): ReactElement => {
    const { focusProps: clearableFocusProps, isFocusVisible: isClearFocusVisible } = useFocusRing();
    const { focusProps: onDeleteFocusProps, isFocusVisible: isOnDeleteFocusVisible } = useFocusRing();

    return (
        <div
            data-test-id="trigger"
            className={getTriggerClassNames(isFocusVisible, disabled, isOpen, emphasis, validation)}
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
                            'tw-rounded',
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
                    type="button"
                    tabIndex={-1}
                    disabled={disabled}
                    className={merge([
                        'tw-rounded',
                        disabled
                            ? 'tw-pointer-events-none tw-text-black-40'
                            : merge([
                                  'group-hover:tw-text-black ',
                                  isOpen ? 'tw-text-black-100' : 'tw-text-black-80',
                                  FOCUS_VISIBLE_STYLE,
                              ]),
                    ])}
                >
                    <div className={merge(['tw-transition-transform', isOpen && 'tw-rotate-180'])}>
                        <span aria-hidden={true}>
                            <IconCaretDown size={IconSize.Size16} />
                        </span>
                    </div>
                </button>
                {(validation === Validation.Error || validation === Validation.Warning) && (
                    <span
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center',
                            validation === Validation.Error && 'tw-text-text-negative',
                            validation === Validation.Warning && 'tw-text-text-warning',
                        ])}
                        data-test-id="error-state-exclamation-mark-icon"
                    >
                        <IconExclamationMarkTriangle />
                    </span>
                )}
            </div>
        </div>
    );
};
Trigger.displayName = 'FondueTrigger';
