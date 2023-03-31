/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { PopperPlacement } from '@components/Popper/types';
import { Popover, PopoverProps } from '@components/Popover/Popover';

const popover_SELECTOR = '[data-test-id=fondue-popover]';

const PopoverComponent = ({ placement, offset, flip }: PopoverProps) => {
    const [open, setOpen] = useState(true);

    return (
        <Popover open={open} placement={placement} offset={offset} flip={flip}>
            <Popover.Trigger>
                <Button onClick={() => setOpen(!open)}>Hello</Button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="tw-border tw-border-black">
                    <p>Some content</p>
                </div>
            </Popover.Content>
        </Popover>
    );
};

describe('Popover Component', () => {
    it('should render', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Bottom} flip={false} offset={[0, 10]} />);

        cy.get(popover_SELECTOR).should('exist');
    });
});
