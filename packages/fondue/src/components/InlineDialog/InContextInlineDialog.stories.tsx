/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown';
import { DialogFooter } from '@components/DialogFooter';
import { Modality } from '../../types';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { POPPER_STORY_ARGS } from '@components/Popper/constantStories';
import { action } from '@storybook/addon-actions';
import { Divider } from '@components/Divider';
import { Flex } from '@components/Flex';
import { Box } from '@components/Box';
import IconDotsVertical16 from '@foundation/Icon/Generated/IconDotsVertical16';
import { useRef, useState } from 'react';

export default {
    title: 'Experimental/InlineDialog/In Context',
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

const NoFocusableContentTemplate: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <Button
                ref={triggerRef}
                emphasis={ButtonEmphasis.Default}
                icon={<IconDotsVertical16 />}
                onClick={() => setIsOpen(!isOpen)}
            >
                InlineDialog Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <TextExample />
                    </Box>
                </DialogBody>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>
    );
};

const InContext: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                    InlineDialog Trigger
                </Button>
                <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                    <DialogHeader title="Collaborator Settings" padding="compact" onClose={() => setIsOpen(false)} />
                    <DialogBody>
                        <div className="tw-p-2 tw-text-text">
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
                Button
            </Button>
        </div>
    );
};

export const WithNoFocusableContent = NoFocusableContentTemplate.bind({});
export const InContextWithDialogHeaderAndDialogFooter = InContext.bind({});
