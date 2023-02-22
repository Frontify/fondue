/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo24 } from '@foundation/Icon';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Toast as ToastComponent } from './Toast';
import { ToastProps, ToastStyles } from './types';

export default {
    title: 'Components/Toast',
    component: ToastComponent,
    tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ToastProps> = (args) => <ToastComponent {...args} />;

export const Information = Template.bind({});

Information.args = {
    isOpen: true,
    style: ToastStyles.Information,
    icon: <IconInfo24 />,
    children: <div className="tw-p-3 tw-flex tw-items-center">I am a very important Information!</div>,
};
