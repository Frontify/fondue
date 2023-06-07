/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown';
import { DialogFooter } from '@components/DialogFooter';
import { DialogHeaderSize, Modality } from '../../types/dialog';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { action } from '@storybook/addon-actions';
import { Divider } from '@components/Divider';

export default {
    title: 'Experimental/InlineDialog',
    component: InlineDialog,
    tags: ['autodocs'],
    args: {
        offset: [0, 8],
        flip: false,
        maxWidth: 400,
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
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLButtonElement | null>(null);
    const { maxHeight } = useDropdownAutoHeight({ current: triggerElementRef }, { isOpen, autoResize: true });
    return (
        <div>
            <InlineDialog
                open={isOpen}
                maxHeight={maxHeight}
                maxWidth={args.maxWidth}
                handleClose={() => setIsOpen(false)}
                modality={args.modality}
                placement={args.placement}
                flip={args.flip}
                offset={args.offset}
                enablePortal={args.enablePortal}
            >
                <InlineDialog.Trigger>
                    <Button ref={setTriggerElementRef} onClick={() => setIsOpen(!isOpen)}>
                        InlineDialog Trigger
                    </Button>
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
                        </div>
                    </DialogBody>
                    <DialogFooter
                        buttons={[
                            { children: 'Cancel', emphasis: ButtonEmphasis.Default, onClick: () => setIsOpen(false) },
                            {
                                children: 'Confirm',
                                onClick: () => setIsOpen(false),
                            },
                        ]}
                    ></DialogFooter>
                </InlineDialog.Content>
            </InlineDialog>
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
