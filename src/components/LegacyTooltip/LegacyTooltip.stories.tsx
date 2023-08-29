/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { BrightHeaderStyle } from './BrightHeader';
import { LegacyTooltip, LegacyTooltipProps, TooltipAlignment, TooltipPosition } from './LegacyTooltip';
import { IconExclamationMarkCircle16Filled, IconExclamationMarkTriangle16, IconIcon } from '@foundation/Icon/Generated';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/types';
import { ScrollWrapperDirection } from '@components/ScrollWrapper/types';
import { action } from '@storybook/addon-actions';
import { Dropdown } from '@components/Dropdown';
import { FormControl } from '..';

export default {
    title: 'Deprecated/LegacyTooltip',
    component: LegacyTooltip,
    tags: ['autodocs'],
    args: {
        content: 'Cupcake ipsum dolor sit amet ice cream. (https://Cupcakeipsumdolorsitameticecream.com)',
        heading: '',
        triggerElement: (
            <button className="tw-flex tw-justify-center tw-items-center">
                <span className="tw-flex tw-leading-3">
                    <IconExclamationMarkCircle16Filled />
                </span>
                <span>Tooltip trigger</span>
            </button>
        ),
    },
    argTypes: {
        triggerElement: { table: { disable: true } },
        brightHeader: {
            options: ['None', 'Information', 'Warning', 'Tip', 'Note'],
            mapping: {
                None: null,
                Information: BrightHeaderStyle.Information,
                Warning: BrightHeaderStyle.Warning,
                Tip: BrightHeaderStyle.Tip,
                Note: BrightHeaderStyle.Note,
            },
            control: { type: 'select' },
        },
        tooltipIcon: {
            options: ['None', 'Icon'],
            mapping: {
                None: null,
                Icon: <IconIcon />,
            },
            control: { type: 'select' },
        },
        headingIcon: {
            options: ['None', 'Icon'],
            mapping: {
                None: null,
                Icon: <IconIcon />,
            },
            control: { type: 'select' },
        },
        position: {
            options: Object.values(TooltipPosition),
            control: { type: 'select' },
            defaultValue: TooltipPosition.Bottom,
        },
        alignment: {
            options: Object.values(TooltipAlignment),
            control: { type: 'select' },
            defaultValue: TooltipAlignment.Middle,
        },
        withArrow: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        open: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        linkUrl: {
            control: 'text',
            defaultValue: false,
        },
        linkLabel: {
            control: 'text',
            defaultValue: false,
        },
        disabled: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        hidden: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        flip: {
            control: { type: 'boolean' },
            defaultValue: true,
        },
        hoverDelay: {
            control: { type: 'number' },
            defaultValue: 200,
        },
        enterDelay: {
            control: { type: 'number' },
            defaultValue: null,
        },
        enablePortal: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
    },
} as Meta<LegacyTooltipProps>;

export const TooltipComponent: StoryFn<LegacyTooltipProps> = (args: LegacyTooltipProps) => {
    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>
    );
};

export const MultipleTooltipsComponent: StoryFn<LegacyTooltipProps> = (args: LegacyTooltipProps) => {
    return (
        <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <p className="tw-mr-2">Label</p>
            <LegacyTooltip
                {...args}
                triggerElement={
                    <button aria-label="Exclamation mark circle icon" className="tw-mr-1">
                        <IconExclamationMarkCircle16Filled />
                    </button>
                }
            />
            <LegacyTooltip
                {...args}
                content="Second tooltip"
                triggerElement={
                    <button aria-label="Exclamation mark triangle icon">
                        <IconExclamationMarkTriangle16 />
                    </button>
                }
                brightHeader={BrightHeaderStyle.Warning}
            />
        </div>
    );
};

export const WithPortal = TooltipComponent.bind({});
WithPortal.args = {
    enablePortal: true,
};

export const WithInfoBrightHeader = TooltipComponent.bind({});
WithInfoBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Information,
};

export const WithWarningBrightHeader = TooltipComponent.bind({});
WithWarningBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Warning,
};

export const WithTipBrightHeader = TooltipComponent.bind({});
WithTipBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Tip,
};

export const WithNoteBrightHeader = TooltipComponent.bind({});
WithNoteBrightHeader.args = {
    brightHeader: BrightHeaderStyle.Note,
};

export const WithOneButton = TooltipComponent.bind({});
WithOneButton.args = {
    buttons: [{ label: 'Primary', action: () => null }],
};

export const WithTwoButtons = TooltipComponent.bind({});
WithTwoButtons.args = {
    buttons: [
        { label: 'Primary', action: () => null },
        { label: 'Secondary', action: () => null },
    ],
};

export const WithHeading = TooltipComponent.bind({});
WithHeading.args = {
    heading: "I'm a heading",
};

export const WithHeadingAndIcon = TooltipComponent.bind({});
WithHeadingAndIcon.args = {
    heading: "I'm a heading",
    headingIcon: <IconIcon />,
};

export const TooltipWithIcon = TooltipComponent.bind({});
TooltipWithIcon.args = {
    tooltipIcon: <IconIcon />,
};

export const TooltipWithIconAsTriggerElement = TooltipComponent.bind({});
TooltipWithIconAsTriggerElement.args = {
    triggerElement: <IconIcon />,
};

export const WithLinkWithDefaultLabel = TooltipComponent.bind({});
WithLinkWithDefaultLabel.args = {
    linkUrl: '#',
};

export const WithLinkWithCustomLabel = TooltipComponent.bind({});
WithLinkWithCustomLabel.args = {
    linkUrl: '#',
    linkLabel: 'Upgrade your plan',
};

export const WithEverythingDisplayed = TooltipComponent.bind({});
WithEverythingDisplayed.args = {
    tooltipIcon: <IconIcon />,
    heading: "I'm a heading",
    headingIcon: <IconIcon />,
    linkUrl: '#',
    brightHeader: BrightHeaderStyle.Warning,
    buttons: [
        { label: 'Primary', action: () => null },
        { label: 'Secondary', action: () => null },
    ],
};

export const WithArrow = TooltipComponent.bind({});
WithArrow.args = {
    withArrow: true,
};

export const OpenByDefault = TooltipComponent.bind({});
OpenByDefault.args = {
    open: true,
    withArrow: true,
};

export const DisabledTooltip = TooltipComponent.bind({});
DisabledTooltip.args = {
    disabled: true,
};
DisabledTooltip.decorators = [
    (StoryElement) => (
        <div className="tw-flex tw-flex-col tw-justify-start">
            <p>
                The tooltip content will NOT be rendered when <strong>disabled</strong> is true. It disables the tooltip
                open/close feature.
            </p>
            <StoryElement />
        </div>
    ),
];

export const HiddenTooltip = TooltipComponent.bind({});
HiddenTooltip.args = {
    hidden: true,
};
HiddenTooltip.decorators = [
    (StoryElement) => (
        <div className="tw-flex tw-flex-col tw-justify-start">
            <p>
                The tooltip content will not be displayed, but still be rendered, when <strong>hidden</strong> is true.
            </p>
            <StoryElement />
        </div>
    ),
];

const TooltipWithinOverflownContainer: StoryFn<LegacyTooltipProps> = (args: LegacyTooltipProps) => {
    return (
        <div className="tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6">
            <p className="tw-p2">Title</p>
            <p className="tw-p2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor
                vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh.
            </p>
            <div className="tw-w-4">
                <LegacyTooltip
                    {...args}
                    triggerElement={
                        <button aria-label="Exclamation mark circle icon" className="tw-mr-1">
                            <IconExclamationMarkCircle16Filled />
                        </button>
                    }
                />
            </div>
            <p className="tw-p2">
                Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non
                maximus risus efficitur sit amet. Nulla diam urna
            </p>
            <p className="tw-p2">
                Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non
                maximus risus efficitur sit amet. Nulla diam urna
            </p>
        </div>
    );
};

export const WithOverflownContainer = TooltipWithinOverflownContainer.bind({});
WithOverflownContainer.args = {
    withArrow: true,
};

const ModalComponent = (args: ModalProps) => {
    const state = useOverlayTriggerState({});

    return (
        <>
            <Button onClick={() => state.open()}>Open Modal</Button>
            <Modal onClose={state.close} isOpen={state.isOpen} isDismissable>
                <Modal.Header title="Modal title" leadText="Lead text" />
                <Modal.Body direction={ScrollWrapperDirection.Vertical}>{args.children}</Modal.Body>
                <Modal.Footer
                    buttons={[
                        {
                            children: 'Cancel',
                            onClick: () => {
                                state.close();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Default,
                        },
                        {
                            children: 'Confirm',
                            onClick: () => {
                                action('click');
                                state.close();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                        },
                    ]}
                />
            </Modal>
        </>
    );
};

const DropdownComponent = () => {
    const [active, setActive] = useState<string | number | undefined>();

    return (
        <Dropdown
            menuBlocks={[
                {
                    id: 'block1',
                    ariaLabel: 'First section',
                    menuItems: [
                        {
                            id: 1,
                            title: 'Item 1',
                        },
                        {
                            id: 2,
                            title: 'Item 2',
                        },
                        {
                            id: 3,
                            title: 'Item 3',
                        },
                        {
                            id: 4,
                            title: 'Item 4',
                        },
                    ],
                },
            ]}
            activeItemId={active}
            onChange={(id) => setActive(id)}
        />
    );
};

const WithModalWithTooltipAndDropdown: StoryFn<LegacyTooltipProps> = (args: LegacyTooltipProps) => {
    return (
        <ModalComponent isOpen={false}>
            <div>
                <div className="tw-flex">
                    <DropdownComponent />
                    <LegacyTooltip
                        {...args}
                        triggerElement={
                            <button aria-label="Exclamation mark circle icon" className="tw-mr-1">
                                <IconExclamationMarkCircle16Filled />
                            </button>
                        }
                    />
                </div>
                <FormControl
                    label={{
                        children: 'Input Label',
                        required: false,
                        htmlFor: 'dropdownId',
                        tooltip: { content: 'Tooltip Text' },
                    }}
                >
                    <DropdownComponent />
                </FormControl>
            </div>
        </ModalComponent>
    );
};

export const InsideModalWithDropdown = WithModalWithTooltipAndDropdown.bind({});

InsideModalWithDropdown.args = {
    alignment: TooltipAlignment.End,
    position: TooltipPosition.Top,
};
