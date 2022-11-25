/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize, MenuItemStyle } from '@components/MenuItem';
import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import {
    Dropdown,
    DropdownAlignment,
    DropdownEmphasis,
    DropdownPosition,
    DropdownProps,
    DropdownSize,
} from './Dropdown';
import { Validation } from '@utilities/validation';
import { IconMusicNote } from '@foundation/Icon';

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    args: {
        placeholder: 'select item',
        disabled: false,
        clearable: false,
        validation: Validation.Default,
    },
    argTypes: {
        size: {
            options: Object.values(DropdownSize),
            control: { type: 'select' },
            defaultValue: DropdownSize.Small,
        },
        activeItemId: { type: 'string' },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        alignment: {
            options: Object.values(DropdownAlignment),
            control: { type: 'select' },
            defaultValue: DropdownAlignment.Start,
        },
        position: {
            options: Object.values(DropdownPosition),
            control: { type: 'select' },
            defaultValue: DropdownPosition.Bottom,
        },
    },
} as Meta;

const DropdownTemplate: StoryFn<DropdownProps> = (args: DropdownProps) => {
    const [active, setActive] = useState(args.activeItemId);
    useEffect(() => setActive(args.activeItemId), [args.activeItemId]);

    return <Dropdown {...args} activeItemId={active} onChange={(id) => setActive(id)} />;
};

const DropdownWithLimitedWidthTemplate: StoryFn<DropdownProps> = (args: DropdownProps) => {
    const [active, setActive] = useState(args.activeItemId);
    useEffect(() => setActive(args.activeItemId), [args.activeItemId]);

    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <div className="tw-max-w-[150px]">
                <Dropdown {...args} activeItemId={active} onChange={(id) => setActive(id)} />
            </div>
        </div>
    );
};

const DropdownWithinOverflownContainer: StoryFn<DropdownProps> = (args: DropdownProps) => {
    const [active, setActive] = useState(args.activeItemId);
    useEffect(() => setActive(args.activeItemId), [args.activeItemId]);

    return (
        <div className="tw-overflow-y-auto tw-h-[100px] tw-my-6">
            <p className="tw-p2">Title</p>
            <p className="tw-p2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor
                vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh.
            </p>
            <Dropdown {...args} activeItemId={active} onChange={(id) => setActive(id)} />
            <p className="tw-p2">
                Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non
                maximus risus efficitur sit amet. Nulla diam urna
            </p>
        </div>
    );
};

const DropdownWithBackgroundTemplate: StoryFn<DropdownProps> = (args: DropdownProps) => {
    const [active, setActive] = useState(args.activeItemId);
    const [active2, setActive2] = useState(args.activeItemId);
    useEffect(() => setActive(args.activeItemId), [args.activeItemId]);
    useEffect(() => setActive2(args.activeItemId), [args.activeItemId]);

    return (
        <div className="tw-p-8 tw-bg-black-5 tw-flex tw-gap-2">
            <div className="tw-max-w-[300px]">
                <Dropdown
                    {...args}
                    placeholder="select default item"
                    emphasis={DropdownEmphasis.Default}
                    activeItemId={active}
                    onChange={(id) => setActive(id)}
                />
            </div>
            <div className="tw-max-w-[300px]">
                <Dropdown
                    {...args}
                    placeholder="select weak item"
                    emphasis={DropdownEmphasis.Weak}
                    activeItemId={active2}
                    onChange={(id) => setActive2(id)}
                />
            </div>
        </div>
    );
};

export const SmallSelect = DropdownTemplate.bind({});

SmallSelect.args = {
    size: DropdownSize.Small,
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: 1,
                    title: 'Small icon',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                },
                {
                    id: 2,
                    title: 'Small icon warning',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: 3,
                    title: 'Small icon disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    disabled: true,
                },
                {
                    id: 4,
                    title: 'Small icon warning disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                },
            ],
        },
        {
            id: 'block2',
            ariaLabel: 'Second section',
            menuItems: [
                {
                    id: '9',
                    title: 'Small',
                    size: MenuItemContentSize.Small,
                },
                {
                    id: '10',
                    title: 'Small warning',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: '11',
                    title: 'Small disabled',
                    size: MenuItemContentSize.Small,
                    disabled: true,
                },
                {
                    id: '12',
                    title: 'Small warning disabled',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    disabled: true,
                },
            ],
        },
    ],
};

export const DropdownWithLimitedWidth = DropdownWithLimitedWidthTemplate.bind({});

DropdownWithLimitedWidth.args = {
    size: DropdownSize.Small,
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: 1,
                    title: 'Limited width icon',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                },
                {
                    id: 2,
                    title: 'Limited width warning',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                },
                {
                    id: 3,
                    title: 'Limited width disabled',
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    disabled: true,
                },
                {
                    id: 4,
                    title: 'Limited width warning disabled',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                    disabled: true,
                },
                {
                    id: 5,
                    title: 'Limited width warning with long title',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    decorator: <IconMusicNote />,
                },
            ],
        },
        {
            id: 'block2',
            ariaLabel: 'Second section',
            menuItems: [
                {
                    id: '9',
                    title: 'Limited width',
                    size: MenuItemContentSize.Small,
                },
                {
                    id: '10',
                    title: 'Limited width warning',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                },
                {
                    id: '11',
                    title: 'Limited width disabled',
                    size: MenuItemContentSize.Small,
                    disabled: true,
                },
                {
                    id: '12',
                    title: 'Limited width warning disabled',
                    style: MenuItemStyle.Danger,
                    size: MenuItemContentSize.Small,
                    disabled: true,
                },
            ],
        },
    ],
};

export const LargeSelect = DropdownTemplate.bind({});

LargeSelect.args = {
    size: DropdownSize.Large,
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: '5',
                    title: 'Large icon',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                },
                {
                    id: '6',
                    title: 'Large icon warning',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: '7',
                    title: 'Large icon disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    disabled: true,
                },
                {
                    id: '8',
                    title: 'Large icon warning disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                },
            ],
        },
        {
            id: 'block2',
            ariaLabel: 'Second section',
            menuItems: [
                {
                    id: '13',
                    title: 'Large',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                },
                {
                    id: '14',
                    title: 'Large warning',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: '15',
                    title: 'Large disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    disabled: true,
                },
                {
                    id: '16',
                    title: 'Large warning disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                },
            ],
        },
    ],
};

export const WithinOverflow = DropdownWithinOverflownContainer.bind({});

WithinOverflow.args = {
    size: DropdownSize.Small,
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: '9',
                    title: 'With Icon',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                },
                {
                    id: '10',
                    title: 'Warning icon',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: '11',
                    title: 'This is disabled',
                    subtitle: 'Subtitle',
                    decorator: <IconMusicNote />,
                    size: MenuItemContentSize.Large,
                    disabled: true,
                },
                {
                    id: '12',
                    title: 'Icon warning disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                },
            ],
        },
        {
            id: 'block2',
            ariaLabel: 'Second section',
            menuItems: [
                {
                    id: '17',
                    title: 'Small',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Small,
                },
                {
                    id: '18',
                    title: 'Small warning',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Danger,
                },
                {
                    id: '19',
                    title: 'Small disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Small,
                    disabled: true,
                },
                {
                    id: '20',
                    title: 'Warning disabled',
                    subtitle: 'Subtitle',
                    size: MenuItemContentSize.Small,
                    style: MenuItemStyle.Danger,
                    disabled: true,
                },
            ],
        },
    ],
};

export const WeakSelect = DropdownWithBackgroundTemplate.bind({});

WeakSelect.args = {
    size: DropdownSize.Small,
    menuBlocks: [
        {
            id: 'block1',
            ariaLabel: 'First section',
            menuItems: [
                {
                    id: 1,
                    title: 'Example item A',
                },
                {
                    id: 2,
                    title: 'Example item B',
                },
                {
                    id: 3,
                    title: 'Example item C',
                },
            ],
        },
    ],
};
