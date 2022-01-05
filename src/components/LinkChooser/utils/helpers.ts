/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mergeProps } from "@react-aria/utils";
import { FocusEvent, HTMLAttributes, KeyboardEvent, MutableRefObject } from "react";
import { ComboBoxState } from "@react-stately/combobox";

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase());

type ManualComboBoxEventProps = {
    inputProps: HTMLAttributes<HTMLInputElement>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    popoverRef: MutableRefObject<HTMLDivElement | null>;
    state: ComboBoxState<object>;
};

type ManualComboBoxEvents = {
    onOpen: () => void;
    onClose: () => void;
};

export const useManualComboBoxEventHandlers = (
    { inputProps, inputRef, popoverRef, state }: ManualComboBoxEventProps,
    { onOpen, onClose }: ManualComboBoxEvents,
) =>
    mergeProps(inputProps, {
        onClick: onOpen,
        onPointerUp: onOpen,
        onBlur: (event: FocusEvent<HTMLInputElement, HTMLElement>) => {
            if (
                popoverRef.current?.contains(event.relatedTarget as HTMLElement) ||
                event?.relatedTarget?.dataset.comboBoxControl === "true"
            ) {
                inputRef.current?.focus();
                return;
            }
            onClose();
        },
        onFocus: onOpen,
        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            const NAVIGATION_KEYS = ["ArrowRight", "ArrowLeft", "Enter", "Tab"];
            const { key } = event;
            if (!state.isOpen && !NAVIGATION_KEYS.includes(key)) {
                onOpen();
            } else if (state.isOpen && key === "Enter") {
                onClose();
            }
        },
    });
