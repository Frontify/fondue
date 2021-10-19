/* (c) Copyright Frontify Ltd., all rights reserved. */

/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useListBox, useOption } from "@react-aria/listbox";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { ListState } from "@react-stately/list";
import { mergeProps } from "@react-aria/utils";
import React, { FC, useRef } from "react";

export type SelectListProps = {
    state: ListState<any>;
    ariaLabel?: string;
};

export type SelectListItem = {
    name: string;
};

export const SelectList: FC<SelectListProps> = ({ state, ariaLabel }) => {
    const ref = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox<SelectListItem>({ "aria-label": ariaLabel }, state, ref);

    return (
        <ul {...listBoxProps} ref={ref} className="tw-border-black-10 tw-rounded tw-shadow-mid tw-p-4 tw-space-y-4">
            {[...state.collection].map(({ key }) => {
                const optionRef = useRef<HTMLLIElement | null>(null);
                const { optionProps, isSelected } = useOption({ key, shouldFocusOnHover: false }, state, optionRef);
                const { isFocusVisible, focusProps } = useFocusRing();
                return (
                    <li
                        key={key}
                        ref={optionRef}
                        {...mergeProps(optionProps, focusProps)}
                        className={isFocusVisible ? FOCUS_STYLE : ""}
                    >
                        <Checkbox
                            label={key.toString()}
                            state={isSelected ? CheckboxState.Checked : CheckboxState.Unchecked}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
