/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import React, { FC, useState } from 'react';
import { BreadcrumbsProps } from '.';
import { Breadcrumbs } from './Breadcrumbs';

beforeEach('Getting the seperator', () => {
    cy.intercept('GET', '/img/diagonal-line.svg', '/public/img/diagonal-line.svg');
});

const BREADCRUMB_ITEM_ID = '[data-test-id=breadcrumb-item]';
const BREADCRUMB_ITEMS = [
    { label: 'Some first label', link: '/some-first-link' },
    { label: 'Some second label', link: '/some-second-link' },
    { label: 'Some third label', link: '/some-third-link' },
];

const ChangingBreadcrumbs: FC<BreadcrumbsProps> = () => {
    const [items, setItems] = useState(BREADCRUMB_ITEMS);

    return (
        <div>
            <Breadcrumbs items={items} />
            <button
                data-test-id="add-item-button"
                onClick={() => {
                    setItems((items) => [...items, { label: 'Some fourth label', link: '/some-fourth-link' }]);
                }}
            >
                Add Block
            </button>
        </div>
    );
};

describe('Breadcrumb component', () => {
    it('should render single item as current', () => {
        mount(<Breadcrumbs items={[BREADCRUMB_ITEMS[0]]} />);

        cy.get(BREADCRUMB_ITEM_ID).should('have.length', 1);
        cy.get(BREADCRUMB_ITEM_ID).find('a').should('have.attr', 'aria-current', 'page');
    });

    it('should render the last item as current', () => {
        mount(<Breadcrumbs items={BREADCRUMB_ITEMS} />);

        cy.get(BREADCRUMB_ITEM_ID).should('have.length', 3);
        cy.get(BREADCRUMB_ITEM_ID).eq(2).find('a').should('have.attr', 'aria-current', 'page');
    });

    it('should render item with onClick action', () => {
        const onClickStub = cy.stub().as('onClickStub');
        const ITEMS_WITH_ON_CLICK = [...BREADCRUMB_ITEMS, { label: 'Some fourth label', onClick: onClickStub }];

        mount(<Breadcrumbs items={ITEMS_WITH_ON_CLICK} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(BREADCRUMB_ITEM_ID).last().get('button').click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should correctly navigate with keyboard', () => {
        const onClickStub = cy.stub().as('onClickStub');
        const ITEMS_WITH_ON_CLICK = [...BREADCRUMB_ITEMS, { label: 'Some fourth label', onClick: onClickStub }];

        mount(<Breadcrumbs items={ITEMS_WITH_ON_CLICK} />);

        cy.get(BREADCRUMB_ITEM_ID).first().find('a').as('firstItem');
        cy.get(BREADCRUMB_ITEM_ID).eq(1).find('a').as('secondItem');

        cy.get(BREADCRUMB_ITEM_ID).first().should('not.be.focused');
        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get('@firstItem').should('be.focused');
        cy.get('@firstItem').realPress('Tab');
        cy.get('@secondItem').should('be.focused');
        cy.get('@secondItem').realPress('Tab');
        cy.get(BREADCRUMB_ITEM_ID).last().find('button').type('{enter}');
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('should be able to handle a changing number of items', () => {
        mount(<ChangingBreadcrumbs items={BREADCRUMB_ITEMS} />);

        cy.get(BREADCRUMB_ITEM_ID).should('have.length', 3);
        cy.get('[data-test-id="add-item-button"]').first().click();
        cy.get(BREADCRUMB_ITEM_ID).should('have.length', 4);
    });
});
