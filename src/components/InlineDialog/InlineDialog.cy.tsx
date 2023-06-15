/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InlineDialog, InlineDialogProps } from './InlineDialog';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Modality } from '../../types/dialog';
import { Button, ButtonEmphasis } from '@components/Button';
import IconDotsVertical16 from '@foundation/Icon/Generated/IconDotsVertical16';
import { DialogBody } from '@components/DialogBody';
import { Box } from '@components/Box';
import { Dropdown } from '@components/Dropdown';

const INLINE_DIALOG_TRIGGER_SELECTOR = '[data-test-id=fondue-inlineDialog-trigger]';
const INLINE_DIALOG_SELECTOR = '[data-test-id=fondue-inlineDialog-content]';

const InlineDialogComponent = ({
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    modality,
    placement,
    flip,
    offset,
    enablePortal,
    darkUnderlay,
    autoHeight,
}: Omit<InlineDialogProps, 'open'>) => {
    const [isOpen, setIsOpen] = useToggleOverlay(false, { isBlockingModal: modality === Modality.BlockingModal });
    return (
        <InlineDialog
            open={isOpen}
            minHeight={minHeight}
            maxHeight={maxHeight}
            minWidth={minWidth}
            maxWidth={maxWidth}
            handleClose={() => setIsOpen(false)}
            modality={modality}
            placement={placement}
            flip={flip}
            offset={offset}
            enablePortal={enablePortal}
            darkUnderlay={darkUnderlay}
            autoHeight={autoHeight}
        >
            <InlineDialog.Trigger>
                <Button
                    emphasis={ButtonEmphasis.Default}
                    icon={<IconDotsVertical16 />}
                    onClick={() => setIsOpen(!isOpen)}
                ></Button>
            </InlineDialog.Trigger>
            <InlineDialog.Content>
                <DialogBody>
                    <Box className="tw-p-4">
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
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog.Content>
        </InlineDialog>
    );
};
describe('InlineDialog Component', () => {
    it('should open and render correctly with a trigger', () => {
        cy.mount(<InlineDialogComponent />);
        cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).should('exist');
        cy.get(INLINE_DIALOG_TRIGGER_SELECTOR).children().eq(0).click();
        cy.get(INLINE_DIALOG_SELECTOR).should('exist');
    });
});
