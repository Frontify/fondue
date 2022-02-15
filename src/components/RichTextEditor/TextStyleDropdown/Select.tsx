import { IconCaretDown } from "@foundation/Icon";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { mergeProps } from "@react-aria/utils";
import { useSelectState } from "@react-stately/select";
import type { AriaSelectProps } from "@react-types/select";
import { merge } from "@utilities/merge";
import React, { useRef } from "react";
import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export function Select<T extends object>(props: AriaSelectProps<T>) {
    const state = useSelectState(props);

    const ref = useRef(null);
    const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

    const { buttonProps } = useButton(triggerProps, ref);

    const { focusProps, isFocusVisible } = useFocusRing();

    const { label, name, placeholder } = props;
    const { isOpen, selectedItem } = state;

    return (
        <div className="tw-w-50">
            <div {...labelProps} className="tw-text-black-50 tw-cursor-default">
                {label}
            </div>
            <HiddenSelect state={state} triggerRef={ref} label={label} name={name} />
            <button
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                className={`tw-p-2 tw-pl-3 tw-py-1 tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-rounded tw-overflow-hidden tw-w-32 tw-cursor-default tw-shadow-sm tw-border tw-outline-none hover:tw-border-black-100 ${
                    isFocusVisible ? "tw-border-black-50" : "tw-border-black-30"
                } `}
                data-test-id="text-select-dropdown"
            >
                <span
                    {...valueProps}
                    className={`tw-text-md ${selectedItem ? "tw-text-black-100" : "tw-text-black-70"}`}
                >
                    {selectedItem ? selectedItem.textValue : placeholder}
                </span>
                <div className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                    <IconCaretDown />
                </div>
            </button>
            {isOpen && (
                <Popover isOpen={isOpen} onClose={state.close}>
                    <ListBox {...menuProps} state={state} />
                </Popover>
            )}
        </div>
    );
}
