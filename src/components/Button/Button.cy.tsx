/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcon from '@foundation/Icon/Generated/IconIcon';
import React from 'react';
import { Button, ButtonRounding, ButtonSize, ButtonStyle } from './Button';

const BUTTON_TEXT = 'Frontify';
const BUTTON_ID = '[data-test-id=button]';

const styles = Object.values(ButtonStyle);
const sizes = Object.values(ButtonSize);
const solids = [true, false];

describe('Button component', () => {
    for (const style of styles) {
        for (const size of sizes) {
            for (const solid of solids) {
                it(`renders in ${style} ${size} and ${solid ? 'solid' : 'translucent'} with only text.`, () => {
                    cy.mount(
                        <Button style={style} size={size} solid={solid}>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should('be.visible');
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${
                    solid ? 'solid' : 'translucent'
                } and inverted with only text.`, () => {
                    cy.mount(
                        <Button style={style} size={size} solid={solid} inverted>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should('be.visible');
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${solid ? 'solid' : 'translucent'} with only an icon.`, () => {
                    cy.mount(<Button style={style} size={size} solid={solid} icon={<IconIcon />} />);

                    cy.get(BUTTON_ID).find('svg').should('be.visible');
                    cy.get(BUTTON_ID).should('not.contain', BUTTON_TEXT);
                });

                it(`renders in ${style} ${size} and ${
                    solid ? 'solid' : 'translucent'
                } with only an icon and fully rounded.`, () => {
                    cy.mount(
                        <Button
                            style={style}
                            size={size}
                            solid={solid}
                            icon={<IconIcon />}
                            rounding={ButtonRounding.Full}
                        />,
                    );

                    cy.get(BUTTON_ID).find('svg').should('be.visible');
                    cy.get(BUTTON_ID).should('not.contain', BUTTON_TEXT);
                    cy.get(BUTTON_ID).should('have.class', 'tw-rounded-full');
                });

                it(`renders in ${style} ${size} and ${solid ? 'solid' : 'translucent'} with an icon and text.`, () => {
                    cy.mount(
                        <Button style={style} size={size} solid={solid} icon={<IconIcon />}>
                            {BUTTON_TEXT}
                        </Button>,
                    );

                    cy.get(BUTTON_ID).should('be.visible');
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);

                    cy.get(BUTTON_ID).children('span').find('svg').should('be.visible');
                    cy.get(BUTTON_ID).contains(BUTTON_TEXT);
                });
            }
        }
    }

    it('reacts on click', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Button onClick={onClickStub}>{BUTTON_TEXT}</Button>);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(BUTTON_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('does not react on click when disabled', () => {
        cy.mount(<Button disabled>{BUTTON_TEXT}</Button>);
        cy.get(BUTTON_ID).invoke('attr', 'disabled').should('eq', 'disabled');
    });
});
