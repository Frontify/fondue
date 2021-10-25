/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxProps, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { useCheckboxGroupState } from "@react-stately/checkbox";
import { merge } from "@utilities/merge";
import React, { FC, useEffect, useRef, useState } from "react";

export enum ChecklistDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type Columns = 1 | 2 | 3 | 4;

const columnsStyle: Record<Columns, string> = {
    1: "tw-grid-cols-1",
    2: "tw-grid-cols-2",
    3: "tw-grid-cols-3",
    4: "tw-grid-cols-4",
};

type ChecklistBase = {
    checkboxes: Omit<CheckboxProps, "onChange" | "groupInputProps">[];
    setActiveValues: (value: string[]) => void;
    activeValues?: string[];
    ariaLabel?: string;
};

type ChecklistVertical = ChecklistBase & {
    direction: ChecklistDirection.Vertical;
    columns?: Columns;
};

type ChecklistHorizontal = ChecklistBase & {
    direction: ChecklistDirection.Horizontal;
    columns?: null;
};

export type ChecklistProps = ChecklistVertical | ChecklistHorizontal;

export const Checklist: FC<ChecklistProps> = ({
    checkboxes,
    setActiveValues,
    ariaLabel = "Checklist",
    activeValues = [],
    direction = ChecklistDirection.Horizontal,
    columns = 1,
}) => {
    const state = useCheckboxGroupState({
        value: activeValues,
        onChange: setActiveValues,
    });
    const { groupProps } = useCheckboxGroup(
        {
            "aria-label": ariaLabel,
        },
        state,
    );

    return (
        <ul
            {...groupProps}
            data-test-id="checklist"
            className={merge([
                direction === ChecklistDirection.Horizontal
                    ? "tw-flex tw-flex-row tw-gap-12"
                    : `tw-grid tw-gap-4 ${columns && columnsStyle[columns]}`,
            ])}
        >
            {checkboxes.map((checkbox) => {
                const { value, disabled, label, ariaLabel: checkboxAriaLabel, state: checkboxState } = checkbox;
                const ref = useRef<HTMLInputElement | null>(null);
                const [checkState, setCheckState] = useState(checkboxState);
                const isSelected = state.isSelected(value);
                const { inputProps } = useCheckboxGroupItem(
                    { value, isDisabled: disabled, "aria-label": checkboxAriaLabel || label },
                    state,
                    ref,
                );

                useEffect(() => {
                    if (checkState === CheckboxState.Mixed && !isSelected) {
                        setCheckState(CheckboxState.Mixed);
                    } else {
                        setCheckState(isSelected ? CheckboxState.Checked : CheckboxState.Unchecked);
                    }
                }, [isSelected]);

                return (
                    <li key={value}>
                        <Checkbox {...checkbox} state={checkState} groupInputProps={inputProps} ref={ref} />
                    </li>
                );
            })}
        </ul>
    );
};
