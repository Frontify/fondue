import { useComboBox } from "@react-aria/combobox";
import { useFilter } from "@react-aria/i18n";
import { useComboBoxState } from "@react-stately/combobox";
import React, { FC, useRef } from "react";
import { ComboBoxProps } from "../types";
import { Popover } from "./Popover";
import { SearchInput } from "./SearchInput";
import { SearchResultsList } from "./SearchResultsList";

export const ComboBox: FC<ComboBoxProps> = (props) => {
    const { onClear, selectedKey } = props;

    const { contains } = useFilter({ sensitivity: "base" });
    const state = useComboBoxState({ ...props, menuTrigger: "focus", defaultFilter: contains });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const { inputProps, listBoxProps } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
        },
        state,
    );

    const handleSearchInputClick = () => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current?.focus();
        }

        if (!state.isOpen) {
            state.open("first", "manual");
            state.setFocused(true);
        }
    };

    return (
        <div className="tw-inline-flex tw-flex-col tw-w-full">
            <div className="tw-relative tw-inline-block">
                <SearchInput
                    ariaProps={inputProps}
                    ref={inputRef}
                    selectedKey={selectedKey || null}
                    onClick={handleSearchInputClick}
                    onClear={onClear}
                />

                {state.isOpen && (
                    <Popover popoverRef={popoverRef} isOpen={state.isOpen} onClose={state.close}>
                        <SearchResultsList {...listBoxProps} listBoxRef={listBoxRef} state={state} />
                    </Popover>
                )}
            </div>
        </div>
    );
};
