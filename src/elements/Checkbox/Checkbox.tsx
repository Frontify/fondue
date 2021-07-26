/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconCheck } from "@elements/Icon/Svg/Check.svg";
import { ReactComponent as IconMinus } from "@elements/Icon/Svg/Minus.svg";
import InputLabel from "@elements/InputLabel/InputLabel";
import { Variant } from "@utilities/enum";
import generateRandomId from "@utilities/generateRandomId";
import { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";

export enum CheckboxSelectionState {
    Unselected = "Unselected",
    Selected = "Selected",
    Indeterminate = "Indeterminate",
}

const unselectedVariantClasses: Record<Variant.Primary | Variant.Secondary, string> = {
    [Variant.Primary]: "border-black-90 dark:border-white",
    [Variant.Secondary]: "border-violet-60 dark:border-violet-50",
};
const selectedVariantClasses: Record<Variant.Primary | Variant.Secondary, string> = {
    [Variant.Primary]: "bg-black-90 text-white dark:bg-white dark:text-black hover:bg-black dark:hover:bg-black-20",
    [Variant.Secondary]: "bg-violet-60 text-white dark:bg-violet-50 hover:bg-violet-70 dark:hover:bg-violet-60",
};

export type CheckboxProps = {
    variant?: Variant.Primary | Variant.Secondary;
    value?: CheckboxSelectionState;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    tooltip?: ReactNode;

    onChange?: (newValue: CheckboxSelectionState) => void;
};

export default function Checkbox({
    variant = Variant.Primary,
    value: checkboxState = CheckboxSelectionState.Unselected,
    disabled = false,
    required = false,
    label,
    tooltip,
    onChange,
}: CheckboxProps): ReactElement<CheckboxProps> {
    const onClick = (event: MouseEvent | KeyboardEvent): void => {
        event.preventDefault();

        const newState =
            checkboxState === CheckboxSelectionState.Selected
                ? CheckboxSelectionState.Unselected
                : CheckboxSelectionState.Selected;

        onChange && onChange(newState);
    };

    const onKeyUp = (event: KeyboardEvent): void => {
        // `event.keyCode` for IE
        if (event.keyCode === 32 || event.code === "Space") {
            onClick(event);
        }
    };

    // Disable scrolling when pressing space
    const onKeyDown = (event: KeyboardEvent): void => {
        if (event.keyCode == 32 || event.code === "Space") {
            event.preventDefault();
        }
    };

    const checkboxConditionalAttributes = {
        ...(!disabled && {
            onClick,
            onKeyUp,
            onKeyDown,
        }),
    };

    const id = generateRandomId();

    return (
        <div className="flex" {...checkboxConditionalAttributes} data-test-id="checkbox-wrapper">
            <input
                id={id}
                className="hidden"
                type="checkbox"
                disabled={disabled}
                defaultChecked={checkboxState === CheckboxSelectionState.Selected}
                onClick={onClick}
            />
            <span
                className={`relative flex w-4 h-4 items-center justify-center rounded cursor-pointer transition-colors border ${
                    label ? "mr-2" : ""
                } ${
                    disabled
                        ? `cursor-not-allowed border-black-40 text-black-20 dark:border-black-60 dark:bg-black-60 dark:text-black-80 ${
                              checkboxState === CheckboxSelectionState.Unselected ? "bg-transparent" : "bg-black-40"
                          }`
                        : checkboxState === CheckboxSelectionState.Unselected
                        ? `hover:bg-black-5 dark:hover:bg-black-90 focus-visible:outline-violet ${unselectedVariantClasses[variant]}`
                        : `focus-visible:outline-violet ${unselectedVariantClasses[variant]} ${selectedVariantClasses[variant]}`
                }`}
                tabIndex={disabled ? -1 : 0}
                data-test-id="checkbox"
                aria-disabled={disabled}
                aria-checked={
                    checkboxState === CheckboxSelectionState.Indeterminate
                        ? "mixed"
                        : checkboxState === CheckboxSelectionState.Selected
                }
            >
                {checkboxState === CheckboxSelectionState.Selected && <IconCheck />}
                {checkboxState === CheckboxSelectionState.Indeterminate && <IconMinus />}
            </span>
            {label && (
                <InputLabel htmlFor={id} required={required} disabled={disabled} tooltip={tooltip}>
                    {label}
                </InputLabel>
            )}
        </div>
    );
}
