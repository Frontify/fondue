/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Stack as StackComponent, StackProps } from './Stack';
import { SPACING_VALUES } from '@utilities/dimensions';
import { BOX_BG_ALIAS_TOKENS_CLASSES, BOX_TEXT_ALIAS_TOKENS_CLASSES } from '@utilities/tokens';
import { Box } from '@components/Box';
import { Divider } from '@components/Divider';

const StackDirections = ['row', 'column', 'row-reverse', 'column-reverse'];

export default {
    title: 'Layout/Stack',
    component: StackComponent,
    tags: ['autodocs'],
    argTypes: {
        as: {
            options: ['div', 'span'],
            control: {
                type: 'select',
            },
        },
        bg: {
            options: BOX_BG_ALIAS_TOKENS_CLASSES,
            control: {
                type: 'select',
            },
        },
        color: {
            options: BOX_TEXT_ALIAS_TOKENS_CLASSES,
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
        direction: {
            options: StackDirections,
            control: { type: 'radio' },
        },
        spacing: {
            options: SPACING_VALUES,
            control: { type: 'select' },
        },
        children: { table: { disable: true } },
    },
    args: {
        as: 'div',
        bg: '',
        color: '',
        margin: 0,
        padding: 12,
        direction: 'column',
        spacing: 8,
        divider: <Divider />,
        'data-test-id': 'custom-test-id',
        children: <span>Item</span>,
    },
} as Meta<StackProps>;

const Code = ({ children }: { children: ReactNode }): ReactElement => (
    <code className="tw-bg-box-neutral tw-rounded tw-px-2 tw-text-box-neutral-inverse tw-text-s">{children}</code>
);

export const Stack: StoryFn<StackProps> = (args: StackProps) => <StackComponent {...args} />;
export const StackWithBoxAliasToken: StoryFn<StackProps> = (args: StackProps) => (
    <StackComponent {...args}>
        <p>
            This is a full width container with bg and color{' '}
            <a href="?path=/story/tokens--alias-tokens" className="tw-text-text-interactive" target="_blank">
                Alias Tokens.
            </a>
        </p>
        <p>
            This story shows only Box Alias Tokens in controls, but you can pass any color token class to define bg and
            color properties.
        </p>
    </StackComponent>
);
StackWithBoxAliasToken.args = {
    bg: 'tw-bg-box-neutral',
};

export const StackAsSpanElement: StoryFn<StackProps> = (args: StackProps) => (
    <Box as="span" className="tw-flex">
        <StackComponent {...args} bg="tw-bg-box-positive" color="tw-text-box-positive-inverse">
            <Box as="span">
                To use <Code>Container</Code> as a <Code>span</Code> element and apply top and bottom{' '}
                <Code>margin</Code> and <Code>padding</Code> wrap it into a flex or grid container.
            </Box>
        </StackComponent>
        <StackComponent {...args} bg="tw-bg-box-warning" color="tw-text-box-warning-inverse">
            <Box as="span">
                Use <Code>span</Code> element when there is a parent element that does not accept <Code>div</Code> as a
                child element.
            </Box>
        </StackComponent>
        <StackComponent {...args} bg="tw-bg-box-negative" color="tw-text-box-negative-inverse">
            <Box as="span">
                It is not possible to define flex items CSS like <Code>flex: 1;</Code> in the Container component. Use a
                combination of <Code>Flex</Code> and <Code>Box</Code> when that is needed.
            </Box>
        </StackComponent>
    </Box>
);
StackAsSpanElement.args = {
    as: 'span',
    margin: 8,
};
StackAsSpanElement.argTypes = {
    bg: {
        control: {
            disable: true,
        },
    },
    color: {
        control: {
            disable: true,
        },
    },
};
