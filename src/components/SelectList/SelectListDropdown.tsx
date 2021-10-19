/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useListBox, useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import React, { FC, useRef } from "react";

export type SelectListDropdownProps = {
    state: ListState<any>;
    activeItemKeys: string[];
    ariaLabel?: string;
};

export type SelectListItem = {
    name: string;
};

export const SelectListDropdown: FC<SelectListDropdownProps> = (props) => {
    const { state, ariaLabel } = props;

    const ref = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox<SelectListItem>({ "aria-label": ariaLabel }, state, ref);

    return (
        <ul {...listBoxProps} ref={ref} className="tw-border-black-10 tw-rounded tw-shadow-mid tw-p-4 tw-space-y-4">
            {[...state.collection].map((item) => {
                const optionRef = useRef<HTMLLIElement | null>(null);
                const { optionProps, isSelected } = useOption(
                    { key: item.key, shouldFocusOnHover: false },
                    state,
                    optionRef,
                );

                return (
                    <li ref={optionRef} key={item.key} {...optionProps}>
                        <Checkbox
                            label={item.textValue}
                            state={isSelected ? CheckboxState.Checked : CheckboxState.Unchecked}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
