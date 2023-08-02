/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown';
import { DialogFooter } from '@components/DialogFooter';
import { Modality } from '../../types/dialog';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { action } from '@storybook/addon-actions';
import { Divider } from '@components/Divider';
import { Flex } from '@components/Flex';
import { Box } from '@components/Box';
import IconDotsVertical16 from '@foundation/Icon/Generated/IconDotsVertical16';
import { IconExclamationMarkCircle16 } from '@foundation/Icon/Generated';
import { Tooltip } from '@components/Tooltip';

export default {
    title: 'Experimental/Work In Progress/InlineDialog',
    component: InlineDialog,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        modality: Modality.Modal,
        offset: [0, 8],
        flip: true,
        minWidth: 0,
        maxWidth: 400,
        autoHeight: false,
        maxHeight: 'auto',
        minHeight: 0,
        darkUnderlay: false,
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        modality: {
            options: Object.values(Modality),
            control: { type: 'select' },
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
        zIndex: { table: { disable: true } },
    },
} as Meta<InlineDialogProps>;

const TextExample = () => {
    return (
        <p className="tw-my-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio
            praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis.
            Dicta, voluptatum.
        </p>
    );
};

const Template: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });
    return (
        <Box className="tw-w-fit">
            <InlineDialog
                open={isOpen}
                minHeight={args.minHeight}
                maxHeight={args.maxHeight}
                minWidth={args.minWidth}
                maxWidth={args.maxWidth}
                handleClose={() => setIsOpen(false)}
                modality={args.modality}
                placement={args.placement}
                flip={args.flip}
                offset={args.offset}
                enablePortal={args.enablePortal}
                darkUnderlay={args.darkUnderlay}
                autoHeight={args.autoHeight}
            >
                <InlineDialog.Trigger>
                    <Button
                        emphasis={ButtonEmphasis.Default}
                        icon={<IconDotsVertical16 />}
                        onClick={() => setIsOpen(!isOpen)}
                    ></Button>
                </InlineDialog.Trigger>
                <InlineDialog.Content>
                    <DialogBody>
                        <Box className="tw-p-4">
                            <Box className="tw-mb-2">
                                <Flex justify="start">
                                    <Tooltip
                                        triggerElement={
                                            <button aria-label="Exclamation mark circle icon" className="tw-mr-1">
                                                <IconExclamationMarkCircle16 />
                                            </button>
                                        }
                                        content="Just some Information"
                                    />
                                    <p>Information</p>
                                </Flex>
                            </Box>
                            <Dropdown
                                enablePortal={false}
                                onChange={(id) => console.log(id)}
                                activeItemId="1"
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

                            <TextExample />
                            <TextExample />
                            <TextExample />
                            <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                        </Box>
                    </DialogBody>
                </InlineDialog.Content>
            </InlineDialog>
        </Box>
    );
};

const NoFocusableContentTemplate: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: false });
    return (
        <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <InlineDialog
                open={isOpen}
                minHeight={args.minHeight}
                maxHeight={args.maxHeight}
                minWidth={args.minWidth}
                maxWidth={args.maxWidth}
                handleClose={() => setIsOpen(false)}
                modality={args.modality}
                placement={args.placement}
                flip={args.flip}
                offset={args.offset}
                enablePortal={args.enablePortal}
                darkUnderlay={args.darkUnderlay}
                autoHeight={args.autoHeight}
            >
                <InlineDialog.Trigger>
                    <Button
                        emphasis={ButtonEmphasis.Default}
                        icon={<IconDotsVertical16 />}
                        onClick={() => setIsOpen(!isOpen)}
                    ></Button>
                </InlineDialog.Trigger>
                <InlineDialog.Content>
                    <DialogBody>
                        <Box className="tw-p-4">
                            <TextExample />
                        </Box>
                    </DialogBody>
                </InlineDialog.Content>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>
    );
};

const InContext: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });
    return (
        <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <InlineDialog
                    open={isOpen}
                    minHeight={args.minHeight}
                    maxHeight={args.maxHeight}
                    minWidth={args.minWidth}
                    maxWidth={args.maxWidth}
                    handleClose={() => setIsOpen(false)}
                    modality={args.modality}
                    placement={args.placement}
                    flip={args.flip}
                    offset={args.offset}
                    enablePortal={args.enablePortal}
                    darkUnderlay={args.darkUnderlay}
                    autoHeight={args.autoHeight}
                >
                    <InlineDialog.Trigger>
                        <Button onClick={() => setIsOpen(!isOpen)}>InlineDialog Trigger</Button>
                    </InlineDialog.Trigger>
                    <InlineDialog.Content>
                        <DialogHeader title="Collaborator Settings" size="large" onClose={() => setIsOpen(false)} />
                        <DialogBody>
                            <div className="tw-p-2">
                                <Dropdown
                                    enablePortal={false}
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
                                <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                                <TextExample />
                                <TextExample />
                            </div>
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
                    </InlineDialog.Content>
                </InlineDialog>
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Strong} style={ButtonStyle.Loud}>
                    Button
                </Button>
            </Flex>
            <Divider />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <Button emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default} onClick={action('onClick')}>
                Focusable and Clickable Button
            </Button>
        </div>
    );
};

export const WithoutHeaderAndFooter = Template.bind({});
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

export const WithMaxHeight = Template.bind({});
WithMaxHeight.args = {
    maxHeight: 300,
};

export const WithAutoHeight = Template.bind({});
WithAutoHeight.args = {
    autoHeight: true,
};
export const InContextWithDialogHeaderAndDialogFooter = InContext.bind({});
export const WithNoFocusableContent = NoFocusableContentTemplate.bind({});
