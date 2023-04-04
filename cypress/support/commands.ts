/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);

//https://github.com/cypress-io/cypress/issues/8418#issuecomment-992564877
const resizeObserverLoopErrRe = /^[^ ()ORb-eilmopr-tvxz]/;
Cypress.on('uncaught:exception', (err) => {
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false;
    }
});
