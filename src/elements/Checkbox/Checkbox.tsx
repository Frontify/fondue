/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconMinus from "@elements/Icon/Generated/IconMinus";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useToggleState } from "@react-stately/toggle";
import { merge } from "@utilities/merge";
import { FC, PropsWithChildren, useRef } from "react";

export enum Style {
    Default = "Default",
    Primary = "Primary",
}

export type CheckboxProps = PropsWithChildren<{
    style?: Style;
    checked?: "checked" | "unchecked" | "mixed";
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (isChecked: boolean) => void;
}>;

const styles = {
    unchecked: {
        [Style.Default]:
            "border-black-80 bg-white hover:border-black dark:border-white dark:bg-black dark:hover:border-black-20 dark:hover:bg-black-90",
        [Style.Primary]:
            "border-violet-60 bg-white hover:border-violet-70 dark:border-violet-50 dark:bg-black dark:hover:border-violet-60 dark:hover:bg-black-90",
    },
    checked: {
        [Style.Default]:
            "border-black bg-black text-white hover:border-black-superdark hover:bg-black-superdark dark:border-white dark:bg-white dark:hover:border-black-20 dark:hover:bg-black-20 dark:text-black",
        [Style.Primary]:
            "border-violet-60 bg-violet-60 text-white hover:border-violet-70 hover:bg-violet-70 dark:border-violet-50 dark:bg-violet-50 dark:hover:border-violet-60 dark:hover:bg-violet-60",
    },
};

type CheckedOrMixed = CheckboxProps["checked"];

const isCheckedOrMixed = (checked: CheckedOrMixed): boolean => {
    return checked === "checked" || checked === "mixed";
};

export const Checkbox: FC<CheckboxProps> = (props) => {
    const { checked = "unchecked", children, disabled, required, style = Style.Default } = props;
    const state = useToggleState({ ...props, isSelected: checked === "checked" });
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useCheckbox(
        {
            ...props,
            isSelected: checked === "checked",
            isIndeterminate: checked === "mixed",
            isDisabled: disabled,
            isRequired: required,
        },
        state,
        ref,
    );
    const { /*isFocusVisible,*/ focusProps } = useFocusRing();

    return (
        <label data-test-id="checkbox">
            <input {...inputProps} {...focusProps} ref={ref} className="sr-only" />
            <span
                aria-hidden="true"
                className={merge([
                    "relative flex w-4 h-4 items-center justify-center rounded transition-colors border",
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
                {checked === "checked" && <IconCheck />}
                {checked === "mixed" && <IconMinus />}
            </span>
            {children}
        </label>
    );
};

// export default function Checkbox({
//     style = Style.Primary,
//     value: checkboxState = CheckboxSelectionState.Unselected,
//     disabled = false,
//     required = false,
//     label,
//     tooltip,
//     onChange,
// }: CheckboxProps): ReactElement<CheckboxProps> {

//     const id = generateRandomId();

//     return (
//         <div className="flex" {...checkboxConditionalAttributes} data-test-id="checkbox-wrapper">
//             <input
//                 id={id}
//                 className="hidden"
//                 type="checkbox"
//                 disabled={disabled}
//                 defaultChecked={checkboxState === CheckboxSelectionState.Selected}
//                 onClick={onClick}
//             />
//             <span
//                 className={`relative flex w-4 h-4 items-center justify-center rounded cursor-pointer transition-colors border ${
//                     label ? "mr-2" : ""
//                 } ${
//                     disabled
//                         ? `cursor-not-allowed border-black-40 text-black-20 dark:border-black-60 dark:bg-black-60 dark:text-black-80
//                             ${checkboxState === CheckboxSelectionState.Unselected ? "bg-transparent" : "bg-black-40"}`
//                         : checkboxState === CheckboxSelectionState.Unselected
//                         ? `hover:bg-black-5 dark:hover:bg-black-90 focus-visible:outline-violet ${unselectedStyleClasses[style]}`
//                         : `focus-visible:outline-violet ${unselectedStyleClasses[style]} ${selectedStyleClasses[style]}`
//                 }`}
//                 tabIndex={disabled ? -1 : 0}
//                 data-test-id="checkbox"
//                 aria-disabled={disabled}
//                 aria-checked={
//                     checkboxState === CheckboxSelectionState.Indeterminate
//                         ? "mixed"
//                         : checkboxState === CheckboxSelectionState.Selected
//                 }
//             >
//                 {checkboxState === CheckboxSelectionState.Selected && <IconCheck />}
//                 {checkboxState === CheckboxSelectionState.Indeterminate && <IconMinus />}
//             </span>
//             {label && (
//                 <InputLabel htmlFor={id} required={required} disabled={disabled} tooltip={tooltip}>
//                     {label}
//                 </InputLabel>
//             )}
//         </div>
//     );
// }
