/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TooltipIconTriggerStyle } from '@components/TooltipIcon';
import { IconReport } from '@foundation/Icon/Generated';
import { InputLabel } from './InputLabel';

const LABEL_TEXT = 'This is a fancy label.';
const LABEL_TOOLTIP = 'This is a fancy tooltip.';

const INPUT_LABEL_ID = '[data-test-id=input-label]';
const INPUT_LABEL_CONTAINER_ID = '[data-test-id=input-label-container]';
const TOOLTIP_ICON_TRIGGER_ID = '[data-test-id=tooltip-icon-trigger]';
const TOOLTIP_ID = '[data-test-id=tooltip]';
const INPUT_LABEL_REQUIRED_ID = '[data-test-id=input-label-required]';

describe('InputLabel Component', () => {
    it('should render label text correctly', () => {
        cy.mount(<InputLabel htmlFor="input">{LABEL_TEXT}</InputLabel>);

        cy.get(INPUT_LABEL_ID).should('contain', LABEL_TEXT);
        cy.get(INPUT_LABEL_CONTAINER_ID).should('have.class', 'tw-text-text-weak');
    });

    it('should render a required label', () => {
        cy.mount(
            <InputLabel htmlFor="input" required>
                {LABEL_TEXT}
            </InputLabel>,
        );

        cy.get(INPUT_LABEL_REQUIRED_ID).should('be.visible').and('contain', '*');
    });

    it('should render a disabled label', () => {
        cy.mount(
            <InputLabel htmlFor="input" disabled>
                {LABEL_TEXT}
            </InputLabel>,
        );

        cy.get(INPUT_LABEL_CONTAINER_ID).should('have.class', 'tw-text-text-disabled');
    });

    it('renders with a tooltip', () => {
        cy.mount(
            <InputLabel htmlFor="input" tooltip={{ content: LABEL_TOOLTIP }}>
                {LABEL_TEXT}
            </InputLabel>,
        );

        cy.get(TOOLTIP_ICON_TRIGGER_ID).realHover({ position: 'top' });
        cy.get(TOOLTIP_ID).should('exist');
    });

    it('renders with multiple tooltip triggers', () => {
        cy.mount(
            <InputLabel
                htmlFor="input"
                tooltip={[
                    { content: LABEL_TOOLTIP, triggerStyle: TooltipIconTriggerStyle.Danger },
                    { content: LABEL_TOOLTIP, triggerIcon: <IconReport /> },
                ]}
            >
                {LABEL_TEXT}
            </InputLabel>,
        );
        cy.get(TOOLTIP_ICON_TRIGGER_ID)
            .first()
            .should('have.class', 'tw-text-box-negative-inverse')
            .find('svg')
            .should('have.attr', 'name', 'IconQuestionMarkCircle16');
        cy.get(TOOLTIP_ICON_TRIGGER_ID)
            .last()
            .should('have.class', 'tw-text-text-weak')
            .find('svg')
            .should('have.attr', 'name', 'IconReport16');
    });
});
