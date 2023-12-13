/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from '@foundation/Icon/IconSize';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControls, SegmentedControlsProps } from './SegmentedControls';
import { IconTextAlignmentCentre, IconTextAlignmentLeft, IconTextAlignmentRight } from '@foundation/Icon/Generated';

export default {
    title: 'Components/SegmentedControls',
    component: SegmentedControls,
    tags: ['autodocs'],
    argTypes: {
        id: { type: 'string' },
        hugWidth: { type: 'boolean' },
        disabled: {
            control: { type: 'boolean' },
        },
        size: { control: { type: 'select' }, options: ['small', 'medium'] },
    },
    args: {
        disabled: false,
        size: 'medium',
    },
} as Meta<SegmentedControlsProps>;

const SegmentedControlsTemplate: StoryFn<SegmentedControlsProps> = (args: SegmentedControlsProps) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return (
        <SegmentedControls
            {...args}
            key={String(args.hugWidth)}
            activeItemId={activeItemId}
            onChange={setActiveItemId}
        />
    );
};

const LimitedWidthTemplate: StoryFn<SegmentedControlsProps> = (args: SegmentedControlsProps) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return (
        <div className="tw-w-[200px]">
            <SegmentedControls
                {...args}
                key={String(args.hugWidth)}
                activeItemId={activeItemId}
                onChange={setActiveItemId}
            />
        </div>
    );
};

export const Text = SegmentedControlsTemplate.bind({});
Text.args = {
    items: [
        { id: 'a', value: 'abc' },
        { id: 'b', value: 'def' },
        { id: 'c', value: 'ghi' },
    ],
};

export const TextWithHugWidth = SegmentedControlsTemplate.bind({});
TextWithHugWidth.args = {
    items: [
        { id: 'a', value: 'All' },
        { id: 'b', value: 'Top 10' },
        { id: 'c', value: 'Bottom 10' },
        { id: 'd', value: 'Top 10' },
        { id: 'e', value: 'All' },
        { id: 'f', value: 'Bottom 100000' },
    ],
    hugWidth: true,
};

export const TextWithSmallSize = LimitedWidthTemplate.bind({});
TextWithSmallSize.args = {
    items: [
        { id: 'a', value: 'Auto' },
        { id: 'b', value: 'S' },
        { id: 'c', value: 'M' },
        { id: 'd', value: 'L' },
    ],
    size: 'small',
};

export const Numbers = SegmentedControlsTemplate.bind({});
Numbers.args = {
    items: [
        { id: 'a', value: 10 },
        { id: 'b', value: 20 },
        { id: 'c', value: 30 },
    ],
};

export const Icon = SegmentedControlsTemplate.bind({});
Icon.args = {
    items: [
        { id: 'a', icon: <IconTextAlignmentLeft size={IconSize.Size16} />, ariaLabel: 'Text Align Left' },
        { id: 'b', icon: <IconTextAlignmentCentre size={IconSize.Size16} />, ariaLabel: 'Text Align Center' },
        { id: 'c', icon: <IconTextAlignmentRight size={IconSize.Size16} />, ariaLabel: 'Text Align Right' },
    ],
};

export const IconAndText = SegmentedControlsTemplate.bind({});
IconAndText.args = {
    items: [
        {
            id: 'a',
            icon: <IconTextAlignmentLeft size={IconSize.Size16} />,
            ariaLabel: 'Text Align Left',
            value: 'Title 1',
        },
        {
            id: 'b',
            icon: <IconTextAlignmentCentre size={IconSize.Size16} />,
            ariaLabel: 'Text Align Center',
            value: 'Title 2',
        },
        {
            id: 'c',
            icon: <IconTextAlignmentRight size={IconSize.Size16} />,
            ariaLabel: 'Text Align Right',
            value: 'Title 3',
        },
    ],
};

export const TextWithOneItemDisabled = SegmentedControlsTemplate.bind({});
TextWithOneItemDisabled.args = {
    items: [
        { id: 'a', value: 'abc', disabled: true },
        { id: 'b', value: 'def' },
        { id: 'c', value: 'ghi' },
    ],
};
