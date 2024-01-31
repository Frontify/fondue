/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AddBlockButton, AddBlockButtonDirection, ButtonDirection } from './AddBlockButton';

const BUTTON_ID = '[data-test-id=add-block-button]';

describe('Add Block Button component', () => {
    it('reacts on click', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(BUTTON_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('renders with correct tokens', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} />);

        cy.get(`${BUTTON_ID} span`)
            .should('have.class', 'tw-text-box-selected-strong-inverse')
            .should('have.class', 'tw-bg-box-selected-strong')
            .should('have.class', 'tw-rounded')
            .should('have.class', 'tw-inline-flex')
            .should('have.class', 'tw-items-center')
            .should('have.class', 'tw-w-7')
            .should('have.class', 'tw-h-6')
            .should('have.class', 'tw-relative')
            .should('have.class', 'tw-p-1')
            .should('have.class', 'tw-transition-colors')
            .should('have.class', 'hover:tw-bg-box-selected-strong-hover')
            .should('have.class', 'hover:tw-text-box-selected-strong-inverse-hover')
            .should('have.class', 'group-active:tw-bg-box-selected-strong-pressed')
            .should('have.class', 'group-active:tw-text-bg-box-selected-strong-inverse-pressed');
    });

    it('renders with direction "Right" by default', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-0');
    });

    it('renders with direction "Bottom"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} direction={ButtonDirection.Bottom} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-90');
    });

    it('renders with direction "Left"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} direction={ButtonDirection.Left} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-180');
    });

    it('renders with direction "Top"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} direction={ButtonDirection.Top} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-[270deg]');
    });

    it('renders with orientation "Horizontal"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} orientation={AddBlockButtonDirection.Horizontal} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-0');
    });

    it('renders with orientation "Vertical"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} orientation={AddBlockButtonDirection.Vertical} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-90');
    });

    it('renders with direction "Top"', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} direction={ButtonDirection.Top} />);
        cy.get(BUTTON_ID).should('have.class', 'tw-rotate-[270deg]');
    });

    it('renders with custom title', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} title="test" />);
        cy.get(BUTTON_ID).should('have.attr', 'title', 'test');
    });

    it('renders with custom data-test-id', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<AddBlockButton onClick={onClickStub} data-test-id="test" />);
        cy.get('[data-test-id=test]').should('exist');
    });
});
