/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Menu } from './Menu';

const Menu_FOO = 'bar';

describe('Menu Component', () => {
    it('should render foo text correctly', () => {
        cy.mount(<Menu foo={Menu_FOO} />);

        cy.get('[data-test-id=menu]').as('Menu');

        cy.get('@Menu').contains(Menu_FOO);
    });
});
