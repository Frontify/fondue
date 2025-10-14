/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { Button } from '@components/Button';
import { DialogBody } from '@components/DialogBody';
import { DialogFooter } from '@components/DialogFooter';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';

import { Modality } from '../../types';

import { Dialog, type DialogProps } from './Dialog';

/**
 ### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead.
 */
export default {
    title: 'Experimental/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter
                    actionButtons={[
                        {
                            children: 'Close',
                            onClick: () => setIsOpen(false),
                        },
                    ]}
                ></DialogFooter>
            </Dialog>
        </>
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
