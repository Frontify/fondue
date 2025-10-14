/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import {
    MenuItem as MenuItemComponent,
    MenuItemContentSize,
    type MenuItemProps,
    MenuItemStyle,
    SelectionIndicatorIcon,
} from '@components/MenuItem';
import { Switch } from '@components/Switch/Switch';
import IconMusicNote from '@foundation/Icon/Generated/IconMusicNote';

const SwitchComponent = () => {
    const [switchValue, setSwitchValue] = useState<boolean>(false);
    const toggleSwitch = () => setSwitchValue(!switchValue);

    return <Switch size="small" mode={switchValue ? 'on' : 'off'} onChange={toggleSwitch} />;
};

/**
 ### This component is deprecated, please use the [new Dropdown component](/docs/current_components-dropdown--documentation) instead.
 */
export default {
    title: 'Components/Menu Item',
    component: MenuItemComponent,
    tags: ['autodocs'],
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
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta;

export const MenuItem: StoryFn<MenuItemProps> = (args) => (
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
