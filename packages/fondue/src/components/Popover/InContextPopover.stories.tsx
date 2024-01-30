/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Popover } from '@components/Popover/Popover';
import { Button } from '@components/Button';
import { Box } from '@components/Box';
import { OverlayProps } from '../../types';
import { useRef, useState } from 'react';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody';
import { DialogFooter } from '@components/DialogFooter';
import IconJohanna from '@foundation/Icon/Generated/IconJohanna';

export default {
    title: 'Experimental/Popover/In Context',
    Component: Popover,
    tags: ['autodocs'],
    args: {
        theme: 'light',
    },
} as Meta<OverlayProps>;

const WithInteractiveContentTemplate: StoryFn<OverlayProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-w-[400px]">
                    <DialogHeader title="Title" padding="compact"></DialogHeader>
                    <DialogBody padding="compact">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                    </DialogBody>
                    <DialogFooter
                        padding="compact"
                        actionButtons={[{ children: 'Confirm', onClick: () => setIsOpen(false) }]}
                    ></DialogFooter>
                </Box>
            </Popover>
        </div>
    );
};

export const WithHeaderAndFooter = WithInteractiveContentTemplate.bind({});
WithHeaderAndFooter.args = {};

export const WithHeaderAndFooterAndDarkTheme = WithInteractiveContentTemplate.bind({});
WithHeaderAndFooterAndDarkTheme.args = {
    theme: 'dark',
};
