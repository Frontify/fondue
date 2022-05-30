/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Meta, Story } from '@storybook/react';
import { IconSize } from './IconSize';
import { IconProps } from './IconProps';
import { Icon as IconComponent } from './Icon';
import { IconEnum } from './IconEnum';

export default {
    title: 'Foundation/Icon',
    args: {
        size: IconSize.Size16,
    },
    argTypes: {
        size: {
            options: Object.keys(IconSize),
            control: { type: 'select' },
        },
    },
} as Meta<IconProps>;

export const Icon: Story<IconProps> = (args: IconProps) => (
    <ul className="tw-grid tw-grid-cols-4 tw-gap-4">
        {Object.values(IconEnum).map((iconName) => (
            <li key={iconName} className="tw-flex tw-flex-col tw-items-center dark:tw-text-white">
                <IconComponent {...args} icon={iconName} />
                {iconName}
            </li>
        ))}
    </ul>
);
