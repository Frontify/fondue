/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Container as ContainerComponent, ContainerProps } from './Container';
import { SPACING_VALUES } from '@utilities/dimensions';
import { BOX_BG_ALIAS_TOKENS_CLASSES, BOX_TEXT_ALIAS_TOKENS_CLASSES } from '@utilities/tokens';
import { Box } from '@components/Box';

const spacingSelect = {
    options: Object.values(SPACING_VALUES),
    control: { type: 'select' },
    defaultValue: '',
};

export default {
    title: 'Layout/Container',
    component: ContainerComponent,
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
        paddingX: spacingSelect,
        paddingY: spacingSelect,
        padding: spacingSelect,
        marginX: spacingSelect,
        marginY: spacingSelect,
        margin: spacingSelect,
        children: { table: { disable: true } },
    },
    args: {
        as: 'div',
        bg: '',
        color: '',
        margin: 0,
        padding: 12,
        minWidth: undefined,
        maxWidth: undefined,
        minHeight: undefined,
        maxHeight: undefined,
        'data-test-id': 'custom-test-id',
        children: <span>This is a container</span>,
    },
} as Meta<ContainerProps>;

const Code = ({ children }: { children: ReactNode }): ReactElement => (
    <code className="tw-bg-box-neutral tw-rounded tw-px-2 tw-text-box-neutral-inverse tw-text-s">{children}</code>
);

export const Container: StoryFn<ContainerProps> = (args: ContainerProps) => <ContainerComponent {...args} />;
export const ContainerWithBoxAliasToken: StoryFn<ContainerProps> = (args: ContainerProps) => (
    <ContainerComponent {...args}>
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
    </ContainerComponent>
);
ContainerWithBoxAliasToken.args = {
    bg: 'tw-bg-box-neutral',
    maxWidth: '100%',
};

export const ContainerAsSpanElement: StoryFn<ContainerProps> = (args: ContainerProps) => (
    <Box as="span" className="tw-flex">
        <ContainerComponent {...args} bg="tw-bg-box-positive" color="tw-text-box-positive-inverse">
            <Box as="span">
                To use <Code>Container</Code> as a <Code>span</Code> element and apply top and bottom{' '}
                <Code>margin</Code> and <Code>padding</Code> wrap it into a flex or grid container.
            </Box>
        </ContainerComponent>
        <ContainerComponent {...args} bg="tw-bg-box-warning" color="tw-text-box-warning-inverse">
            <Box as="span">
                Use <Code>span</Code> element when there is a parent element that does not accept <Code>div</Code> as a
                child element.
            </Box>
        </ContainerComponent>
        <ContainerComponent {...args} bg="tw-bg-box-negative" color="tw-text-box-negative-inverse">
            <Box as="span">
                It is not possible to define flex items CSS like <Code>flex: 1;</Code> in the Container component. Use a
                combination of <Code>Flex</Code> and <Code>Box</Code> when that is needed.
            </Box>
        </ContainerComponent>
    </Box>
);
ContainerAsSpanElement.args = {
    as: 'span',
    maxWidth: '33%',
    margin: 8,
};
ContainerAsSpanElement.argTypes = {
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
