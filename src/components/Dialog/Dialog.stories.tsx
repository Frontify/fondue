/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dialog, DialogPosition, DialogProps } from '@components/Dialog';
import { DialogHeader, DialogHeaderSize } from '@components/DialogHeader';
import { DialogFooter } from '@components/DialogFooter';
import { Button } from '@components/Button';
import { TooltipIcon } from '@components/TooltipIcon';
import { Dropdown } from '@components/Dropdown';
import { IconExclamationMarkCircle } from '@foundation/Icon';

export default {
    title: 'Components/Dialog',
    component: Dialog,
    args: {
        flip: false,
    },
    argTypes: {
        position: {
            options: Object.values(DialogPosition),
            control: { type: 'select' },
            defaultValue: DialogPosition.BottomStart,
        },
    },
} as Meta<DialogProps>;

const Template: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Button</Button>
            {isOpen && (
                <Dialog {...args}>
                    <DialogHeader
                        title="Collaborator Settings"
                        close={true}
                        size={DialogHeaderSize.Large}
                        onClose={() => setIsOpen(false)}
                    />
                    <div className="tw-p-4">
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
                        <p className="tw-flex tw-items-center tw-my-2">
                            Label 2
                            <span className="tw-ml-2">
                                <TooltipIcon
                                    tooltip={{ content: 'Lorem ipsum dolor sit amet.' }}
                                    triggerIcon={<IconExclamationMarkCircle />}
                                />
                            </span>
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                    </div>
                    <DialogFooter
                        buttons={[
                            { label: 'Cancel', action: () => setIsOpen(false) },
                            {
                                label: 'Confirm',
                                action: () => console.log('confirm'),
                            },
                        ]}
                    ></DialogFooter>
                </Dialog>
            )}
        </>
    );
};

export const Default = Template.bind({});

Default.args = {};
