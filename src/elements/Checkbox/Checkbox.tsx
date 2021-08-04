/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useToggleState } from "@react-stately/toggle";
import { merge } from "@utilities/merge";
import { FC, useRef } from "react";

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
    style?: CheckboxStyle;
    checked?: CheckboxState;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    note?: string;
};

const styles = {
    unchecked: {
        [CheckboxStyle.Default]:
            "border-black-80 bg-white hover:border-black dark:border-white dark:bg-black dark:hover:border-black-20 dark:hover:bg-black-90",
        [CheckboxStyle.Primary]:
            "border-violet-60 bg-white hover:border-violet-70 dark:border-violet-50 dark:bg-black dark:hover:border-violet-60 dark:hover:bg-black-90",
    },
    checked: {
        [CheckboxStyle.Default]:
            "border-black bg-black text-white hover:border-black-superdark hover:bg-black-superdark dark:border-white dark:bg-white dark:hover:border-black-20 dark:hover:bg-black-20 dark:text-black",
        [CheckboxStyle.Primary]:
            "border-violet-60 bg-violet-60 text-white hover:border-violet-70 hover:bg-violet-70 dark:border-violet-50 dark:bg-violet-50 dark:hover:border-violet-60 dark:hover:bg-violet-60",
    },
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
};

export const Checkbox: FC<CheckboxProps> = (props) => {
    const { checked = CheckboxState.Unchecked, disabled, required, label, note, style = CheckboxStyle.Default } = props;
    const state = useToggleState({ ...props, isSelected: checked === CheckboxState.Checked });
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckbox(
        {
            ...props,
            isSelected: checked === CheckboxState.Checked,
            isIndeterminate: checked === CheckboxState.Mixed,
            isDisabled: disabled,
            isRequired: required,
            "aria-label": label,
        },
        state,
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div className="flex flex-col gap-1 transition-colors" data-test-id="checkbox">
            <label className="flex items-center gap-2">
                <input {...inputProps} {...focusProps} ref={ref} className="sr-only" />
                <span
                    aria-hidden="true"
                    className={merge([
                        "relative flex w-4 h-4 items-center justify-center rounded border",
                        isFocusVisible && "outline-violet",
                        disabled
                            ? merge([
                                  "text-white pointer-events-none",
                                  !isCheckedOrMixed(checked) &&
                                      "border-black-20 bg-white dark:border-black-80 dark:bg-black-90",
                                  isCheckedOrMixed(checked) &&
                                      "border-black-40 bg-black-40 dark:border-black-60 dark:bg-black-60",
                              ])
                            : merge([
                                  !isCheckedOrMixed(checked) && styles.unchecked[style],
                                  isCheckedOrMixed(checked) && styles.checked[style],
                              ]),
                    ])}
                >
                    {checked === CheckboxState.Checked && <IconCheck />}
                    {checked === CheckboxState.Mixed && <IconMinus />}
                </span>
                {label && (
                    <span
                        className={merge([disabled ? "text-black-40" : "text-black", "font-sans text-s font-medium"])}
                    >
                        {label}
                    </span>
                )}
            </label>
            {note && <span className="text-black-60 font-sans text-xs font-normal">{note}</span>}
        </div>
    );
};
