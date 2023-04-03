/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Container as ContainerComponent, ContainerProps } from './Container';
import { SPACING_VALUES } from '@utilities/dimensions';
import { BOX_ALIAS_TOKENS_PREFIX } from '@utilities/tokens';

export default {
    title: 'Layout/Container',
    component: ContainerComponent,
    tags: ['autodocs'],
    argTypes: {
        boxColorToken: {
            options: BOX_ALIAS_TOKENS_PREFIX,
            control: {
                type: 'select',
            },
        },
        margin: {
            options: Object.values(SPACING_VALUES),
            control: { type: 'select' },
        },
        padding: {
            options: Object.values(SPACING_VALUES),
            control: { type: 'select' },
        },
        minWidth: {
            type: 'string',
        },
        maxWidth: {
            type: 'string',
        },
        minHeight: {
            type: 'string',
        },
        maxHeight: {
            type: 'string',
        },
        children: { table: { disable: false } },
    },
    args: {
        boxColorToken: '',
        margin: 0,
        padding: 12,
        minWidth: '50px',
        maxWidth: '100px',
        minHeight: undefined,
        maxHeight: undefined,
        'data-test-id': 'custom-test-id',
        children: <span>This is a container</span>,
    },
} as Meta<ContainerProps>;

export const Container: StoryFn<ContainerProps> = (args: ContainerProps) => <ContainerComponent {...args} />;
export const ContainerWithBoxAliasToken: StoryFn<ContainerProps> = (args: ContainerProps) => (
    <ContainerComponent {...args} />
);
ContainerWithBoxAliasToken.args = {
    boxColorToken: 'box-neutral',
    maxWidth: '100%',
    children: (
        <span>
            This is a full width container with box{' '}
            <a href="?path=/story/tokens--alias-tokens" className="tw-text-text-interactive" target="_blank">
                Alias Tokens
            </a>
        </span>
    ),
};
