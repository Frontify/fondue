/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
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
});
