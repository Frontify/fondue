/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { IconCross } from '@foundation/Icon/Generated';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup Composition', () => {
    it('should render a button group with correct spacing for small buttons', () => {
        cy.mount(
            <ButtonGroup size={ButtonSize.Small}>
                <Button>First, Small Button</Button>
                <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Default}>
                    The Second, Small Button
                </Button>
                <Button icon={<IconCross />} style={ButtonStyle.Danger}>
                    And The Third, Small Button
                </Button>
            </ButtonGroup>,
        );

        cy.get('[data-test-id=button-group]').as('ButtonGroup');

        cy.get('@ButtonGroup').should('have.class', 'tw-gap-x-1');
    });

    it('should render a button group with correct spacing for medium buttons', () => {
        cy.mount(
            <ButtonGroup size={ButtonSize.Medium}>
                <Button>First, Medium Button</Button>
                <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Default}>
                    The Second, Medium Button
                </Button>
                <Button icon={<IconCross />} style={ButtonStyle.Danger}>
                    And The Third, Medium Button
                </Button>
            </ButtonGroup>,
        );

        cy.get('[data-test-id=button-group]').as('ButtonGroup');

        cy.get('@ButtonGroup').should('have.class', 'tw-gap-x-2');
    });

    it('should render a button group with correct spacing for large buttons', () => {
        cy.mount(
            <ButtonGroup size={ButtonSize.Large}>
                <Button>First, Large Button</Button>
                <Button style={ButtonStyle.Default} emphasis={ButtonEmphasis.Default}>
                    The Second, Large Button
                </Button>
                <Button icon={<IconCross />} style={ButtonStyle.Danger}>
                    And The Third, Large Button
                </Button>
            </ButtonGroup>,
        );

        cy.get('[data-test-id=button-group]').as('ButtonGroup');

        cy.get('@ButtonGroup').should('have.class', 'tw-gap-x-3');
    });

    it("enforces the same size for all buttons according to the group's size", () => {
        cy.mount(
            <ButtonGroup size={ButtonSize.Large}>
                <Button size={ButtonSize.Small}>The First</Button>
                <Button size={ButtonSize.Medium} style={ButtonStyle.Default} emphasis={ButtonEmphasis.Default}>
                    The Second
                </Button>
                <Button size={ButtonSize.Large} icon={<IconCross />} style={ButtonStyle.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get('[data-test-id=button-group]').as('ButtonGroup');

        cy.get('@ButtonGroup').children().should('have.class', 'tw-h-12');
    });
});
