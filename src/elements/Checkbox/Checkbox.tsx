/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TooltipProps } from "@components/Tooltip/Tooltip";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { InputLabel } from "@elements/InputLabel/InputLabel";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, useRef, useState } from "react";

export enum CheckboxState {
    Checked = "Checked",
    Unchecked = "Unchecked",
    Mixed = "Mixed",
}

export type CheckboxProps = {
    id?: string;
    state?: CheckboxState;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    note?: string;
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
};

export const Checkbox: FC<CheckboxProps> = (props) => {
    const id = useMemoizedId(props.id);
    const [isHovered, setIsHovered] = useState(false);
    const { state = CheckboxState.Unchecked, disabled, required, label, tooltip, note } = props;
    const toggleState = useToggleState({ ...props, isSelected: state === CheckboxState.Checked });
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckbox(
        {
            ...props,
            isSelected: state === CheckboxState.Checked,
            isIndeterminate: state === CheckboxState.Mixed,
            isDisabled: disabled,
            isRequired: required,
            "aria-label": label,
        },
        toggleState,
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div className="tw-flex tw-flex-col tw-gap-1 tw-transition-colors" data-test-id="checkbox">
            <label className="tw-flex tw-items-center tw-gap-2 tw-select-none">
                <input
                    {...mergeProps(inputProps, focusProps)}
                    id={id}
                    ref={ref}
                    className="tw-sr-only"
                    data-test-id="checkbox-input"
                />
                <span
                    aria-hidden="true"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={merge([
                        "tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border tw-flex-shrink-0",
                        isFocusVisible && FOCUS_STYLE,
                        disabled
                            ? merge([
                                  "tw-text-white tw-pointer-events-none",
                                  !isCheckedOrMixed(state) &&
                                      "tw-border-black-20 tw-bg-white dark:tw-border-black-80 dark:tw-bg-black-90",
                                  isCheckedOrMixed(state) &&
                                      "tw-border-black-40 tw-bg-black-40 dark:tw-border-black-60 dark:tw-bg-black-60",
                              ])
                            : merge([
                                  !isCheckedOrMixed(state) &&
                                      isHovered &&
                                      "tw-bg-white tw-border-black dark:tw-border-black-20 dark:tw-bg-black-90",
                                  !isCheckedOrMixed(state) &&
                                      !isHovered &&
                                      "tw-border-black-80 tw-bg-white hover:tw-border-black dark:tw-border-white dark:tw-bg-black dark:hover:tw-border-black-20 dark:hover:tw-bg-black-90",
                                  isCheckedOrMixed(state) &&
                                      isHovered &&
                                      "tw-text-white tw-border-violet-70 tw-bg-violet-70 dark:tw-border-violet-60 dark:tw-bg-violet-60",
                                  isCheckedOrMixed(state) &&
                                      !isHovered &&
                                      "tw-border-violet-60 tw-bg-violet-60 tw-text-white hover:tw-border-violet-70 hover:tw-bg-violet-70 dark:tw-border-violet-50 dark:tw-bg-violet-50 dark:hover:tw-border-violet-60 dark:hover:tw-bg-violet-60",
                                  "hover:tw-cursor-pointer",
                              ]),
                    ])}
                >
                    {state === CheckboxState.Checked && <IconCheck />}
                    {state === CheckboxState.Mixed && <IconMinus />}
                </span>
                {label && (
                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <InputLabel
                            disabled={disabled}
                            htmlFor={id}
                            tooltip={tooltip ?? undefined}
                            required={required}
                            bold={isCheckedOrMixed(state)}
                            isHovered={isHovered}
                        >
                            {label}
                        </InputLabel>
                    </div>
                )}
            </label>
            {note && <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">{note}</span>}
        </div>
    );
};
