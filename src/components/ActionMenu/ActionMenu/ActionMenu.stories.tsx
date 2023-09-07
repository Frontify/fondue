/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize, MenuItemStyle, SelectionIndicatorIcon } from '@components/MenuItem';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { ActionMenu as ActionMenuComponent, ActionMenuProps } from './ActionMenu';
import { IconMusicNote } from '@foundation/Icon/Generated';

export default {
    title: 'Components/Action Menu',
    component: ActionMenuComponent,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'onClick' },
    },
} as Meta;

export const ActionMenu: StoryFn<ActionMenuProps & { onClick: () => void }> = (args) => (
    <ActionMenuComponent {...args} />
);

ActionMenu.args = {
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: '1',
                    title: 'Small item with icon',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: (value: unknown) => {
                        action('switch toggled')(value);
                    },
                    type: 'switch',
                    initialValue: false,
                },
                {
                    id: '2',
                    title: 'Small item with icon danger',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Danger,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '3',
                    title: 'Small item with icon warning',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Warning,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '4',
                    title: 'Small item with icon disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '5',
                    title: 'Small item with icon danger disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '6',
                    title: 'Small item with icon warning disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Warning,
                    disabled: true,
                    onClick: action('click'),
                },
            ],
        },
        {
            id: 'block2',
            ariaLabel: 'Second section',
            menuItems: [
                {
                    id: '7',
                    title: 'Small item',
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '8',
                    title: 'Small item danger',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Danger,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '9',
                    title: 'Small item warning',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Warning,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '10',
                    title: 'Small item disabled',
                    size: MenuItemContentSize.Small,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '11',
                    title: 'Small item danger disabled',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '12',
                    title: 'Small item warning disabled',
                    style: MenuItemStyle.Warning,
                    size: MenuItemContentSize.Small,
                    disabled: true,
                    onClick: action('click'),
                },
            ],
        },
        {
            id: 'block3',
            ariaLabel: 'Third section',
            menuItems: [
                {
                    id: '13',
                    title: 'Large item with icon',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '14',
                    title: 'Large item with icon danger',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '15',
                    title: 'Large item with icon warning',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Warning,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '16',
                    title: 'Large item with icon disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '17',
                    title: 'Large item with icon danger disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '18',
                    title: 'Large item with icon warning disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Warning,
                    disabled: true,
                    onClick: action('click'),
                },
            ],
        },
        {
            id: 'block4',
            ariaLabel: 'Fourth section',
            menuItems: [
                {
                    id: '19',
                    title: 'Large item',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '20',
                    title: 'Large item danger',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '21',
                    title: 'Large item warning',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Warning,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                    onClick: action('click'),
                },
                {
                    id: '22',
                    title: 'Large item disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '23',
                    title: 'Large item danger disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                    onClick: action('click'),
                },
                {
                    id: '24',
                    title: 'Large item warning disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Warning,
                    disabled: true,
                    onClick: action('click'),
                },
            ],
        },
    ],
};
