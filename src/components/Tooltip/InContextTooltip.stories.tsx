/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Tooltip, TooltipProps } from '@components/Tooltip/Tooltip';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';
import { InlineDialog } from '@components/InlineDialog';
import { Button } from '@components/Button';
import { Box } from '@components/Box';
import { Flex } from '@components/Flex';
import { Dropdown } from '@components/Dropdown';
import { DialogBody } from '@components/DialogBody';
import { useRef, useState } from 'react';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';

export default {
    title: 'Components/Tooltip/In Context',
    tags: ['autodocs'],
} as Meta<TooltipProps>;

const InContextTemplate: StoryFn<TooltipProps> = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Flex justify="center">
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsDialogOpen(!isDialogOpen)}>
                Open InlineDialog
            </Button>
            <InlineDialog handleClose={() => setIsDialogOpen(false)} anchor={triggerRef} open={isDialogOpen}>
                <DialogBody padding="comfortable">
                    <Box className="tw-mb-2">
                        <Flex justify="start">
                            <Tooltip content="Some Information">
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

                    <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </DialogBody>
            </InlineDialog>
        </Flex>
    );
};

export const WithinInlineDialog = InContextTemplate.bind({});
