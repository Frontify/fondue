/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { IconSize } from './IconSize';
import { IconProps } from './IconProps';
import { IconEnum } from './IconEnum';
import * as AllIcons from './Generated';

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

export const Icon: StoryFn<IconProps> = (args: IconProps) => (
    <ul className="tw-grid tw-grid-cols-4 tw-gap-4">
        {Object.values(IconEnum)
            .filter(
                (iconName) =>
                    iconName.includes((args?.size || '16').replace('Size', '')) ||
                    !['12', '16', '20', '24', '32'].some((item) => iconName.includes(item)),
            )
            .map((iconName) => {
                const Icon = AllIcons[`Icon${iconName}`];
                return (
                    <li
                        key={iconName}
                        className="tw-flex tw-flex-col tw-items-center tw-text-violet-80 dark:tw-text-white"
                    >
                        <Icon {...args} />
                        {iconName}
                    </li>
                );
            })}
    </ul>
);
