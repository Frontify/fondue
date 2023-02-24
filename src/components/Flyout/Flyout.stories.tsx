/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeStatus, BadgeStyle } from '@components/Badge';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { Divider } from '@components/Divider/Divider';
import { FormControl } from '@components/FormControl/FormControl';
import { SegmentedPicker } from '@components/SegmentedPicker/SegmentedPicker';
import { Textarea } from '@components/Textarea/Textarea';
import { TextInput } from '@components/TextInput/TextInput';
import { chain } from '@react-aria/utils';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { MutableRefObject, useState } from 'react';
import { FLYOUT_DIVIDER_COLOR, FLYOUT_DIVIDER_HEIGHT, Flyout, FlyoutPlacement, FlyoutProps } from './Flyout';
import { FlyoutFooter } from './FlyoutFooter';
import { Dropdown } from '@components/Dropdown';
import { DatePicker } from '@components/DatePicker';
import { TooltipIcon } from '@components/TooltipIcon';
import { IconDotsVertical, IconExclamationMarkCircle, IconIcon } from '@foundation/Icon';

export default {
    title: 'Components/Flyout',
    component: Flyout,
    tags: ['autodocs'],
    argTypes: {
        onCancel: { action: 'onCancel', table: { disable: true } },
        onOpenChange: { action: 'onOpenChange', table: { disable: true } },
        placement: {
            options: Object.values(FlyoutPlacement),
            control: { type: 'select' },
            defaultValue: FlyoutPlacement.BottomLeft,
        },
        offset: {
            control: { type: 'number' },
            defaultValue: 5,
        },
    },
    args: {
        trigger: (
            <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
                <IconDotsVertical />
            </span>
        ),
    },
} as Meta<FlyoutProps>;

const FlyoutTemplate: (addScrollingContent: boolean, inputFocus: boolean) => StoryFn<FlyoutProps> = (
    addScrollingContent = false,
    inputFocus = false,
) => {
    const Component = (args: FlyoutProps) => {
        const [activeItemId, setActiveItemId] = useState('a');
        const [input, setInput] = useState('');
        const [open, setOpen] = useState(false);

        return (
            <div className="dark:tw-text-white">
                <div className="tw-flex tw-items-center">
                    Some text
                    <Flyout
                        {...args}
                        isOpen={open}
                        onOpenChange={chain(args.onOpenChange, setOpen)}
                        onCancel={chain(args.onCancel, () => setOpen(false))}
                        onConfirm={args.onConfirm && chain(args.onConfirm, setOpen)}
                    >
                        <div className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8">
                            <FormControl
                                label={{
                                    children: 'Input Label',
                                    htmlFor: 'input-id',
                                    tooltip: { content: 'Input tooltip' },
                                }}
                                extra="Extra Text"
                            >
                                <TextInput value={input} onChange={setInput} focusOnMount={inputFocus} />
                            </FormControl>
                            <Divider color={FLYOUT_DIVIDER_COLOR} height={FLYOUT_DIVIDER_HEIGHT} />
                            <FormControl
                                label={{
                                    children: 'SegmentedPicker Label',
                                    htmlFor: 'slider-id',
                                }}
                            >
                                <SegmentedPicker
                                    activeItemId={activeItemId}
                                    onChange={setActiveItemId}
                                    items={[
                                        { id: 'a', value: 'abc' },
                                        { id: 'b', value: 'def' },
                                        { id: 'c', value: 'ghi' },
                                    ]}
                                />
                            </FormControl>
                        </div>

                        <div className="tw-p-8">
                            <FormControl
                                label={{
                                    children: 'Textarea Label',
                                    htmlFor: 'textarea-id',
                                }}
                            >
                                <Textarea placeholder="This is a placeholder" />
                            </FormControl>
                        </div>
                    </Flyout>
                </div>
                <div>
                    Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore
                    consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum
                    anim ipsum est.
                </div>
                {addScrollingContent &&
                    Array.from(Array(15).keys()).map((i) => (
                        <div key={`content${i}`}>
                            Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna
                            labore consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla
                            aliqua in laborum anim ipsum est.
                        </div>
                    ))}
            </div>
        );
    };

    return Component;
};

export const WithoutHeader = FlyoutTemplate(false, false).bind({});

export const WithOnclick = FlyoutTemplate(false, false).bind({});

WithOnclick.argTypes = {
    onConfirm: { action: 'onConfirm' },
};

WithOnclick.args = {
    title: 'Header title',
    decorator: <IconIcon />,
    onConfirm: action('onConfirm'),
};

export const WithBadges = FlyoutTemplate(false, false).bind({});

WithBadges.args = {
    title: 'Header title',
    decorator: <IconIcon />,
    badges: [
        { style: BadgeStyle.Positive, children: 'Badge 1' },
        { status: BadgeStatus.Danger, children: 'Badge 2' },
        { style: BadgeStyle.Danger, icon: <IconIcon />, children: 'Badge 3' },
    ],
};

const WithButtonFlyoutTemplate: StoryFn<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return (
        <Flyout
            {...args}
            trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLButtonElement>) => (
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Strong}
                    onClick={() => setOpen(!open)}
                    ref={ref}
                    aria-label={ariaLabel}
                >
                    Button
                </Button>
            )}
            isOpen={open}
            onOpenChange={chain(args.onOpenChange, setOpen)}
            onCancel={chain(args.onCancel, () => setOpen(false))}
        >
            <div className="tw-p-4">
                <p className="tw-flex tw-items-center tw-my-2">
                    Label 1
                    <span className="tw-ml-2">
                        <TooltipIcon
                            tooltip={{ content: 'Lorem ipsum dolor sit amet.' }}
                            triggerIcon={<IconExclamationMarkCircle />}
                        />
                    </span>
                </p>
                <Dropdown
                    onChange={(id) => console.log(id)}
                    activeItemId={'1'}
                    menuBlocks={[
                        {
                            id: 'block1',
                            menuItems: [
                                { id: '1', title: 'Item 1' },
                                { id: '2', title: 'Item 2' },
                                { id: '3', title: 'Item 3' },
                                { id: '4', title: 'Item 4' },
                                { id: '5', title: 'Item 5' },
                            ],
                        },
                    ]}
                />
                <p className="tw-flex tw-items-center tw-my-2">
                    Label 2
                    <span className="tw-ml-2">
                        <TooltipIcon
                            tooltip={{ content: 'Lorem ipsum dolor sit amet.' }}
                            triggerIcon={<IconExclamationMarkCircle />}
                        />
                    </span>
                </p>
                <DatePicker value={selectedDate as Date} onChange={setSelectedDate} />
            </div>
        </Flyout>
    );
};
export const WithButtonTrigger = WithButtonFlyoutTemplate.bind({});

WithButtonTrigger.args = {
    title: 'Header title',
    decorator: <IconIcon />,
};

WithButtonTrigger.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};

const WithCustomFooterFlyoutTemplate: StoryFn<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="dark:tw-text-white">
            <div className="tw-flex tw-items-center">
                Some text
                <Flyout
                    {...args}
                    isOpen={open}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                    fixedFooter={
                        <FlyoutFooter
                            buttons={[
                                {
                                    style: ButtonStyle.Default,
                                    emphasis: ButtonEmphasis.Default,
                                    children: 'Cancel',

                                    onClick: chain(action('onCancel'), () => setOpen(false)),
                                },
                                {
                                    style: ButtonStyle.Default,
                                    emphasis: ButtonEmphasis.Strong,
                                    children: 'Add',
                                    onClick: chain(action('onConfirm'), () => setOpen(false)),
                                },
                            ]}
                        />
                    }
                >
                    <p className="tw-text-center tw-py-8">Your flyout content with custom footer buttons!</p>
                </Flyout>
            </div>
            <div>
                Deserunt voluptate deserunt laborum dolor excepteur. Reprehenderit amet cillum ad ut. Magna labore
                consequat enim tempor amet in qui. In esse proident officia aliquip ea in in nulla aliqua in laborum
                anim ipsum est.
            </div>
        </div>
    );
};
export const WithCustomFooter = WithCustomFooterFlyoutTemplate.bind({});

WithCustomFooter.args = {
    title: 'Header title',
    decorator: <IconIcon />,
    trigger: (
        <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
            <IconDotsVertical />
        </span>
    ),
    legacyFooter: false,
};

WithCustomFooter.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};

const WithCustomFooterAndHeaderTemplate: StoryFn<FlyoutProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flyout
            {...args}
            trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLButtonElement>) => (
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Strong}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={ref}
                    aria-label={ariaLabel}
                >
                    Click me
                </Button>
            )}
            isOpen={isOpen}
            onOpenChange={chain(args.onOpenChange, setIsOpen)}
            onCancel={chain(args.onCancel, () => setIsOpen(false))}
        >
            <p className="tw-text-center tw-py-8">Flyout Content</p>
        </Flyout>
    );
};
export const WithCustomFooterAndHeader = WithCustomFooterAndHeaderTemplate.bind({});

WithCustomFooterAndHeader.args = {
    legacyFooter: false,
    fixedHeader: (
        <div className="tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95 tw-border-b tw-border-b-black-10">
            Custom Header
        </div>
    ),
    fixedFooter: (
        <FlyoutFooter
            buttons={[
                {
                    style: ButtonStyle.Default,
                    emphasis: ButtonEmphasis.Strong,
                    children: 'A button',
                },
            ]}
        />
    ),
};

const WithRenderFunctionTriggerTemplate: StoryFn<FlyoutProps> = (args) => {
    const [open, setOpen] = useState(false);

    return (
        <Flyout
            {...args}
            trigger={(props, ref: MutableRefObject<HTMLDivElement>, state) => (
                <div
                    {...props}
                    ref={ref}
                    className={merge([
                        'tw-border tw-rounded tw-w-[200px] tw-p-2 tw-text-s tw-text-center tw-h-[60px] tw-outline-none tw-items-center tw-flex tw-justify-center',
                        state.isFocusVisible && FOCUS_STYLE,
                        state.isPressed && 'tw-bg-black-10',
                    ])}
                >
                    {state.isPressed ? "I'm Pressed!" : ' Accessible custom trigger'}
                </div>
            )}
            isOpen={open}
            onOpenChange={chain(args.onOpenChange, setOpen)}
            onCancel={chain(args.onCancel, () => setOpen(false))}
        >
            <p className="tw-text-center tw-py-8">Fun with Flyouts and Buttons!</p>
        </Flyout>
    );
};
export const WithRenderFunctionTrigger = WithRenderFunctionTriggerTemplate.bind({});

WithRenderFunctionTrigger.args = {
    title: 'Header title',
    decorator: <IconIcon />,
};

WithRenderFunctionTrigger.argTypes = {
    trigger: { table: { disable: true } },
    decorator: { table: { disable: true } },
};

export const WithContentMinHeight = FlyoutTemplate(false, false).bind({});

WithContentMinHeight.args = {
    contentMinHeight: 200,
};

const WithPlacementAndOffsetTemplate: StoryFn<FlyoutProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flyout
            {...args}
            trigger={({ 'aria-label': ariaLabel }, ref: MutableRefObject<HTMLButtonElement>) => (
                <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-screen">
                    <Button
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Strong}
                        onClick={() => setIsOpen(!isOpen)}
                        ref={ref}
                        aria-label={ariaLabel}
                    >
                        Click me
                    </Button>
                </div>
            )}
            isOpen={isOpen}
            onOpenChange={chain(args.onOpenChange, setIsOpen)}
            onCancel={chain(args.onCancel, () => setIsOpen(false))}
        >
            <p className="tw-text-center tw-py-8">Flyout Content</p>
        </Flyout>
    );
};
export const WithPlacementAndOffset = WithPlacementAndOffsetTemplate.bind({});

WithPlacementAndOffset.args = {
    placement: FlyoutPlacement.Top,
    offset: 20,
};

export const WithTextInputAutofocusAndPageScrolling = FlyoutTemplate(true, true).bind({});
