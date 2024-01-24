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
import { Card } from '@components/Card';
import { action } from '@storybook/addon-actions';
import IconJohanna24 from '@foundation/Icon/Generated/IconJohanna24';

export default {
    title: 'Components/Tooltip/In Context',
    tags: ['autodocs'],
} as Meta<TooltipProps>;

const WithinInlineDialogTemplate: StoryFn<TooltipProps> = () => {
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

const WithinInteractiveCardTemplate: StoryFn<TooltipProps> = () => {
    return (
        <Box className="tw-w-[200px]">
            <Card onClick={() => action('click')}>
                <Box className="tw-w-[200px] tw-h-[200px] tw-bg-box-neutral-mighty" />
                <Box className="tw-p-4">
                    <Tooltip content="Some Information">
                        <h5
                            data-test-id="heading"
                            className="tw-font-heading tw-max-w-full tw-font-medium tw-text-heading-large tw-text-text tw-no-underline tw-break-normal tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden"
                        >
                            <span>Lorem ipsum dolor sit amet</span>
                        </h5>
                    </Tooltip>
                </Box>
            </Card>
        </Box>
    );
};

const MultipleTooltipsTemplate: StoryFn<TooltipProps> = () => {
    return (
        <>
            <Tooltip leaveDelay={0} content="Some Information">
                <IconIcon24 />
            </Tooltip>
            <Tooltip leaveDelay={0} content="Something else">
                <IconJohanna24 />
            </Tooltip>
        </>
    );
};

const WithinATextTemplate: StoryFn<TooltipProps> = () => {
    return (
        <div>
            <span>
                Hover over the text to see the tooltip:{' '}
                {
                    <Tooltip content="Some Information">
                        <span className="tw-text-text-negative">Hover Me</span>
                    </Tooltip>
                }
                ...This is a tooltip
            </span>
        </div>
    );
};

const WrappingFondueButtonTemplate: StoryFn<TooltipProps> = () => {
    return (
        <Tooltip content="Some Information">
            <Button onClick={action('click')}>Hello</Button>
        </Tooltip>
    );
};

export const WithinInlineDialog = WithinInlineDialogTemplate.bind({});

export const WithinInteractiveCard = WithinInteractiveCardTemplate.bind({});

export const MultipleTooltips = MultipleTooltipsTemplate.bind({});

export const WithinAText = WithinATextTemplate.bind({});

export const WrappingFondueButton = WrappingFondueButtonTemplate.bind({});
