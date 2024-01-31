/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox/Checkbox';
import { ReactElement, useState } from 'react';
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
const CHECKBOX_ID = '[data-test-id=checkbox-icon-box]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';

const Component = ({
    direction,
    columns,
    activeValues,
    setActiveValues,
    ariaLabel,
    'data-test-id': dataTestId,
}: {
    ariaLabel?: string;
    direction?: ChecklistDirection;
    columns?: Columns;
    activeValues?: string[];
    setActiveValues?: () => void;
    'data-test-id'?: string;
}): ReactElement => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>(activeValues ? activeValues : []);

    return (
        <Checklist
            ariaLabel={ariaLabel}
            data-test-id={dataTestId}
            activeValues={activeBoxes}
            setActiveValues={setActiveValues ? setActiveValues : setActiveBoxes}
            direction={direction ? direction : ChecklistDirection.Horizontal}
            columns={columns}
            checkboxes={CHECKBOXES}
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

    it('should render checked boxes specified in activeValues prop', () => {
        cy.mount(<Component activeValues={['checkbox-1']} />);

        cy.get(CHECKBOX_ID)
            .eq(0)
            .should('have.class', 'tw-bg-box-selected-strong')
            .and('have.class', 'tw-text-box-selected-strong-inverse')
            .and('have.class', 'hover:tw-bg-box-selected-strong-hover');

        cy.get(CHECKBOX_INPUT_ID).eq(0).should('have.attr', 'aria-checked', 'true');
    });

    it('should render with boxes specificied in checkboxes prop', () => {
        cy.mount(<Component />);

        cy.get(CHECKBOX_ID).eq(0).should('exist');
        cy.get(CHECKBOX_ID).eq(1).should('exist');
        cy.get(CHECKBOX_ID).eq(2).should('exist');

        cy.get(CHECKBOX_INPUT_ID).eq(0).should('exist');
        cy.get(CHECKBOX_INPUT_ID).eq(1).should('exist');
        cy.get(CHECKBOX_INPUT_ID).eq(2).should('exist');
    });

    it('should call setActiveValues when checkbox is checked', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Component setActiveValues={onClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(CHECKBOX_ID).eq(0).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should render with custom aria-label', () => {
        cy.mount(<Component ariaLabel="custom-aria-label" />);

        cy.get(CHECKLIST_ID).should('have.attr', 'aria-label', 'custom-aria-label');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<Component data-test-id="custom-data-test-id" />);

        cy.get('[data-test-id=custom-data-test-id]').should('exist');
    });

    it('should render disabled checkboxes', () => {
        cy.mount(<Component />);

        cy.get(CHECKBOX_ID)
            .eq(2)
            .should('have.class', 'tw-text-box-disabled-inverse')
            .and('have.class', 'tw-bg-box-disabled')
            .and('have.class', 'tw-pointer-events-none');
    });
});
