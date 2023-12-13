/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode, useState } from 'react';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { Box } from '@components/Box';
import { TextInput } from '@components/TextInput';

const TOGGLE_BUTTON = '[data-test-id=toggle-button]';
const FOCUS_TRAP_CONTAINER = '[data-test-id=focus-trap-container]';
const FIRST_BUTTON = '[data-test-id=first-focus-button]';
const SECOND_BUTTON = '[data-test-id=second-focus-button]';
const OUTSIDE_INPUT = '[data-test-id=outside-input]';

const FocusableComponent = ({
    children,
    ignoreFocusTrap = false,
}: {
    children?: ReactNode;
    ignoreFocusTrap?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { elementRef } = useFocusTrap<HTMLDivElement>(isOpen, ignoreFocusTrap);
    return (
        <div data-test-id="container">
            <Button data-test-id="toggle-button" onClick={() => setIsOpen(!isOpen)} style={ButtonStyle.Loud}>
                Toggle
            </Button>
            {isOpen && (
                <Box className="tw-my-6 tw-border tw-p-4">
                    <div ref={elementRef} data-test-id="focus-trap-container">
                        {children}
                    </div>
                </Box>
            )}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Box className="tw-mt-4" data-test-id="outside-input">
                <TextInput />
            </Box>
        </div>
    );
};

describe('Focus Trap', () => {
    it('should trap focus', () => {
        cy.mount(
            <FocusableComponent>
                <Button emphasis={ButtonEmphasis.Default} data-test-id="first-focus-button">
                    1st button
                </Button>
                <p className="tw-my-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores doloremque, illum ipsa
                    magnam necessitatibus nesciunt placeat sapiente sequi temporibus? Corporis culpa cumque dolorem
                    exercitationem modi nihil quasi quo reprehenderit?
                </p>
                <Button data-test-id="second-focus-button">2nd button</Button>
            </FocusableComponent>,
        );

        cy.get(TOGGLE_BUTTON).focus();
        cy.get(TOGGLE_BUTTON).realPress('Enter');
        cy.get(FOCUS_TRAP_CONTAINER).should('exist');
        cy.get('body').realPress('Tab');
        cy.get(FIRST_BUTTON).should('be.focused');
        cy.get('body').realPress('Tab');
        cy.get(SECOND_BUTTON).should('be.focused');
        cy.get('body').realPress('Tab');
        cy.get(FIRST_BUTTON).should('be.focused');
        cy.get('body').realPress(['Shift', 'Tab']);
        cy.get(SECOND_BUTTON).should('be.focused');
        cy.get('body').realPress('Tab');
        cy.get(OUTSIDE_INPUT).should('not.be.focused');
    });

    it('should ignore focus trap', () => {
        cy.mount(
            <FocusableComponent ignoreFocusTrap={true}>
                <Button emphasis={ButtonEmphasis.Default} data-test-id="first-focus-button">
                    1st button
                </Button>
                <p className="tw-my-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores doloremque, illum ipsa
                    magnam necessitatibus nesciunt placeat sapiente sequi temporibus? Corporis culpa cumque dolorem
                    exercitationem modi nihil quasi quo reprehenderit?
                </p>
            </FocusableComponent>,
        );

        cy.get(TOGGLE_BUTTON).focus();
        cy.get(TOGGLE_BUTTON).realPress('Enter');
        cy.get(FOCUS_TRAP_CONTAINER).should('exist');
        cy.get('body').realPress('Tab');
        cy.get(FIRST_BUTTON).should('be.focused');
        cy.get('body').realPress('Tab');
        cy.get(OUTSIDE_INPUT).find('input').should('be.focused');
    });

    it('should not trap focus when there are no focusable elements', () => {
        cy.mount(
            <FocusableComponent>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores doloremque, illum ipsa
                    magnam necessitatibus nesciunt placeat sapiente sequi temporibus? Corporis culpa cumque dolorem
                    exercitationem modi nihil quasi quo reprehenderit?
                </p>
            </FocusableComponent>,
        );

        cy.get(TOGGLE_BUTTON).focus();
        cy.get(TOGGLE_BUTTON).realPress('Enter');
        cy.get(FOCUS_TRAP_CONTAINER).should('exist');
        cy.get('body').realPress('Tab');
        cy.get(OUTSIDE_INPUT).find('input').should('be.focused');
    });
});
