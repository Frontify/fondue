/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputExtraActions } from './InputExtraActions';
import { IconIcon16 } from '@foundation/Icon/Generated';

const INPUT_EXTRA_ACTION_BUTTON_ID = '[data-test-id="fondue-input-extra-action-button"]';
const TOOLTIP_ID = '[data-test-id=tooltip]';

describe('InputExtraActions', () => {
    it('renders empty component if no items', () => {
        cy.mount(<InputExtraActions items={[]} />);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('not.exist');
    });

    it('renders one extra action', () => {
        const stub = cy.stub().as('onClickStub');

        cy.mount(
            <InputExtraActions
                items={[
                    {
                        onClick: stub,
                        title: 'Extra action',
                        icon: <IconIcon16 />,
                    },
                ]}
            />,
        );

        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 1);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).first().click();
        cy.get('@onClickStub').should('have.been.called');
    });

    it('renders two extra actions', () => {
        const stub = cy.stub().as('onClickStub');
        const stub1 = cy.stub().as('onClickStub1');

        cy.mount(
            <InputExtraActions
                items={[
                    {
                        onClick: stub,
                        title: 'Extra action',
                        icon: <IconIcon16 />,
                    },
                    {
                        onClick: stub1,
                        title: 'Extra action 1',
                        icon: <IconIcon16 />,
                    },
                ]}
            />,
        );

        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 2);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).first().click();
        cy.get('@onClickStub').should('have.been.called');
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).eq(1).click();
        cy.get('@onClickStub1').should('have.been.called');
    });

    it('renders disabled extra action', () => {
        const stub = cy.stub().as('onClickStub');

        cy.mount(
            <InputExtraActions
                items={[
                    {
                        onClick: stub,
                        title: 'Extra action',
                        icon: <IconIcon16 />,
                        disabled: true,
                    },
                ]}
            />,
        );

        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 1);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).first().should('be.disabled');
    });

    it('renders extra action with tooltip', () => {
        const stub = cy.stub().as('onClickStub');

        cy.mount(
            <InputExtraActions
                items={[
                    {
                        onClick: stub,
                        title: 'Extra action',
                        icon: <IconIcon16 />,
                        tooltip: {
                            content: 'Tooltip content',
                            withArrow: true,
                        },
                    },
                ]}
            />,
        );

        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).should('have.length', 1);
        cy.get(INPUT_EXTRA_ACTION_BUTTON_ID).first().trigger('mouseover');
        cy.get(TOOLTIP_ID).should('exist');
        cy.get(TOOLTIP_ID).should('have.text', 'Tooltip content');
    });
});
