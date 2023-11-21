/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dialog, DialogProps } from './Dialog';
import { Button, ButtonEmphasis } from '@components/Button';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Modality } from '../../types';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody';
import { DialogFooter } from '@components/DialogFooter';
import { TabItem, Tabs, TabsPaddingX } from '@components/Tabs';
import { Box } from '@components/Box';
import { LegacyTooltip, TooltipPosition } from '@components/LegacyTooltip';
import { IconCaretDown, IconCaretUp, IconMagnifier, IconSize } from '@foundation/Icon';
import { InlineDialog } from '@components/InlineDialog';
import { Text } from '@typography/Text';
import { MenuItem } from '@components/MenuItem';
import { Menu } from '@components/Menu';
import { TextInput } from '@components/TextInput';

export default {
    title: 'Experimental/Dialog',
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

const Template: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });

    return (
        <Dialog {...args} open={isOpen} handleClose={() => setIsOpen(false)}>
            <Dialog.Trigger>
                <Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <DialogHeader title="Heading" size="large" onClose={() => setIsOpen(false)} />
                <DialogBody>
                    <Box className="tw-p-10">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                            praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis
                            officiis perspiciatis quis tempora temporibus voluptates?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus
                            praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis
                            suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit.
                        </p>
                    </Box>
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
            </Dialog.Content>
        </Dialog>
    );
};

const WithChangingContentTemplate: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: false });
    const [showContent, setShowContent] = useState(false);

    return (
        <Dialog {...args} open={isOpen} handleClose={() => setIsOpen(false)}>
            <Dialog.Trigger>
                <Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <DialogHeader title="Heading" size="large" onClose={() => setIsOpen(false)} />
                <DialogBody>
                    <Box className="tw-p-10">
                        <Button onClick={() => setShowContent(!showContent)}>Show</Button>
                        {showContent && (
                            <Box className="tw-mt-3">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure
                                    numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex,
                                    modi nobis officiis perspiciatis quis tempora temporibus voluptates?
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                            </Box>
                        )}
                    </Box>
                </DialogBody>
            </Dialog.Content>
        </Dialog>
    );
};

const WithTabsTemplate: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });
    const [activeItemId, setActiveItemId] = useState('1');

    return (
        <Dialog {...args} open={isOpen} handleClose={() => setIsOpen(false)}>
            <Dialog.Trigger>
                <Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <DialogHeader title="Heading" size="large" onClose={() => setIsOpen(false)} collapseBottom />
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
            </Dialog.Content>
        </Dialog>
    );
};

type OptionListItem = {
    code: string;
    label: string;
};

const optionList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'German' },
];

const WithInlineDialog: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });
    const [filteredOptionList, setFilteredOptionList] = useState<OptionListItem[]>(optionList);
    const [isOptionListOpen, setOptionListOpen] = useState(false);
    const [optionItemChosen, setOptionItemChosen] = useState<Nullable<OptionListItem>>(null);
    const [inputPhrase, setInputPhrase] = useState('');

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

        setOptionListOpen(false);
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
            <Dialog {...args} open={isOpen} handleClose={handleClose}>
                <Dialog.Trigger>
                    <LegacyTooltip
                        content="Triggering button"
                        position={TooltipPosition.Right}
                        enablePortal
                        hoverDelay={50}
                        enterDelay={300}
                        triggerElement={<Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>}
                        withArrow
                    />
                </Dialog.Trigger>
                <Dialog.Content>
                    <DialogHeader onClose={() => setIsOpen(false)} size="large" title="Dialog content header" />
                    <DialogBody>
                        <Box className="tw-p-10">
                            <InlineDialog
                                open={isOptionListOpen}
                                flip
                                handleClose={() => setOptionListOpen(false)}
                                maxWidth={600}
                                minHeight={0}
                                minWidth={0}
                                autoHeight
                                modality={Modality.NonModal}
                                offset={[0, 8]}
                                placement="bottom-start"
                                enablePortal={false}
                            >
                                <InlineDialog.Trigger>
                                    <button
                                        onClick={() => setOptionListOpen(true)}
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
                                </InlineDialog.Trigger>
                                <InlineDialog.Content>
                                    <div>
                                        <Menu open={isOptionListOpen}>
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
                                            {filteredOptionList.map((option) => (
                                                <MenuItem key={option.code} onClick={() => chooseOption(option.code)}>
                                                    <SelectField label={option.label} />
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </InlineDialog.Content>
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
                </Dialog.Content>
            </Dialog>
        </div>
    );
};

export const AsANonModal = Template.bind({});
AsANonModal.args = {
    modality: Modality.NonModal,
};
export const AsAModal = Template.bind({});
AsAModal.args = {
    modality: Modality.Modal,
};
export const AsABlockingModalWithDarkUnderlay = Template.bind({});
AsABlockingModalWithDarkUnderlay.args = {
    modality: Modality.BlockingModal,
    darkUnderlay: true,
};
export const WithTabsAndTopAlignment = WithTabsTemplate.bind({});
WithTabsAndTopAlignment.args = {
    verticalAlignment: 'top',
};

export const WithInceptionOfInlineDialog = WithInlineDialog.bind({});
WithInceptionOfInlineDialog.args = {
    modality: Modality.BlockingModal,
    darkUnderlay: true,
};

export const WithChangingContent = WithChangingContentTemplate.bind({});
WithChangingContent.args = {
    verticalAlignment: 'top',
};
