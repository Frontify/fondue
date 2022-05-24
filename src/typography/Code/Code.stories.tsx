/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Code as CodeComponent, CodeProps } from './Code';

// eslint-disable-next-line import/no-default-export
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

export const Code: Story<CodeProps> = (args) => <CodeComponent {...args} />;
