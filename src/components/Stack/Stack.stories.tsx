/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { STACK_PROPS, Stack as StackComponent } from './Stack';
import { SPACING_VALUES } from '@utilities/dimensions';
import { BOX_BG_ALIAS_TOKENS_CLASSES, BOX_TEXT_ALIAS_TOKENS_CLASSES } from '@utilities/tokens';
import { Divider } from '@components/Divider';

const STACK_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];

const STACK_JUSTIFY_TYPES = ['start', 'end', 'center', 'between', 'around', 'evenly'];

const STACK_ALIGN_ITEMS_TYPES = ['start', 'end', 'center', 'baseline', 'stretch'];

const spacingSelect = {
    options: Object.values(SPACING_VALUES),
    control: { type: 'select' },
    defaultValue: '',
};

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
        direction: {
            options: STACK_DIRECTIONS,
            control: { type: 'select' },
        },
        justify: {
            options: STACK_JUSTIFY_TYPES,
            control: { type: 'select' },
        },
        alignItems: {
            options: STACK_ALIGN_ITEMS_TYPES,
            control: { type: 'select' },
        },
        paddingX: spacingSelect,
        paddingY: spacingSelect,
        padding: spacingSelect,
        marginX: spacingSelect,
        marginY: spacingSelect,
        margin: spacingSelect,
        spacingX: spacingSelect,
        spacingY: spacingSelect,
        spacing: {
            options: Object.values(SPACING_VALUES),
            control: { type: 'select' },
            defaultValue: 4,
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
        justify: 'start',
        alignItems: 'start',
        spacing: 8,
        'data-test-id': 'custom-test-id',
    },
} as Meta<STACK_PROPS>;

export const Stack: StoryFn<STACK_PROPS> = (args: STACK_PROPS) => {
    const STACK_ITEM_CLASS_NAMES =
        'tw-bg-box-positive-strong tw-text-box-positive-strong-inverse tw-rounded-md tw-px-4 tw-py-1';
    return (
        <StackComponent {...args}>
            <div className={STACK_ITEM_CLASS_NAMES}>Test content.</div>
            <div className={STACK_ITEM_CLASS_NAMES}>
                First line
                <br />
                Next line
                <br />
                Last line
            </div>
            <div className={STACK_ITEM_CLASS_NAMES}>
                All the good stuff is in the middle but the rest of it is necessary too.
            </div>
            <div className={STACK_ITEM_CLASS_NAMES}>Test!</div>
        </StackComponent>
    );
};

export const StackWithHorizontalDivider: StoryFn<STACK_PROPS> = (args: STACK_PROPS) => {
    return <Stack {...args} />;
};
StackWithHorizontalDivider.args = {
    divider: <Divider />,
};

export const StackWithVerticalDivider: StoryFn<STACK_PROPS> = (args: STACK_PROPS) => {
    return <Stack {...args} />;
};
StackWithVerticalDivider.args = {
    direction: 'row',
    divider: <Divider vertical={true} />,
};

export const StackWithBoxAliasToken: StoryFn<STACK_PROPS> = (args: STACK_PROPS) => (
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
