/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { Code as CodeComponent, type CodeProps } from './Code';

export default {
    title: 'Typography/Code',
    component: CodeComponent,
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
        },
        weight: {
            options: ['default', 'strong'],
            control: { type: 'select' },
        },
        as: {
            options: ['code', 'pre', 'span'],
            control: { type: 'select' },
        },
        color: {
            options: ['default', 'weak', 'x-weak', 'disabled', 'negative', 'positive', 'warning', 'interactive'],
            control: { type: 'select' },
        },
    },
    args: {
        children: 'The <blink>fox</blink> jumps <marquee>over</marquee> the lazy dog',
        size: 'medium',
        weight: 'default',
        as: 'span',
        color: 'default',
    },
} as Meta<CodeProps>;

export const Code: StoryFn<CodeProps> = (args) => <CodeComponent {...args} />;
