/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useRef, useState } from 'react';

import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { POPPER_STORY_ARGS } from '@components/Popper/constantStories';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';

import { Modality } from '../../types';

import { InlineDialog, type InlineDialogProps } from './InlineDialog';

export default {
    title: 'Experimental/InlineDialog',
    component: InlineDialog,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        modality: Modality.Modal,
        offset: [0, 8],
        flip: true,
        width: 360,
        minWidth: 360,
        maxWidth: 360,
        autoHeight: false,
        maxHeight: 'auto',
        minHeight: 0,
        roundedCorners: true,
        strategy: 'absolute',
        enablePortal: false,
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
        autoHeight: {
            type: 'boolean',
        },
        roundedCorners: {
            type: 'boolean',
        },
        zIndex: { table: { disable: true } },
        unsafe_zIndex: {
            type: 'number',
        },
    },
} as Meta<InlineDialogProps>;

const TextExample = () => {
    return (
        <p className="tw-my-2 tw-text-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio
            praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis.
            Dicta, voluptatum.
        </p>
    );
};

const Template: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>
    );
};

export const Default = Template.bind({});
export const AsANonModal = Template.bind({});
AsANonModal.args = {
    modality: Modality.NonModal,
};
export const AsAModal = Template.bind({});
AsAModal.args = {
    modality: Modality.Modal,
};
export const AsABlockingModal = Template.bind({});
AsABlockingModal.args = {
    modality: Modality.BlockingModal,
};

export const WithMaxHeight = Template.bind({});
WithMaxHeight.args = {
    maxHeight: 300,
};

export const WithAutoHeight = Template.bind({});
WithAutoHeight.args = {
    autoHeight: true,
};

export const WithNoRoundedCorners = Template.bind({});
WithNoRoundedCorners.args = {
    roundedCorners: false,
};
