/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { Button } from '@components/Button';
import { Popover } from '@components/Popover/Popover';

import { type OverlayProps } from '../../types';

const POPOVER_SELECTOR = '[data-test-id=fondue-popover-content]';
const POPOVER_TRIGGER = '[data-test-id=popover-trigger]';
const POPOVER_INTERACTIVE_ELEMENT = '[data-test-id=popover-content-button]';
const POPOVER_ARROW = '[data-test-id=popper-arrow]';

const PopoverComponent = (props: Omit<OverlayProps, 'open' | 'anchor' | 'handleClose'>) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Button ref={triggerRef} data-test-id="popover-trigger" onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popover handleClose={() => setOpen(false)} anchor={triggerRef} open={open} {...props}>
                <div className="tw-p-3">
                    <p>Some content</p>
                    <Button data-test-id="popover-content-button">Confirm</Button>
                </div>
            </Popover>
        </>
    );
};

describe('Popover Component', () => {
    it('should render the trigger', () => {
        cy.mount(<PopoverComponent placement="bottom" />);
        cy.get(POPOVER_TRIGGER).should('exist');
    });

    it('should render the popover', () => {
        cy.mount(<PopoverComponent placement="bottom" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).should('exist');
    });

    it('should render the popover in its initial Top placement', () => {
        cy.mount(<PopoverComponent placement="top" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
    });

    it('should render the popover with start alignment', () => {
        cy.mount(<PopoverComponent placement="bottom-start" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-start');
    });

    it('should render the popover with middle alignment', () => {
        cy.mount(<PopoverComponent placement="bottom" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
    });

    it('should render the popover with end alignment', () => {
        cy.mount(<PopoverComponent placement="bottom-end" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom-end');
    });

    it('should render the popover in its initial Right placement', () => {
        cy.mount(<PopoverComponent placement="right" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'right');
    });

    it('should flip if enabled', () => {
        cy.mount(<PopoverComponent placement="top" flip />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
    });

    it('should not flip if disabled', () => {
        cy.mount(<PopoverComponent placement="top" flip={false} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'top');
    });

    it('should access interactive element with keyboard', () => {
        cy.mount(<PopoverComponent placement="bottom" />);
        cy.get('body').realPress('Tab');
        cy.get(POPOVER_TRIGGER).should('be.focused');
        cy.get('body').realPress('Enter');
        cy.get(POPOVER_SELECTOR).should('exist');
        cy.get('body').realPress('Tab');
        cy.get(POPOVER_INTERACTIVE_ELEMENT).should('be.focused');
    });

    it('should close popover with Escape key', () => {
        cy.mount(<PopoverComponent placement="bottom" />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).should('exist');
        cy.get('body').realPress('Escape');
        cy.get(POPOVER_SELECTOR).should('not.exist');
    });

    it('should render the popover with arrow', () => {
        cy.mount(<PopoverComponent withArrow={true} />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_ARROW).should('exist');
    });

    it('should render in light theme', () => {
        cy.mount(<PopoverComponent />);
        cy.get(POPOVER_TRIGGER).click();
        cy.get(POPOVER_SELECTOR).should('have.class', 'tw-bg-base');
    });
});
