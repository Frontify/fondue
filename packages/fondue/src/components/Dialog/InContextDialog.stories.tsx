/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useCallback, useRef, useState } from 'react';

import { Box } from '@components/Box';
import { Button, ButtonEmphasis } from '@components/Button';
import { DialogBody } from '@components/DialogBody';
import { DialogFooter } from '@components/DialogFooter';
import { DialogHeader } from '@components/DialogHeader';
import { Flex } from '@components/Flex';
import { InlineDialog } from '@components/InlineDialog';
import { LegacyTooltip, TooltipPosition } from '@components/LegacyTooltip';
import { MenuItem } from '@components/MenuItem';
import { TabItem, Tabs, TabsPaddingX } from '@components/Tabs';
import { TextInput } from '@components/TextInput';
import { Tooltip } from '@components/Tooltip';
import IconCaretDown from '@foundation/Icon/Generated/IconCaretDown';
import IconCaretUp from '@foundation/Icon/Generated/IconCaretUp';
import IconExclamationMarkCircle16 from '@foundation/Icon/Generated/IconExclamationMarkCircle16';
import IconMagnifier from '@foundation/Icon/Generated/IconMagnifier';
import { IconSize } from '@foundation/Icon/IconSize';
import { Text } from '@typography/Text';

import { Modality } from '../../types';

import { Dialog, type DialogProps } from './Dialog';

export default {
    title: 'Experimental/Dialog/In Context',
    component: Dialog,
    tags: ['autodocs'],
    args: {
        modality: Modality.Modal,
        strategy: 'absolute',
        minWidth: 600,
        maxWidth: 0,
        autoHeight: false,
        maxHeight: 'auto',
        minHeight: 200,
        darkUnderlay: false,
        verticalAlignment: 'centered',
    },
    argTypes: {
        enablePortal: {
            control: { type: 'boolean' },
        },
        modality: {
            options: Object.values(Modality),
            control: { type: 'select' },
        },
        strategy: {
            options: ['absolute', 'fixed'],
            control: { type: 'radio' },
        },
        'data-test-id': {
            type: 'string',
        },
        role: {
            type: 'string',
        },
        darkUnderlay: {
            type: 'boolean',
        },
        autoHeight: {
            type: 'boolean',
        },
        verticalAlignment: {
            options: ['top', 'centered'],
            control: { type: 'radio' },
        },
        zIndex: { table: { disable: true } },
        isDetached: { table: { disable: true } },
    },
} as Meta<DialogProps>;

const WithTabsTemplate: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItemId, setActiveItemId] = useState('1');
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog trigger
            </Button>

            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogHeader
                    title="Heading"
                    padding="comfortable"
                    onClose={() => setIsOpen(false)}
                    separator={false}
                />
                <DialogBody>
                    <Tabs
                        activeItemId={activeItemId}
                        paddingX={TabsPaddingX.None}
                        onChange={(value) => setActiveItemId(value)}
                    >
                        <TabItem id="1" label="Tab 1">
                            <p className="tw-p-6">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam
                                reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit.
                            </p>
                        </TabItem>

                        <TabItem id="2" label="Tab 2">
                            <Box className="tw-p-6">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                            </Box>
                        </TabItem>
                    </Tabs>
                </DialogBody>
                <DialogFooter
                    actionButtons={[
                        {
                            children: 'Cancel',
                            emphasis: ButtonEmphasis.Default,
                            onClick: () => setIsOpen(false),
                        },
                        {
                            children: 'Confirm',
                            onClick: () => setIsOpen(false),
                        },
                    ]}
                ></DialogFooter>
            </Dialog>
        </>
    );
};

type OptionListItem = {
    code: string;
    label: string;
};

const optionList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'German' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
];

const WithInlineDialog: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptionList, setFilteredOptionList] = useState<OptionListItem[]>(optionList);
    const [isOptionListOpen, setIsOptionListOpen] = useState(false);
    const [optionItemChosen, setOptionItemChosen] = useState<Nullable<OptionListItem>>(null);
    const [inputPhrase, setInputPhrase] = useState('');
    const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
    const inlineDialogTriggerRef = useRef<HTMLButtonElement | null>(null);

    const RenderButtonIcon = useCallback(
        () => (isOptionListOpen ? <IconCaretUp /> : <IconCaretDown />),
        [isOptionListOpen],
    );

    const handleClose = () => {
        setIsOpen(false);
        setInputPhrase('');
        setOptionItemChosen(null);
        setFilteredOptionList(optionList);
    };

    const chooseOption = (code: string) => {
        setOptionItemChosen(optionList.find((option) => option.code === code) ?? null);

        setIsOptionListOpen(false);
    };

    const handleInput = (value: string) => {
        setInputPhrase(value);

        setFilteredOptionList(
            optionList.filter(
                (option) =>
                    option.label.toLowerCase().includes(value.toLowerCase()) ||
                    option.code.toLowerCase().includes(value.toLowerCase()),
            ),
        );
    };

    const SelectField = useCallback(
        ({ label }: { label?: string }) => (
            <div className="tw-flex tw-flex-row tw-w-full">
                <Text color="x-weak">{label}</Text>
            </div>
        ),
        [],
    );

    return (
        <div className="tw-inline-flex">
            <LegacyTooltip
                content="Triggering button"
                position={TooltipPosition.Right}
                enablePortal
                hoverDelay={50}
                enterDelay={300}
                triggerElement={
                    <Button ref={dialogTriggerRef} onClick={() => setIsOpen(!isOpen)}>
                        Dialog Trigger
                    </Button>
                }
                withArrow
            />
            <Dialog {...args} anchor={dialogTriggerRef} open={isOpen} handleClose={handleClose}>
                <DialogHeader onClose={() => setIsOpen(false)} padding="comfortable" title="Dialog content header" />
                <DialogBody>
                    <Box className="tw-p-10">
                        <Flex justify="start" alignContent="center">
                            <Tooltip content="Just some Information">
                                <IconExclamationMarkCircle16 />
                            </Tooltip>
                            <p>Information</p>
                        </Flex>
                        <button
                            onClick={() => setIsOptionListOpen(true)}
                            ref={inlineDialogTriggerRef}
                            className="tw-text-ellipsis tw-flex tw-items-center tw-h-9 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-bg-white dark:tw-bg-transparent tw-border-solid focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20 tw-justify-between tw-gap-x-3 tw-w-full"
                        >
                            {optionItemChosen ? (
                                <SelectField label={optionItemChosen.label} />
                            ) : (
                                <span>
                                    <span>Select option</span>
                                </span>
                            )}
                            <RenderButtonIcon />
                        </button>
                        <InlineDialog
                            anchor={inlineDialogTriggerRef}
                            open={isOptionListOpen}
                            flip
                            handleClose={() => setIsOptionListOpen(false)}
                            maxWidth={600}
                            minHeight={0}
                            minWidth={0}
                            width="100%"
                            autoHeight
                            modality={Modality.NonModal}
                            offset={[0, 8]}
                            placement="bottom-start"
                            enablePortal={false}
                        >
                            <div>
                                <div className="tw-w-[486px] tw-px-4 tw-py-2">
                                    <TextInput
                                        focusOnMount={true}
                                        decorator={<IconMagnifier size={IconSize.Size16} />}
                                        id="name"
                                        placeholder="Search"
                                        value={inputPhrase}
                                        onChange={(value) => handleInput(value)}
                                    />
                                </div>

                                {isOptionListOpen &&
                                    filteredOptionList.map((option) => (
                                        <MenuItem key={option.code} onClick={() => chooseOption(option.code)}>
                                            <SelectField label={option.label} />
                                        </MenuItem>
                                    ))}
                            </div>
                        </InlineDialog>
                    </Box>
                </DialogBody>
                <DialogFooter
                    actionButtons={[
                        {
                            children: 'Cancel',
                            emphasis: ButtonEmphasis.Default,
                            onClick: handleClose,
                        },
                        {
                            children: 'Confirm',
                            onClick: handleClose,
                        },
                    ]}
                />
            </Dialog>
        </div>
    );
};
export const WithTabsAndTopAlignment = WithTabsTemplate.bind({});
WithTabsAndTopAlignment.args = {
    verticalAlignment: 'top',
};

export const WithInlineDialogInside = WithInlineDialog.bind({});
WithInlineDialogInside.args = {
    modality: Modality.Modal,
    darkUnderlay: true,
};
