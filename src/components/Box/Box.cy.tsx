/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Box } from './Box';

const Component: FC<JSX.IntrinsicElements['div']> = (props) => {
    return <Box {...props}></Box>;
};

const BOX_ID = '[data-test-id=fondue-box]';
const BOX_CONTENT = 'Hello!';
const BOX_TEST_CLASSNAME = 'tw-font-bold tw-flex';

describe('Box Component', () => {
    it('should exist', () => {
        cy.mount(<Component>{BOX_CONTENT}</Component>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('exist');
    });

    it('should render the content', () => {
        cy.mount(<Component>{BOX_CONTENT}</Component>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('contain', BOX_CONTENT);
    });

    it('should render with props', () => {
        cy.mount(<Component className={BOX_TEST_CLASSNAME}>{BOX_CONTENT}</Component>);

        cy.get(BOX_ID).as('Box');
        cy.get('@Box').should('have.attr', 'class', 'tw-font-bold tw-flex');
    });
});
