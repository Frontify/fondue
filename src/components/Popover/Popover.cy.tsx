/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { PopperPlacement } from '@components/Popper/types';
import { Popover, PopoverProps } from '@components/Popover/Popover';

const POPOVER_SELECTOR = '[data-test-id=fondue-popover]';
const POPOVER_TRIGGER = '[data-test-id=popover-trigger]';
const POPOVER_INTERACTIVE_ELEMENT = '[data-test-id=popover-content-button]';

const PopoverComponent = ({ placement, offset, flip }: PopoverProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} placement={placement} offset={offset} flip={flip}>
            <Popover.Trigger>
                <Button data-test-id="popover-trigger" onClick={() => setOpen(!open)}>
                    Hello
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="tw-p-3">
                    <p>Some content</p>
                    <Button data-test-id="popover-content-button">Confirm</Button>
                </div>
            </Popover.Content>
        </Popover>
    );
};

describe('Popover Component', () => {
    it('should render the trigger', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Bottom} />);
        cy.get(POPOVER_TRIGGER).should('exist');
    });

    it('should render the popover', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Bottom} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).should('exist');
    });

    it('should render the popover in its initial Top placement', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Top} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
    });

    it('should render the popover with start alignment', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.BottomStart} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-start');
    });

    it('should render the popover with middle alignment', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Bottom} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
    });

    it('should render the popover with end alignment', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.BottomEnd} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-end');
    });

    it('should render the popover in its initial Right placement', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Right} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'right');
    });

    it('should flip if enabled', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Top} flip />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
    });

    it('should not flip if disabled', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Top} flip={false} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
    });

    it('should access interactive element with keyboard', () => {
        cy.mount(<PopoverComponent placement={PopperPlacement.Bottom} />);
        cy.get('body').realPress('Tab');
        cy.get(POPOVER_TRIGGER).should('be.focused');
        cy.get('body').realPress('Enter');
        cy.get(POPOVER_SELECTOR).should('exist');
        cy.get('body').realPress('Tab');
        cy.get(POPOVER_INTERACTIVE_ELEMENT).should('be.focused');
    });
});
