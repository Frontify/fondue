/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import { useState } from 'react';
import { MultiSelect } from './MultiSelect';
import { TriggerEmphasis } from '@components/Trigger';

const TRIGGER_ID = '[data-test-id=trigger]';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TAG_ID = '[data-test-id=tag]';
const TAG_CLOSE_BUTTON = '[data-test-id=tag-reject-icon]';
const CHECKLIST_ID = '[data-test-id=checklist]';
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';

const ITEMS = {
    activeItemKeys: ['Short tag', 'Tag 74'],
    items: [
        {
            value: 'Checkbox label 1',
        },
        {
            value: 'Short tag',
        },
        {
            value: 'Checkbox label 2',
        },
        {
            value: 'Checkbox label 3',
        },
        {
            value: 'Tag 74',
        },
        {
            value: 'This is a long tag',
        },
    ],
};

type Props = {
    validation?: Validation;
    emphasis?: TriggerEmphasis;
    disabled?: boolean;
};

const Component = ({
    validation = Validation.Default,
    emphasis = TriggerEmphasis.Default,
    disabled = false,
}: Props) => {
    const [activeItems, setActiveItems] = useState<(string | number)[]>(ITEMS.activeItemKeys);
    return (
        <MultiSelect
            items={ITEMS.items}
            activeItemKeys={activeItems}
            onSelectionChange={(keys) => setActiveItems(keys)}
            validation={validation}
            emphasis={emphasis}
            disabled={disabled}
        />
    );
};

describe('MultiSelect Component', () => {
    it('renders with initial active items', () => {
        cy.mount(<Component />);

        cy.get(TAG_ID).should('have.length', 2);
        cy.get(TAG_ID).should('contain', 'Short tag').and('contain', 'Tag 74');
    });
    it('opens dropdown select list on click', () => {
        cy.mount(<Component />);

        cy.get(TRIGGER_ID).click();
        cy.get(CHECKLIST_ID).should('be.visible');
    });
    it('changes selection on click', () => {
        cy.mount(<Component />);
        cy.get(TRIGGER_ID).click();

        cy.get(CHECKBOX_ID).first().find(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get(CHECKBOX_ID).find('svg').invoke('attr', 'name').should('eq', 'IconCheckMark16');
        cy.get(TAG_ID).contains('Checkbox label 1');

        cy.get(CHECKBOX_ID).eq(1).find(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get(CHECKBOX_ID).eq(1).find('svg').should('not.exist');
        cy.get(TRIGGER_ID).contains('Short tag').should('not.exist');
        cy.get(TAG_ID).first().click();

        cy.get(CHECKBOX_ID).eq(1).find('svg').should('not.exist');

        cy.get(CHECKBOX_ID).eq(2).find(CHECKBOX_INPUT_ID).click({ force: true });
        cy.get(CHECKBOX_ID).eq(2).find('svg').invoke('attr', 'name').should('eq', 'IconCheckMark16');
        cy.get(TAG_ID).contains('Checkbox label 2');
    });

    it('should show triangle exclamation icon in case of error or warning validation states', () => {
        for (const validationState of Object.values(Validation)) {
            if (validationState === Validation.Error || validationState === Validation.Warning) {
                cy.mount(<Component validation={validationState} />);
                cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
                return;
            }
            cy.mount(<Component validation={validationState} />);
            cy.get(TRIGGER_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
        }
    });

    it('should render Trigger Weak emphasis', () => {
        cy.mount(<Component emphasis={TriggerEmphasis.Weak} />);
        cy.get(TRIGGER_ID).should('have.class', 'tw-border-0');
    });

    it('when disabled, should hide close buttons from tags', () => {
        cy.mount(<Component disabled={true} />);
        cy.get(TAG_CLOSE_BUTTON).should('not.exist');
    });
});
