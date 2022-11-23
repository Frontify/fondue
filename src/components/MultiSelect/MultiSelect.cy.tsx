/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import React, { FC, useState } from 'react';
import { MultiSelect } from './MultiSelect';

const TRIGGER_ID = '[data-test-id=trigger]';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';
const TAG_ID = '[data-test-id=tag]';
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
};

const Component: FC<Props> = ({ validation = Validation.Default }: Props) => {
    const [activeItems, setActiveItems] = useState<(string | number)[]>(ITEMS.activeItemKeys);
    return (
        <MultiSelect
            items={ITEMS.items}
            activeItemKeys={activeItems}
            onSelectionChange={(keys) => setActiveItems(keys)}
            validation={validation}
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

        cy.get(CHECKBOX_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).first().should('have.attr', 'aria-checked', 'true');
        cy.get(TAG_ID).contains('Checkbox label 1');

        cy.get(CHECKBOX_ID).eq(1).click();
        cy.get(CHECKBOX_INPUT_ID).eq(1).should('have.attr', 'aria-checked', 'false');
        cy.get(TRIGGER_ID).contains('Short tag').should('not.exist');
        cy.get(TAG_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).eq(1).should('have.attr', 'aria-checked', 'false');

        cy.get(CHECKBOX_ID).eq(2).click();
        cy.get(CHECKBOX_INPUT_ID).eq(2).should('have.attr', 'aria-checked', 'true');
        cy.get(TAG_ID).contains('Checkbox label 2');
    });

    it('only error validation state should show the triangle warning icon', () => {
        Object.values(Validation).forEach((validationState: Validation) => {
            if (validationState === Validation.Error) {
                cy.mount(<Component validation={validationState} />);
                cy.get(EXCLAMATION_MARK_ICON_ID).should('be.visible');
                return;
            }
            cy.mount(<Component validation={validationState} />);
            cy.get(TRIGGER_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
        });
    });
});
