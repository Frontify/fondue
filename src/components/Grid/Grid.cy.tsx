/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Grid } from './Grid';

const GRID_ID = '[data-test-id=fondue-grid]';
const GRID_INNER_WRAPPER_ID = '[data-test-id=fondue-grid-inner-wrapper]';
const GRID_ITEM_ID = '[data-test-id=fondue-grid-item]';
const GRID_ITEM_CONTENT_ID = '[data-test-id=fondue-grid-item-content]';
const CONTENT_STRING = 'Test';

describe('Grid Component', () => {
    it('should exist', () => {
        cy.mount(
            <Grid>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ID).should('exist');
        cy.get(GRID_INNER_WRAPPER_ID).should('exist');
        cy.get(GRID_ITEM_ID).should('exist');
    });

    it('should render specified number of columns with appropriate width', () => {
        cy.mount(
            <Grid column={4}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ITEM_ID).first().should('have.css', 'flex-basis', '25%');
    });

    it('should render specified number of columns', () => {
        cy.mount(
            <Grid column={4}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ITEM_ID).first().should('have.css', 'flex-basis', '25%');
    });

    it('should render with specified margins', () => {
        cy.mount(
            <Grid margin={4}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ID).should('have.css', 'margin', '4px');
    });

    it('should render with specified padding', () => {
        cy.mount(
            <Grid padding={4}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ID).should('have.css', 'padding', '4px');
    });

    it('should render with specified horizontal spacing', () => {
        cy.mount(
            <Grid spacingX={8}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'margin', '2px 4px');
    });

    it('should render with specified vertical spacing', () => {
        cy.mount(
            <Grid spacingY={8}>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'margin', '4px 2px');
    });

    it('should render rows with specified height', () => {
        cy.mount(
            <Grid rowHeight="100px">
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ITEM_CONTENT_ID).first().should('have.css', 'height', '100px');
    });

    it('should render with specified width', () => {
        cy.mount(
            <Grid width="1000px">
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ID).should('have.css', 'width', '1000px');
    });

    it('renders with proper box color tokens', () => {
        cy.mount(
            <Grid boxColorToken="box-neutral">
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get(GRID_ID).should('have.class', 'tw-bg-box-neutral');
        cy.get(GRID_ID).should('have.class', 'tw-text-box-neutral-inverse');
    });

    it('throws an error if wrong box color token prefix is provided', (done) => {
        cy.on('uncaught:exception', (error) => {
            expect(error.message).to.include('boxColorToken should be one of the following values');
            done();
            return false;
        });
        cy.mount(
            <Grid boxColorToken="box-wrong-token">
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );
    });

    it('should render with custom data-test-id', () => {
        cy.mount(
            <Grid data-test-id="custom-container-test-id">
                <div>{CONTENT_STRING}</div>
            </Grid>,
        );

        cy.get('[data-test-id=custom-container-test-id]').as('Grid');
        cy.get('@Grid').should('exist');
    });
});
