/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { MenuItem as MenuItemComponent, MenuItemProps, MenuItemStyle, SelectionIndicatorIcon } from './MenuItem';
import { MenuItemContentSize } from './MenuItemContent';
import { Switch, SwitchSize } from '@components/Switch';
import { IconMusicNote } from '@foundation/Icon';

const SwitchComponent = () => {
    const [switchValue, setSwitchValue] = useState<boolean>(false);
    const toggleSwitch = () => setSwitchValue(!switchValue);

    return <Switch size={SwitchSize.Small} on={switchValue} onChange={toggleSwitch} />;
};

export default {
    title: 'Components/Menu Item',
    component: MenuItemComponent,
    args: {
        id: 'abc',
        title: 'Item Title',
        subtitle: 'Subtitle',
        size: MenuItemContentSize.Small,
        style: MenuItemStyle.Primary,
        disabled: false,
        decorator: <IconMusicNote />,
        active: false,
        selectionIndicator: SelectionIndicatorIcon.Check,
    },
    argTypes: {
        size: {
            options: Object.values(MenuItemContentSize),
            control: { type: 'radio' },
        },
        style: {
            options: Object.values(MenuItemStyle),
            control: { type: 'radio' },
        },
        decorator: {
            control: { type: 'boolean' },
        },
        selectionIndicator: {
            options: Object.values(SelectionIndicatorIcon),
            control: { type: 'radio' },
        },
    },
} as Meta;

export const MenuItem: Story<MenuItemProps> = (args) => (
    <MenuItemComponent
        {...args}
        decorator={args.decorator && <IconMusicNote />}
        subtitle={args.size === MenuItemContentSize.Large && args.subtitle ? args.subtitle : ''}
    />
);

export const WithOptionalSwitch = MenuItem.bind({});
WithOptionalSwitch.args = {
    switchComponent: <SwitchComponent />,
};
