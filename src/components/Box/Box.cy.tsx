/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from './Box';

const BOX_ID = '[data-test-id=fondue-box]';
const BOX_CONTENT = 'Hello!';
const BOX_ARIA_LABEL = 'Aria Label';
const BOX_TEST_CLASSNAME = 'tw-font-bold tw-flex';

describe('Box Box', () => {
    it('should render the content', () => {
        cy.mount(<Box>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('exist');
        cy.get('@Box').should('contain', BOX_CONTENT);
    });

    it('should render with className prop', () => {
        cy.mount(<Box className={BOX_TEST_CLASSNAME}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', BOX_TEST_CLASSNAME);
    });

    it('should render with aria-label prop', () => {
        cy.mount(<Box aria-label={BOX_ARIA_LABEL}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'aria-label', BOX_ARIA_LABEL);
    });

    it('should render as span tag', () => {
        cy.mount(<Box as="span">{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).first().should('have.prop', 'tagName', 'SPAN');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<Box data-test-id="custom-box-test-id">{BOX_CONTENT}</Box>);

        cy.get('[data-test-id=custom-box-test-id]').as('Box');
        cy.get('@Box').should('exist');
        cy.get('@Box').should('contain', BOX_CONTENT);
    });

    it('should render with padding classNames', () => {
        cy.mount(<Box padding={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-p-2');
    });

    it('should render with paddingX classNames', () => {
        cy.mount(<Box paddingX={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-px-2');
    });

    it('should render with paddingY classNames', () => {
        cy.mount(<Box paddingY={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-py-2');
    });

    it('should render with paddingX & paddingY classNames', () => {
        cy.mount(
            <Box paddingX={16} paddingY={8}>
                {BOX_CONTENT}
            </Box>,
        );

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-px-4 tw-py-2');
    });

    it('should render with specified padding css', () => {
        cy.mount(<Box padding={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'padding', '8px');
    });

    it('should render with specified X padding css', () => {
        cy.mount(<Box paddingX={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'padding', '0px 8px');
    });

    it('should render with specified Y padding css', () => {
        cy.mount(<Box paddingY={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'padding', '8px 0px');
    });

    it('should render with specified X & Y padding css', () => {
        cy.mount(
            <Box paddingY={8} paddingX={12}>
                {BOX_CONTENT}
            </Box>,
        );

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'padding', '8px 12px');
    });

    it('should render with margin classNames', () => {
        cy.mount(<Box margin={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-m-2');
    });

    it('should render with specified marginX classNames', () => {
        cy.mount(<Box marginX={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-mx-2');
    });

    it('should render with specified marginY classNames', () => {
        cy.mount(<Box marginY={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-my-2');
    });

    it('should render with specified marginX & marginY classNames', () => {
        cy.mount(
            <Box marginX={16} marginY={8}>
                {BOX_CONTENT}
            </Box>,
        );

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-mx-4 tw-my-2');
    });

    it('should render with specified margin css', () => {
        cy.mount(<Box margin={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'margin', '8px');
    });

    it('should render with specified X margin css', () => {
        cy.mount(<Box marginX={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'margin', '0px 8px');
    });

    it('should render with specified Y margin css', () => {
        cy.mount(<Box marginY={8}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'margin', '8px 0px');
    });

    it('should render with specified X & Y margin css', () => {
        cy.mount(
            <Box marginY={8} marginX={12}>
                {BOX_CONTENT}
            </Box>,
        );

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.css', 'margin', '8px 12px');
    });
});
