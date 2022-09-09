import React, { useState } from 'react';
import { EditableInput, EditableInputProps, EditableMode } from '@components/EditableInput/EditableInput';
import { Story } from '@storybook/react';
import { IconArrowOutExternal, IconBell, IconPen } from '@foundation/Icon';

const IconList = {
    pen: <IconPen />,
    external: <IconArrowOutExternal />,
    bell: <IconBell />,
};

export default {
    title: 'Components/Editable Input',
    component: EditableInput,
    parameters: { actions: { argTypesRegex: '^on.*' } },
    argTypes: {
        children: {
            options: Object.keys(IconList),
            mapping: IconList,
        },
    },
};

const ButtonTemplate: Story<EditableInputProps> = (args: EditableInputProps) => (
    <EditableInput {...args}>{args.children}</EditableInput>
);

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: <IconPen />,
};
Default.storyName = 'Editable Input';

export const EditableInputSingleCLick = ButtonTemplate.bind({});
EditableInputSingleCLick.args = {
    children: <IconPen />,
};

export const ControlledInputExample: Story<EditableInputProps> = () => {
    const [label, setLabel] = useState('Im set from the outside');

    const outputTest = (one: string, two: string) => console.log(one, two);
    return (
        <EditableInput
            onEditableSave={(value) => setLabel(value)}
            onAdditionalValueSave={outputTest}
            options={{
                additionalValues: 'ID',
                enableDoubleClick: true,
                customInputTextClasses: 'tw-text-2xl tw-w-fit',
                customContainerClasses: 'tw-flex tw-w-fit',
            }}
        >
            <div>
                <h1 className={'tw-text-2xl tw-w-fit'}>{label}</h1>
                <IconPen />
            </div>
        </EditableInput>
    );
};

export const OverrideEditableStateToInput = ButtonTemplate.bind({});
OverrideEditableStateToInput.args = {
    children: (
        <div>
            <h1 className="tw-text-2xl">
                This is something else new
                <IconPen />
            </h1>
        </div>
    ),
    options: {
        mode: EditableMode.INPUT,
    },
};
