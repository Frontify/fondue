/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectGroupItem } from '@components/SelectGroupItem/SelectGroupItem';
import { Select } from './Select';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';

const SELECT_ID = '[data-test-id=fondue-select]';
// const SELECT_GROUP_ID = '[data-test-id=fondue-select-group]';
// const SELECT_ITEM_ID = '[data-test-id=fondue-select-item]';
const ITEMS: SelectItemProps[] = [
    { id: '1', value: 'value1' },
    { id: '2', value: 'value2' },
    { id: '3', value: 'value3' },
    { id: '4', value: 'value4' },
];

const BASE_COMPONENT = (
    <Select>
        <SelectGroupItem>
            {ITEMS.map((item) => (
                <SelectItem key={`${item.id}-key`} id={item.id} value={item.value} />
            ))}
        </SelectGroupItem>
    </Select>
);

describe('Select Component', () => {
    it('should render component', () => {
        cy.mount(BASE_COMPONENT);
        cy.get(SELECT_ID).as('Select');
        cy.get('@Select').should('exist');
    });

    it('should be visible', () => {
        cy.mount(BASE_COMPONENT);
        cy.get(SELECT_ID).as('Select');
        cy.get('@Select').should('be.visible');
    });
});
