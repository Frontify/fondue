/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

import { ButtonEmphasis, ButtonStyle } from '@components/Button';
import { Flex } from '@components/Flex';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';

import { DIALOG_PADDING, type DialogFooterProps } from '../../types';

import { DialogFooter } from './DialogFooter';

export default {
    title: 'Experimental/DialogFooter',
    component: DialogFooter,
    tags: ['autodocs'],
    args: {
        padding: 'compact',
        separator: true,
        actionButtons: [
            {
                children: 'Cancel',
                onClick: action('click'),
                style: ButtonStyle.Default,
                emphasis: ButtonEmphasis.Default,
            },
            {
                children: 'Confirm',
                onClick: action('click'),
                style: ButtonStyle.Default,
                emphasis: ButtonEmphasis.Strong,
                icon: <IconCheckMark />,
            },
        ],
    },
    argTypes: {
        padding: {
            options: DIALOG_PADDING,
            control: { type: 'select' },
        },
        'data-test-id': {
            type: 'string',
        },
        separator: {
            type: 'boolean',
        },
    },
} as Meta<DialogFooterProps>;

const Default: StoryFn<DialogFooterProps> = (args) => {
    return <DialogFooter {...args} />;
};

export const WithActionButtons = Default.bind({});
export const WithBackButton = Default.bind({});
WithBackButton.args = {
    backButton: { children: 'Back', onClick: action('click') },
};

export const WithBackButtonAndContent = Default.bind({});
WithBackButtonAndContent.args = {
    backButton: { children: 'Back', onClick: action('click') },
    children: (
        <Flex justify="end">
            <p className="tw-text-text-weak">This a important piece of information.</p>
        </Flex>
    ),
};

export const WithoutBackButton = Default.bind({});
WithoutBackButton.args = {
    children: (
        <Flex justify="end">
            <p className="tw-text-text-weak">This a important piece of information.</p>
        </Flex>
    ),
};
