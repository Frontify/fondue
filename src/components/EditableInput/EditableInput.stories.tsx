import React from 'react';
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
    name: 'Region',
    targetItemId: 'ID',
};
Default.storyName = 'Editable Input';

export const EditableInputSingleCLick = ButtonTemplate.bind({});
EditableInputSingleCLick.args = {
    children: <IconPen />,
    name: 'Region',
    targetItemId: 'ID',
    singleClick: true,
};

export const OverrideEditableStateToInput = ButtonTemplate.bind({});
OverrideEditableStateToInput.args = {
    children: <IconPen />,
    name: 'Region',
    targetItemId: 'ID',
    singleClick: true,
    mode: EditableMode.INPUT,
};
