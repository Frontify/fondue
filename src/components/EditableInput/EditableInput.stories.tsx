import React, { useState } from 'react';
import { EditableInput, EditableInputProps, EditableMode } from '@components/EditableInput/EditableInput';
import { Story } from '@storybook/react';
import { IconPen } from '@foundation/Icon';

export default {
    title: 'Components/Editable Input',
    component: EditableInput,
    parameters: { actions: { argTypesRegex: '^on.*' } },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        options: {
            table: {
                category: 'Custom',
            },
        },
        onAdditionalValueSave: {
            table: {
                category: 'Event',
            },
        },
        onEditableSave: {
            table: {
                category: 'Event',
            },
        },
        onModeChange: {
            table: {
                category: 'Event',
            },
        },
    },
};

const ButtonTemplate: Story<EditableInputProps> = (args: EditableInputProps) => (
    <EditableInput {...args}>{args.children}</EditableInput>
);

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: (
        <div className={'tw-flex tw-flex-row tw-items-center'}>
            <h1 className={'tw-text-text tw-p-2'}>hey default</h1>
        </div>
    ),
    options: {
        mode: EditableMode.LABEL,
        customInputTextClasses: 'tw-text-text tw-p-2',
        customContainerClasses: 'tw-flex',
        enableDoubleClick: false,
        additionalValues: 'Values only for the Event',
    },
};
Default.storyName = 'Editable Input';

export const EditWithDoubleClick = ButtonTemplate.bind({});
EditWithDoubleClick.args = {
    children: (
        <div className={'tw-flex tw-flex-row tw-items-center'}>
            <h1>Change me with a Double Click</h1>
        </div>
    ),
    options: {
        enableDoubleClick: true,
    },
};

export const ControlledInputExample: Story<EditableInputProps> = () => {
    const [label, setLabel] = useState('Im set from the outside');

    return (
        <EditableInput
            onEditableSave={(value) => setLabel(value)}
            options={{
                additionalValues: 'ID',
                enableDoubleClick: true,
                customInputTextClasses: 'tw-text-2xl tw-w-fit tw-p-2',
                customContainerClasses: 'tw-flex tw-w-fit',
            }}
        >
            <div className={'tw-flex tw-flex-row tw-items-center'}>
                <h1 className={'tw-text-2xl tw-w-fit tw-p-2'}>{label}</h1>
                <IconPen />
            </div>
        </EditableInput>
    );
};

export const InitialStartInInput = ButtonTemplate.bind({});
InitialStartInInput.args = {
    children: (
        <div className={'tw-flex tw-flex-row tw-items-center'}>
            <h1 className={'tw-p-2'}>Im such a Input Mode</h1>
            <IconPen />
        </div>
    ),
    options: {
        mode: EditableMode.INPUT,
        customInputTextClasses: 'tw-text-2xl tw-p-2',
        customContainerClasses: 'tw-flex',
    },
};

export const InputWithCustomStyling = ButtonTemplate.bind({});
InputWithCustomStyling.args = {
    children: (
        <div className={'tw-flex tw-flex-row tw-items-center'}>
            <h1 className="tw-text-2xl tw-p-2">Im such a Input Mode</h1>
            <IconPen />
        </div>
    ),
    options: {
        mode: EditableMode.INPUT,
        customInputTextClasses: 'tw-text-2xl tw-p-2',
        customContainerClasses: 'tw-flex',
    },
};
