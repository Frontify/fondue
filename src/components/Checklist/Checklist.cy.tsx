/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox/Checkbox';
import React, { ReactElement, useState } from 'react';
import { Checklist, ChecklistDirection, Columns } from './Checklist';

const CHECKBOXES = [
    {
        value: 'checkbox-1',
        label: 'Checkbox label',
    },
    {
        value: 'checkbox-2',
        label: 'Checkbox label',
        state: CheckboxState.Mixed,
    },
    {
        value: 'checkbox-3',
        label: 'Checkbox label',
        note: 'Note about this input',
        disabled: true,
    },
];

const CHECKLIST_ID = '[data-test-id=checklist]';

const Component = ({ direction, columns }: { direction: ChecklistDirection; columns?: Columns }): ReactElement => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

    return direction === ChecklistDirection.Horizontal ? (
        <Checklist
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
            direction={direction}
            checkboxes={CHECKBOXES}
        />
    ) : (
        <Checklist
            activeValues={activeBoxes}
            setActiveValues={setActiveBoxes}
            direction={direction}
            checkboxes={CHECKBOXES}
            columns={columns}
        />
    );
};

describe('Checklist Component', () => {
    it('should render the Checklist horizontally', () => {
        cy.mount(<Component direction={ChecklistDirection.Horizontal} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-flex');
    });

    it('should render the Checklist vertically', () => {
        cy.mount(<Component direction={ChecklistDirection.Vertical} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid');
    });

    it('should render the Checklist with one column by default', () => {
        cy.mount(<Component direction={ChecklistDirection.Vertical} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-1');
    });

    it('should render the Checklist with two columns', () => {
        cy.mount(<Component direction={ChecklistDirection.Vertical} columns={2} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-2');
    });

    it('should render the Checklist with three columns', () => {
        cy.mount(<Component direction={ChecklistDirection.Vertical} columns={3} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-3');
    });

    it('should render the Checklist with four columns', () => {
        cy.mount(<Component direction={ChecklistDirection.Vertical} columns={4} />);

        cy.get(CHECKLIST_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-4');
    });
});
