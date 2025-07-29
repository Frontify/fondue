/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { Box } from '@components/Box/Box';

import { Grid, type GridProps } from './Grid';

const GRID_ID = '[data-test-id=fondue-grid]';
const CONTENT_STRING = 'Test';

const GridComponent = (props: GridProps): ReactElement => {
    return (
        <Grid {...props}>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
            <Box>{CONTENT_STRING}</Box>
        </Grid>
    );
};

describe('Grid Component', () => {
    it('should exist', () => {
        cy.mount(<GridComponent />);

        cy.get(GRID_ID).should('exist');
    });

    it('should render specified number of columns', () => {
        cy.mount(<GridComponent width="400px" column={4} />);

        cy.get(GRID_ID).should('have.css', 'grid-template-columns', '97px 97px 97px 97px');
    });

    it('should render with specified margins', () => {
        cy.mount(<GridComponent margin={4} />);

        cy.get(GRID_ID).should('have.css', 'margin', '4px');
    });

    it('should render with specified X margins', () => {
        cy.mount(<GridComponent marginX={4} />);

        cy.get(GRID_ID).should('have.css', 'margin', '0px 4px');
    });

    it('should render with specified Y margins', () => {
        cy.mount(<GridComponent marginY={4} />);

        cy.get(GRID_ID).should('have.css', 'margin', '4px 0px');
    });

    it('should render with specified X & Y margins', () => {
        cy.mount(<GridComponent marginX={4} marginY={8} />);

        cy.get(GRID_ID).should('have.css', 'margin', '8px 4px');
    });

    it('should render with specified padding', () => {
        cy.mount(<GridComponent padding={4} />);

        cy.get(GRID_ID).should('have.css', 'padding', '4px');
    });

    it('should render with specified X padding', () => {
        cy.mount(<GridComponent paddingX={4} />);

        cy.get(GRID_ID).should('have.css', 'padding', '0px 4px');
    });

    it('should render with specified Y padding', () => {
        cy.mount(<GridComponent paddingY={4} />);

        cy.get(GRID_ID).should('have.css', 'padding', '4px 0px');
    });

    it('should render with specified X & Y padding', () => {
        cy.mount(<GridComponent paddingX={4} paddingY={8} />);

        cy.get(GRID_ID).should('have.css', 'padding', '8px 4px');
    });

    it('should render with specified spacing', () => {
        cy.mount(<GridComponent spacing={8} />);

        cy.get(GRID_ID).should('have.class', 'tw-gap-2');
    });

    it('should render with specified horizontal spacing', () => {
        cy.mount(<GridComponent spacingX={8} />);

        cy.get(GRID_ID).should('have.class', 'tw-gap-x-2');
    });

    it('should render with specified vertical spacing', () => {
        cy.mount(<GridComponent spacingY={8} />);

        cy.get(GRID_ID).should('have.class', 'tw-gap-y-2');
    });

    it('should render with specified horizontal & vertical spacing', () => {
        cy.mount(<GridComponent spacingX={8} spacingY={8} />);

        cy.get(GRID_ID).should('have.class', 'tw-gap-x-2 tw-gap-y-2');
    });

    it('should render rows with specified height', () => {
        cy.mount(<GridComponent rowHeight="100px" />);

        cy.get(GRID_ID).should('have.css', 'grid-template-rows', '100px 100px 100px 100px');
    });

    it('should render with specified width', () => {
        cy.mount(<GridComponent width="1000px" />);

        cy.get(GRID_ID).should('have.css', 'width', '1000px');
    });

    it('renders with proper box color tokens', () => {
        cy.mount(<GridComponent bg="tw-bg-box-neutral" />);

        cy.get(GRID_ID).should('have.class', 'tw-bg-box-neutral');
    });

    it('renders with proper text color tokens', () => {
        cy.mount(<GridComponent color="tw-text-box-neutral-inverse" />);

        cy.get(GRID_ID).should('have.class', 'tw-text-box-neutral-inverse');
    });

    it("renders with with 'as' prop", () => {
        cy.mount(<GridComponent as="span" />);

        cy.get(`span${GRID_ID}`).should('exist');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<GridComponent data-test-id="custom-container-test-id" />);

        cy.get('[data-test-id=custom-container-test-id]').as('Grid');
        cy.get('@Grid').should('exist');
    });
});
