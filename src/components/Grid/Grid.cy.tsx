/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Grid, GridProps } from './Grid';

const GRID_ID = '[data-test-id=fondue-grid]';
const GRID_INNER_WRAPPER_ID = '[data-test-id=fondue-grid-inner-wrapper]';
const GRID_ITEM_ID = '[data-test-id=fondue-grid-item]';
const GRID_ITEM_CONTENT_ID = '[data-test-id=fondue-grid-item-content]';
const CONTENT_STRING = 'Test';

const GridComponent = (props: GridProps): ReactElement => {
    return (
        <Grid {...props}>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
            <div>{CONTENT_STRING}</div>
        </Grid>
    );
};

describe('Grid Component', () => {
    it('should exist', () => {
        cy.mount(<GridComponent />);

        cy.get(GRID_ID).should('exist');
        cy.get(GRID_INNER_WRAPPER_ID).should('exist');
        cy.get(GRID_ITEM_ID).should('exist');
    });

    it('should render specified number of columns with appropriate width', () => {
        cy.mount(<GridComponent column={4} />);

        cy.get(GRID_ITEM_ID).first().should('have.css', 'flex-basis', '25%');
    });

    it('should render specified number of columns', () => {
        cy.mount(<GridComponent column={4} />);

        cy.get(GRID_ITEM_ID).first().should('have.css', 'flex-basis', '25%');
    });

    it('should render with specified margins', () => {
        cy.mount(<GridComponent margin={4} />);

        cy.get(GRID_ID).should('have.css', 'margin', '4px');
    });

    it('should render with specified padding', () => {
        cy.mount(<GridComponent padding={4} />);

        cy.get(GRID_ID).should('have.css', 'padding', '4px');
    });

    it('should render with specified horizontal spacing', () => {
        cy.mount(<GridComponent spacingX={8} />);

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'margin', '2px 4px');
    });

    it('should render with specified vertical spacing', () => {
        cy.mount(<GridComponent spacingY={8} />);

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'margin', '4px 2px');
    });

    it('should render rows with specified height', () => {
        cy.mount(<GridComponent rowHeight="100px" />);

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'height', '100px');
    });

    it('should render with specified width', () => {
        cy.mount(<GridComponent width="1000px" />);

        cy.get(GRID_ID).should('have.css', 'width', '1000px');
    });

    it('renders with proper box color tokens', () => {
        cy.mount(<GridComponent boxColorToken="box-neutral" />);

        cy.get(GRID_ID).should('have.class', 'tw-bg-box-neutral');
        cy.get(GRID_ID).should('have.class', 'tw-text-box-neutral-inverse');
    });

    it('throws an error if wrong box color token prefix is provided', (done) => {
        cy.on('uncaught:exception', (error) => {
            expect(error.message).to.include('boxColorToken should be one of the following values');
            done();
            return false;
        });
        cy.mount(<GridComponent boxColorToken="box-wrong-token" />);
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<GridComponent data-test-id="custom-container-test-id" />);

        cy.get('[data-test-id=custom-container-test-id]').as('Grid');
        cy.get('@Grid').should('exist');
    });
});
