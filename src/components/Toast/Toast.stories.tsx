/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo24, IconTrashBin24 } from '@foundation/Icon';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Toast as ToastComponent } from './Toast';
import { ToastProps, ToastStyle } from './types';

export default {
    title: 'Components/Toast',
    component: ToastComponent,
    tags: ['autodocs'],
} as Meta;

const WithLeftContainer: StoryFn<ToastProps> = (args) => (
    <div className="tw-fixed tw-bottom-0 tw-left-0 tw-m-3">
        <ToastComponent {...args} />
    </div>
);

const WithRightContainer: StoryFn<ToastProps> = (args) => (
    <div className="tw-fixed tw-bottom-0 tw-right-0 tw-m-3">
        <ToastComponent {...args} />
    </div>
);

export const LeftLoud = WithLeftContainer.bind({});
LeftLoud.args = {
    isOpen: true,
    style: ToastStyle.Loud,
    icon: <IconInfo24 />,
    children: <div className="tw-p-3 tw-flex tw-items-center">I am a very important Information!</div>,
};

export const RightDanger = WithRightContainer.bind({});
RightDanger.args = {
    isOpen: true,
    style: ToastStyle.Danger,
    icon: <IconTrashBin24 />,
    children: <div className="tw-p-3 tw-flex tw-items-center">I am also a very important Information!</div>,
};
