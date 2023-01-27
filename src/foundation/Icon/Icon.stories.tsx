/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { IconProps } from './IconProps';
import { Icon as IconComponent } from './Icon';
import { IconEnum } from './IconEnum';

export default {
    title: 'Foundation/Icon',
} as Meta<IconProps>;

export const Icon: StoryFn<IconProps> = () => (
    <ul className="tw-grid tw-grid-cols-4 tw-gap-4">
        {Object.values(IconEnum)
            .filter((iconName) => iconName.includes('16'))
            .map((iconName) => (
                <li key={iconName} className="tw-flex tw-flex-col tw-items-center tw-text-violet-80 dark:tw-text-white">
                    <IconComponent icon={iconName} />
                    {iconName}
                </li>
            ))}
    </ul>
);
