/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown';
import { DialogFooter } from '@components/DialogFooter';
import { DialogHeaderSize, Modality } from '../../types/dialog';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { action } from '@storybook/addon-actions';
import { Divider } from '@components/Divider';
import { Flex } from '@components/Flex';

export default {
    title: 'Experimental/InlineDialog',
    component: InlineDialog,
    tags: ['autodocs'],
    args: {
        offset: [0, 8],
        flip: true,
        maxWidth: 400,
        autoHeight: false,
        maxHeight: 'auto',
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
        <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <InlineDialog
                    open={isOpen}
                    maxHeight={args.maxHeight}
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
                        <DialogHeader
                            title="Collaborator Settings"
                            size={DialogHeaderSize.Large}
                            onClose={() => setIsOpen(false)}
                        />
                        <DialogBody>
                            <div className="tw-p-2">
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
                                <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                                <TextExample />
                                <TextExample />
                            </div>
                        </DialogBody>
                        <DialogFooter
                            buttons={[
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

export const Default = Template.bind({});
