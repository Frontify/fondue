/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dialog, DialogProps } from './Dialog';
import { Button, ButtonEmphasis } from '@components/Button';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Modality } from '../../types/dialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody';
import { DialogFooter } from '@components/DialogFooter';
import { TabItem, Tabs, TabsPaddingX } from '@components/Tabs';
import { Box } from '@components/Box';

export default {
    title: 'Experimental/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    args: {
        modality: Modality.Modal,
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
