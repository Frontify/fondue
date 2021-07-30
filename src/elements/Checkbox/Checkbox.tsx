/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import InputLabel from "@elements/InputLabel/InputLabel";
import { Style } from "@utilities/enum";
import generateRandomId from "@utilities/generateRandomId";
import { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";

export enum CheckboxSelectionState {
    Unselected = "Unselected",
    Selected = "Selected",
    Indeterminate = "Indeterminate",
}

const unselectedStyleClasses: Record<Style.Primary | Style.Secondary, string> = {
    [Style.Primary]: "border-black-90 dark:border-white",
    [Style.Secondary]: "border-violet-60 dark:border-violet-50",
};
const selectedStyleClasses: Record<Style.Primary | Style.Secondary, string> = {
    [Style.Primary]: "bg-black-90 text-white dark:bg-white dark:text-black hover:bg-black dark:hover:bg-black-20",
    [Style.Secondary]: "bg-violet-60 text-white dark:bg-violet-50 hover:bg-violet-70 dark:hover:bg-violet-60",
};

export type CheckboxProps = {
    style?: Style.Primary | Style.Secondary;
    value?: CheckboxSelectionState;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    tooltip?: ReactNode;

    onChange?: (newValue: CheckboxSelectionState) => void;
};

export default function Checkbox({
    style = Style.Primary,
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
                        ? `cursor-not-allowed border-black-40 text-black-20 dark:border-black-60 dark:bg-black-60 dark:text-black-80
                            ${checkboxState === CheckboxSelectionState.Unselected ? "bg-transparent" : "bg-black-40"}`
                        : checkboxState === CheckboxSelectionState.Unselected
                        ? `hover:bg-black-5 dark:hover:bg-black-90 focus-visible:outline-violet ${unselectedStyleClasses[style]}`
                        : `focus-visible:outline-violet ${unselectedStyleClasses[style]} ${selectedStyleClasses[style]}`
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
