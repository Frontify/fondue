/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { DialogHeader } from '@components/DialogHeader';
import { DialogBody } from '@components/DialogBody/DialogBody';
import { Dropdown } from '@components/Dropdown';
import { DialogFooter } from '@components/DialogFooter';
import { DialogHeaderSize, Modality } from '../../types/dialog';
import { Button, ButtonEmphasis } from '@components/Button';
import { useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { useToggleOverlay } from '@hooks/useToggleOverlay';

export default {
    title: 'Experimental/InlineDialog',
    component: InlineDialog,
    tags: ['autodocs'],
    argTypes: {
        modality: {
            options: Object.values(Modality),
            control: { type: 'select' },
        },
    },
} as Meta<InlineDialogProps>;

const Template: StoryFn<InlineDialogProps> = (args) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: args.modality === Modality.BlockingModal });
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLButtonElement | null>(null);
    const { maxHeight } = useDropdownAutoHeight({ current: triggerElementRef }, { isOpen, autoResize: true });
    return (
        <InlineDialog open={isOpen} maxHeight={maxHeight} handleClose={() => setIsOpen(false)} modality={args.modality}>
            <InlineDialog.Trigger>
                <Button ref={setTriggerElementRef} onClick={() => setIsOpen(!isOpen)}>
                    Trigger
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

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae, labore mollitia
                            nemo nobis perspiciatis repellendus ullam vero voluptatum. Amet cum dolorem hic molestias
                            tempora! Aliquam dolor exercitationem placeat veniam!
                        </p>
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
    );
};

export const Default = Template.bind({});
