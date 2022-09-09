import React from 'react';
import { EditableInput, EditableInputProps } from '@components/EditableInput/EditableInput';
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
        onEditableSave: {
            action: 'onEditableSave',
            table: {
                disable: true,
            },
        },
    },
};

const ButtonTemplate: Story<EditableInputProps> = (args: EditableInputProps) => (
    <EditableInput {...args}>{args.children}</EditableInput>
);

const EditableSaveStub = (targetItemId: string, value: string) => {
    return `${targetItemId} ${value}`;
};

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: <IconPen />,
    name: 'Region',
    targetItemId: 'ID',
    onEditableSave: EditableSaveStub,
};
Default.storyName = 'Editable Input';
