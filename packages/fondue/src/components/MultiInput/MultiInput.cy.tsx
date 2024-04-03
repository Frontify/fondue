/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@components/TextInput/TextInput';

import { MultiInput, MultiInputLayout } from './MultiInput';

const MULTI_INPUT_COLUMNS_ID = '[data-test-id=multi-input-grid-columns]';
const MULTI_INPUT_SPIDER_ID = '[data-test-id=multi-input-grid-spider]';

describe('Multi Input Component', () => {
    it('should render the Multi Input with columns', () => {
        cy.mount(
            <MultiInput layout={MultiInputLayout.Columns}>
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
            </MultiInput>,
        );

        cy.get(MULTI_INPUT_COLUMNS_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-2');
    });

    it('should render the Multi Input with spider layout', () => {
        cy.mount(
            <MultiInput layout={MultiInputLayout.Spider}>
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
            </MultiInput>,
        );

        cy.get(MULTI_INPUT_SPIDER_ID).should('have.class', 'tw-grid').and('have.class', 'tw-grid-cols-4');
    });

    it('should render the Multi Input with the last child spanning two columns', () => {
        cy.mount(
            <MultiInput layout={MultiInputLayout.Columns} spanLastItem={true}>
                <TextInput />
                <TextInput />
                <TextInput />
            </MultiInput>,
        );

        cy.get(MULTI_INPUT_COLUMNS_ID).children().last().should('have.class', 'tw-col-span-2');
    });
});
