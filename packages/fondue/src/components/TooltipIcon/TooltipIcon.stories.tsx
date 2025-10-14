/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import IconExclamationMarkCircle from '@foundation/Icon/Generated/IconExclamationMarkCircle';
import { IconSize } from '@foundation/Icon/IconSize';

import { TooltipIcon, type TooltipIconProps, TooltipIconTriggerStyle } from './TooltipIcon';

/**
 ### This component is deprecated, please use the [new Tooltip component](/docs/current_components-tooltip--documentation) instead.
 */
export default {
    title: 'Deprecated/TooltipIcon',
    component: TooltipIcon,
    tags: ['autodocs'],
    argTypes: {
        triggerStyle: {
            options: Object.values(TooltipIconTriggerStyle),
            control: { type: 'select' },
        },
    },
    args: {
        tooltip: {
            content: 'Lorem ipsum dolor sit amet.',
        },
        triggerStyle: 'Primary',
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<TooltipIconProps>;

const TooltipIconTemplate: StoryFn<TooltipIconProps> = (args: TooltipIconProps) => {
    return <TooltipIcon {...args} />;
};

export const WithDefaultIconSize = TooltipIconTemplate.bind({});

export const WithCustomIconSize = TooltipIconTemplate.bind({});
WithCustomIconSize.args = {
    iconSize: IconSize.Size20,
};

export const WithCustomIcon = TooltipIconTemplate.bind({});
WithCustomIcon.args = {
    triggerIcon: <IconExclamationMarkCircle filled />,
};
