/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { SelectItem, SelectItemProps } from './SelectItem';
import { Select } from '@components/Select/Select';
import { SelectGroupItemProps } from '@components/SelectGroupItem/SelectGroupItem';
import { IconClock16, IconNook16 } from '@foundation/Icon';

const ITEM_GROUPS_1: SelectItemProps[] = [
    { id: '1', title: 'title prop of Apple', value: 'value prop of Apple', decorator: <IconNook16 /> },
    { id: '2', value: 'value prop of Orange', decorator: <IconClock16 /> },
    { id: '3', title: 'title prop of Pear', value: 'value prop of Pear' },
    { id: '4', title: 'title prop of Kiwi (disabled)', value: 'value prop of Kiwi', disabled: true },
];

export default {
    title: 'Components/SelectItem',
    component: SelectItem,
    tags: ['autodocs'],
    argType: {
        id: { control: { type: 'string' } },
        value: { control: { type: 'string' } },
        decorator: { control: { type: 'ReactElement' } },
        disabled: { control: { type: 'boolean' } },
        title: { control: { type: 'string' } },
        'data-test-id': { control: { type: 'string' } },
    },
} as Meta<SelectItemProps>;

export const Default: StoryFn<SelectGroupItemProps> = (args) => {
    return (
        <Select>
            {...ITEM_GROUPS_1.map((item) => <SelectItem {...args} key={item.id} id={item.id} value={item.value} />)}
        </Select>
    );
};
