/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox/Checkbox';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Checklist as ChecklistComponent, ChecklistDirection, ChecklistProps } from './Checklist';

export default {
    title: 'Components/Checklist',
    component: ChecklistComponent,
    tags: ['autodocs'],
    argTypes: {
        columns: {
            options: [1, 2, 3, 4],
            control: { type: 'select' },
            if: { arg: 'direction', eq: ChecklistDirection.Vertical },
        },
        direction: {
            options: [ChecklistDirection.Horizontal, ChecklistDirection.Vertical],
            control: { type: 'radio' },
        },
    },
} as Meta<ChecklistProps>;

const CHECKBOXES = [
    {
        value: 'box-1',
        label: 'Checkbox label',
        tooltip: { content: 'Random Tooltip' },
    },
    {
        value: 'box-2',
        label: 'Checkbox label',
        note: 'Note about this input',
        disabled: true,
    },
    {
        value: 'box-3',
        label: 'Checkbox label',
        state: CheckboxState.Mixed,
    },
];

const COLUMN_CHECKBOXES = Array.from({ length: 8 })
    .fill({})
    .map((_, index) => ({
        value: `box-${index}`,
        label: `Checkbox Nr. ${index}`,
        tooltip: { content: `Random Tooltip ${index}` },
    }));

export const Checklist: StoryFn<ChecklistProps> = (args: ChecklistProps) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <ChecklistComponent
            {...args}
            checkboxes={CHECKBOXES}
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
        />
    );
};

export const MultipleColumns = (args: ChecklistProps) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <ChecklistComponent
            {...args}
            checkboxes={COLUMN_CHECKBOXES}
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
        />
    );
};
MultipleColumns.args = {
    direction: ChecklistDirection.Vertical,
    columns: 2,
};

export const MultipleColumnsInContainedSpace = (args: ChecklistProps) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <div className="tw-w-[300px] tw-p-2 tw-border- tw-border tw-rounded tw-border-line">
            <ChecklistComponent
                {...args}
                checkboxes={COLUMN_CHECKBOXES}
                activeValues={activeBoxes}
                setActiveValues={setActiveBoxes}
            />
        </div>
    );
};
MultipleColumnsInContainedSpace.args = {
    direction: ChecklistDirection.Vertical,
    columns: 2,
};

MultipleColumnsInContainedSpace.argTypes = {
    direction: { table: { disable: true } },
};

export const MultipleColumnsInContainedSpaceAndSpannedColumn = (args: ChecklistProps) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return (
        <div className="tw-w-[300px] tw-p-2 tw-border- tw-border tw-rounded tw-border-line">
            <ChecklistComponent
                {...args}
                checkboxes={COLUMN_CHECKBOXES}
                activeValues={activeBoxes}
                setActiveValues={setActiveBoxes}
            />
        </div>
    );
};
MultipleColumnsInContainedSpaceAndSpannedColumn.args = {
    direction: ChecklistDirection.Vertical,
    columns: 3,
};

MultipleColumnsInContainedSpaceAndSpannedColumn.argTypes = {
    direction: { table: { disable: true } },
};
