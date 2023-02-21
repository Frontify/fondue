/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checkbox, CheckboxProps, CheckboxState } from '@components/Checkbox/Checkbox';
import { useCheckboxGroup, useCheckboxGroupItem } from '@react-aria/checkbox';
import { CheckboxGroupState, useCheckboxGroupState } from '@react-stately/checkbox';
import { merge } from '@utilities/merge';
import React, { useEffect, useRef, useState } from 'react';

export enum ChecklistDirection {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

export type Columns = 1 | 2 | 3 | 4;

const columnsStyle: Record<Columns, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-2',
    3: 'tw-grid-cols-3',
    4: 'tw-grid-cols-4',
};

export type CheckboxValue = Omit<CheckboxProps, 'onChange' | 'groupInputProps' | 'value'> & { value: string };

type ChecklistBase = {
    checkboxes: CheckboxValue[];
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
};

export type ChecklistProps = ChecklistVertical | ChecklistHorizontal;

type ChecklistItemProps = { checkbox: CheckboxValue; state: CheckboxGroupState };

const ChecklistItem = ({ checkbox, state }: ChecklistItemProps) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const { value, disabled, label, ariaLabel: checkboxAriaLabel, state: checkboxState } = checkbox;
    const [checkState, setCheckState] = useState(checkboxState);
    const isSelected = state.isSelected(value);
    const { inputProps } = useCheckboxGroupItem(
        { value, isDisabled: disabled, 'aria-label': checkboxAriaLabel || label },
        state,
        ref,
    );

    useEffect(() => {
        if (checkState === CheckboxState.Mixed && !isSelected) {
            setCheckState(CheckboxState.Mixed);
        } else {
            setCheckState(isSelected ? CheckboxState.Checked : CheckboxState.Unchecked);
        }
    }, [checkState, isSelected]);

    return <Checkbox {...checkbox} state={checkState} groupInputProps={inputProps} ref={ref} />;
};

const getLastItemColumnSpan = (items: CheckboxValue[], columns: number) => {
    if (!columns || columns <= 1) {
        return '';
    }

    const gridSpan = 'auto / span';
    const spanItems = items.length % columns;

    if (spanItems === 0) {
        return '';
    }

    return `${gridSpan} ${columns - spanItems + 1}`;
};

export const Checklist = ({
    checkboxes,
    setActiveValues,
    ariaLabel = 'Checklist',
    activeValues = [],
    direction = ChecklistDirection.Horizontal,
    ...props
}: ChecklistProps) => {
    const listContainerRef = useRef<HTMLUListElement | null>(null);
    const state = useCheckboxGroupState({
        value: activeValues,
        onChange: setActiveValues,
    });
    const { groupProps } = useCheckboxGroup(
        {
            'aria-label': ariaLabel,
        },
        state,
    );

    const columns = ('columns' in props && props.columns) || 1;

    return (
        <ul
            {...groupProps}
            data-test-id="checklist"
            className={merge([
                direction === ChecklistDirection.Horizontal
                    ? 'tw-flex tw-flex-row tw-gap-12'
                    : `tw-grid tw-gap-4 ${columnsStyle[columns]}`,
            ])}
            ref={listContainerRef}
        >
            {checkboxes.map((checkbox, index) => {
                return (
                    <li
                        key={checkbox.value}
                        style={{
                            maxWidth: listContainerRef?.current?.getBoundingClientRect().width,
                            gridColumn:
                                index === checkboxes.length - 1 && direction === ChecklistDirection.Vertical
                                    ? getLastItemColumnSpan(checkboxes, columns)
                                    : undefined,
                        }}
                    >
                        <ChecklistItem checkbox={checkbox} state={state} />
                    </li>
                );
            })}
        </ul>
    );
};
Checklist.displayName = 'FondueChecklist';
