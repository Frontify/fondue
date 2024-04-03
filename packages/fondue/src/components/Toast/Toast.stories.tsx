/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { Button } from '@components/Button/Button';
import { ButtonGroup } from '@components/ButtonGroup/ButtonGroup';
import IconExclamationMarkCircle24 from '@foundation/Icon/Generated/IconExclamationMarkCircle24';
import IconExclamationMarkTriangle24 from '@foundation/Icon/Generated/IconExclamationMarkTriangle24';
import IconTrashBin24 from '@foundation/Icon/Generated/IconTrashBin24';

import { ButtonSize, ButtonStyle } from '../Button/ButtonTypes';

import { Toast as ToastComponent } from './Toast';
import { ToastAnimationDirection, type ToastProps, ToastStyle } from './types';

export default {
    title: 'Components/Toast',
    component: ToastComponent,
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: Object.values(ToastStyle),
            control: { type: 'select' },
            defaultValue: ToastStyle.Loud,
        },
        animationDirection: {
            options: Object.values(ToastAnimationDirection),
            control: { type: 'select' },
            defaultValue: ToastAnimationDirection.BottomToTop,
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'select' },
            defaultValue: 'light',
        },
        enableExitAnimation: { control: { type: 'boolean' }, defaultValue: false },
        icon: { table: { disable: true } },
        children: { table: { disable: true } },
    },
} as Meta;

const WithLeftBottomContainer: StoryFn<ToastProps> = (args) => (
    <div className="tw-fixed tw-bottom-0 tw-left-0 tw-m-3">
        <ToastComponent {...args} />
    </div>
);

const WithRightTopContainer: StoryFn<ToastProps> = (args) => (
    <div className="tw-fixed tw-top-0 tw-right-0 tw-m-3">
        <ToastComponent {...args} />
    </div>
);

const WithRightBottomContainer: StoryFn<ToastProps> = (args) => (
    <div className="tw-fixed tw-bottom-0 tw-right-0 tw-m-3">
        <ToastComponent {...args} />
    </div>
);

export const InformativeToastAtTheBottom = WithLeftBottomContainer.bind({});
InformativeToastAtTheBottom.args = {
    isOpen: true,
    style: ToastStyle.Loud,
    icon: <IconExclamationMarkCircle24 />,
    children: <div className="tw-p-4 tw-flex tw-items-center">Item successfully added</div>,
};

export const WarningToastAtTheTop = WithRightTopContainer.bind({});
WarningToastAtTheTop.args = {
    isOpen: true,
    style: ToastStyle.Warning,
    icon: <IconExclamationMarkTriangle24 />,
    animationDirection: ToastAnimationDirection.TopToBottom,
    children: <div className="tw-p-4 tw-flex tw-items-center">Your password will expire in 7 days</div>,
};

export const WithInteractiveContent = WithRightBottomContainer.bind({});
WithInteractiveContent.args = {
    isOpen: true,
    style: ToastStyle.Danger,
    icon: <IconTrashBin24 />,
    children: (
        <>
            <div className="tw-flex tw-p-4">
                <div className="tw-border-r tw-border-black-20 tw-pr-4">
                    <div className="tw-font-bold">Item Deletion Confirmation</div>
                    <span className="tw-mt-1">You are about to delete this item</span>
                </div>
            </div>
            <div className="tw-flex tw-items-center tw-py-4 tw-pr-4">
                <ButtonGroup size={ButtonSize.Medium}>
                    <Button style={ButtonStyle.Secondary}>Yes, delete it</Button>
                    <Button>Cancel</Button>
                </ButtonGroup>
            </div>
        </>
    ),
};

export const DarkTheme = WithLeftBottomContainer.bind({});
DarkTheme.args = {
    isOpen: true,
    style: ToastStyle.Loud,
    theme: 'dark',
    icon: <IconExclamationMarkCircle24 />,
    children: (
        <div className="tw-p-4 tw-flex tw-items-center tw-text-box-neutral-mighty-inverse">Item successfully added</div>
    ),
};
