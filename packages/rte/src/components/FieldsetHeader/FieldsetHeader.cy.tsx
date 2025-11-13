/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeader, FieldsetHeaderType } from './FieldsetHeader';

const HEADING = 'bar';
const FIELDSET_HEADER_ID = '[data-test-id=fieldset-header]';

describe('FieldsetHeader Composition', () => {
    it('should not fire click handler if disabled', () => {
        const onClick = cy.stub().as('onClickStub');

        cy.mount(
            <FieldsetHeader type={FieldsetHeaderType.Switch} onClick={onClick} disabled>
                {HEADING}
            </FieldsetHeader>,
        );

        cy.get(FIELDSET_HEADER_ID).as('FieldsetHeader');

        cy.get('@onClickStub').should('not.be.called');
    });
});
