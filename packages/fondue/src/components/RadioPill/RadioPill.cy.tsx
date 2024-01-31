/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@foundation/Icon/Generated';
import { RadioPill } from './RadioPill';

const RADIOPILL_TEST_ID = '[data-test-id=radio-pill]';
const RADIOPILL_LABEL = 'Label';
const RADIOPILL_ICON = <IconIcon />;
const RADIOPILL_ICON_CODE = 'svg[name=IconIcon16]';

describe('RadioPill Component', () => {
    it('should render inactive radio pill without icon', () => {
        cy.mount(<RadioPill label={RADIOPILL_LABEL} active={false} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).get(RADIOPILL_ICON_CODE).should('not.exist');
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-bg-black-100');
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-text-white');
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-text-black-80');
    });

    it('should render active radio pill without icon', () => {
        cy.mount(<RadioPill label={RADIOPILL_LABEL} active={true} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-bg-black-100');
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-text-white');
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-text-black-80');
    });

    it('should render active radio pill with icon', () => {
        cy.mount(<RadioPill label={RADIOPILL_LABEL} active={true} icon={RADIOPILL_ICON} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).get(RADIOPILL_ICON_CODE).should('exist');
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-bg-black-100');
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-text-white');
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-text-black-80');
    });

    it('should render inactive radio pill with icon', () => {
        cy.mount(<RadioPill label={RADIOPILL_LABEL} active={false} icon={RADIOPILL_ICON} />);

        cy.get(RADIOPILL_TEST_ID).contains(RADIOPILL_LABEL);
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-bg-black-100');
        cy.get(RADIOPILL_TEST_ID).should('not.have.class', 'tw-text-white');
        cy.get(RADIOPILL_TEST_ID).should('have.class', 'tw-text-black-80');
    });
});
