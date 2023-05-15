/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from '@foundation/Icon/IconSize';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { SegmentedControls, SegmentedControlsProps } from './SegmentedControls';
import { IconTextAlignmentCentre, IconTextAlignmentLeft, IconTextAlignmentRight } from '@foundation/Icon/Generated';

export default {
    title: 'Components/SegmentedControls',
    component: SegmentedControls,
    tags: ['autodocs'],
    argTypes: {
        id: { type: 'string' },
    },
    args: {
        disabled: false,
    },
} as Meta<SegmentedControlsProps>;

const SegmentedControlsTemplate: StoryFn<SegmentedControlsProps> = (args: SegmentedControlsProps) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return <SegmentedControls {...args} activeItemId={activeItemId} onChange={setActiveItemId} />;
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
    ],
    hugWidth: true,
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
