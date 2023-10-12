/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { POPPER_STORY_ARGS } from '@components/Popper/types';
import { Tooltip, TooltipProps } from '@components/Tooltip/Tooltip';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';
import { InlineDialog } from '@components/InlineDialog';
import { Button } from '@components/Button';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Box } from '@components/Box';
import { Flex } from '@components/Flex';
import { Dropdown } from '@components/Dropdown';
import { DialogBody } from '@components/DialogBody';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: {
        placement: 'bottom-start',
        offset: [0, 8],
        flip: true,
        content: 'Your text here',
        withArrow: true,
        size: 'spacious',
        openOnMount: false,
        enablePortal: true,
        maxWidth: 200,
        maxHeight: 'auto',
        'data-test-id': 'fondue-tooltip',
        disabled: false,
        enterDelay: 0,
        leaveDelay: 200,
    },
    argTypes: {
        ...POPPER_STORY_ARGS,
        size: {
            options: ['spacious', 'compact'],
            control: { type: 'select' },
        },
        withArrow: {
            control: { type: 'boolean' },
        },
        openOnMount: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
} as Meta<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => (
    <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>
);

const InContextTemplate: StoryFn<TooltipProps> = (args) => {
    const [isDialogOpen, setIsDialogOpen] = useToggleOverlay(false);
    return (
        <InlineDialog open={isDialogOpen}>
            <InlineDialog.Trigger>
                <Button onClick={() => setIsDialogOpen(!isDialogOpen)}>Hello</Button>
            </InlineDialog.Trigger>
            <InlineDialog.Content>
                <DialogBody>
                    <Box className="tw-p-4">
                        <Box className="tw-mb-2">
                            <Flex justify="start">
                                <Tooltip {...args}>
                                    <IconIcon24 />
                                </Tooltip>
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
                        <p className="tw-my-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur eveniet harum iste
                            officia totam unde ut. Aperiam earum laborum nesciunt numquam perferendis ratione, ut.
                            Asperiores cumque minima nemo officia rerum!
                        </p>

                        <Button onClick={() => setIsDialogOpen(!isDialogOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog.Content>
        </InlineDialog>
    );
};

export const Default = Template.bind({});
export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
    openOnMount: true,
};
export const WithLineBreak = Template.bind({});
WithLineBreak.args = {
    content: 'This is a<br>sample text<br />with line breaks\nin it',
};
export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

export const InContext = InContextTemplate.bind({});
