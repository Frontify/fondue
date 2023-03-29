/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Box } from './Box';

const BOX_ID = '[data-test-id=fondue-box]';
const BOX_CONTENT = 'Hello!';
const BOX_TEST_CLASSNAME = 'tw-font-bold tw-flex';

describe('Box Box', () => {
    it('should exist', () => {
        cy.mount(<Box>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('exist');
    });

    it('should render the content', () => {
        cy.mount(<Box>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('contain', BOX_CONTENT);
    });

    it('should render with props', () => {
        cy.mount(<Box className={BOX_TEST_CLASSNAME}>{BOX_CONTENT}</Box>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-font-bold tw-flex');
    });
});
