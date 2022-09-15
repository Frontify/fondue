import React, { useState } from 'react';
import { EditableInput, EditableInputProps, EditableMode } from '@components/EditableInput/EditableInput';
import { Story } from '@storybook/react';
import { IconPen, IconSize } from '@foundation/Icon';

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

const EditableTemplate: Story<EditableInputProps> = (args: EditableInputProps) => (
    <EditableInput {...args}>{args.children}</EditableInput>
);

const EditableTemplateIcon: Story<EditableInputProps> = (args: EditableInputProps) => {
    const [label, setLabel] = useState('Im set from the outside');

    return (
        <div className="tw-flex tw-items-center">
            <EditableInput {...args} onEditableSave={(value) => setLabel(value)}>
                <h1>{label}</h1>
            </EditableInput>{' '}
            <IconPen size={IconSize.Size24} />
        </div>
    );
};

export const EditableInputDefault = EditableTemplate.bind({});
EditableInputDefault.args = {
    children: (
        <div>
            <p>Change me</p>
        </div>
    ),
    options: {},
};

export const Default = EditableTemplate.bind({});
Default.args = {
    children: (
        <div className={'tw-flex tw-flex-row tw-items-center'}>
            <h1 className={'tw-text-text tw-p-2'}>hey Styled</h1>
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
Default.storyName = 'Editable Input Custom Styling';

export const ControlledInputExample: Story<EditableInputProps> = () => {
    const [label, setLabel] = useState('Im set from the outside');

    return (
        <div className="tw-flex tw-items-center">
            <EditableInput
                onEditableSave={(value) => setLabel(value)}
                options={{
                    additionalValues: 'ID',
                    enableDoubleClick: true,
                    customInputTextClasses: 'tw-text-xl tw-w-fit tw-p-2',
                    customContainerClasses: 'tw-flex tw-w-fit',
                }}
            >
                <h1 className={'tw-text-xl tw-w-fit tw-p-2'}>{label}</h1>
            </EditableInput>
            <IconPen size={IconSize.Size24} />
        </div>
    );
};

export const ControllelInitialInput = EditableTemplateIcon.bind({});
ControllelInitialInput.args = {
    options: {
        mode: EditableMode.INPUT,
    },
};
