/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef } from "react";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { InputLabel } from "@elements/InputLabel/InputLabel";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useToggleState } from "@react-stately/toggle";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";

export enum CheckboxStyle {
    Default = "Default",
    Primary = "Primary",
}

export enum CheckboxState {
    Checked = "Checked",
    Unchecked = "Unchecked",
    Mixed = "Mixed",
}

export type CheckboxProps = {
    id?: string;
    style?: CheckboxStyle;
    state?: CheckboxState;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    tooltip?: string;
    note?: string;
};

const styles = {
    unchecked: {
        [CheckboxStyle.Default]:
            "tw-border-black-80 tw-bg-white hover:tw-border-black dark:tw-border-white dark:tw-bg-black dark:hover:tw-border-black-20 dark:hover:tw-bg-black-90",
        [CheckboxStyle.Primary]:
            "tw-border-violet-60 tw-bg-white hover:tw-border-violet-70 dark:tw-border-violet-50 dark:tw-bg-black dark:hover:tw-border-violet-60 dark:hover:tw-bg-black-90",
    },
    checked: {
        [CheckboxStyle.Default]:
            "tw-border-black tw-bg-black tw-text-white hover:tw-border-black-superdark hover:tw-bg-black-superdark dark:tw-border-white dark:tw-bg-white dark:hover:tw-border-black-20 dark:hover:tw-bg-black-20 dark:tw-text-black",
        [CheckboxStyle.Primary]:
            "tw-border-violet-60 tw-bg-violet-60 tw-text-white hover:tw-border-violet-70 hover:tw-bg-violet-70 dark:tw-border-violet-50 dark:tw-bg-violet-50 dark:hover:tw-border-violet-60 dark:hover:tw-bg-violet-60",
    },
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
};

export const Checkbox: FC<CheckboxProps> = (props) => {
    const id = props.id || generateRandomId();
    const {
        state = CheckboxState.Unchecked,
        disabled,
        required,
        label,
        tooltip,
        note,
        style = CheckboxStyle.Default,
    } = props;
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
                <input {...inputProps} {...focusProps} id={id} ref={ref} className="tw-sr-only" />
                <span
                    aria-hidden="true"
                    className={merge([
                        "tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border",

                        isFocusVisible && "tw-outline-violet",
                        disabled
                            ? merge([
                                  "tw-text-white tw-pointer-events-none",
                                  !isCheckedOrMixed(state) &&
                                      "tw-border-black-20 tw-bg-white dark:tw-border-black-80 dark:tw-bg-black-90",
                                  isCheckedOrMixed(state) &&
                                      "tw-border-black-40 tw-bg-black-40 dark:tw-border-black-60 dark:tw-bg-black-60",
                              ])
                            : merge([
                                  !isCheckedOrMixed(state) && styles.unchecked[style],
                                  isCheckedOrMixed(state) && styles.checked[style],
                                  "hover:tw-cursor-pointer",
                              ]),
                    ])}
                >
                    {state === CheckboxState.Checked && <IconCheck />}
                    {state === CheckboxState.Mixed && <IconMinus />}
                </span>
                {label && (
                    <InputLabel
                        disabled={disabled}
                        htmlFor={id}
                        tooltip={tooltip}
                        required={required}
                        bold={isCheckedOrMixed(state)}
                    >
                        {label}
                    </InputLabel>
                )}
            </label>
            {note && <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">{note}</span>}
        </div>
    );
};
