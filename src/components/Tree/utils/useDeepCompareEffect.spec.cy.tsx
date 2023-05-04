/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { mount } from 'cypress/react18';
import { useDeepCompareEffect } from './useDeepCompareEffect';

type Props = {
    effect: Parameters<typeof useDeepCompareEffect>[0];
    deps?: Parameters<typeof useDeepCompareEffect>[1];
};

const BUTTON_TEST_ID_1 = '[data-test-id="button-1"]';
const BUTTON_TEST_ID_2 = '[data-test-id="button-2"]';

const Component = ({ effect, deps }: Props) => {
    const [state, setState] = useState({ count: 0 });
    const [tmp, setTmp] = useState(0);

    useDeepCompareEffect(effect, deps ?? [state]);

    return (
        <>
            <button
                data-test-id="button-1"
                onClick={() =>
                    setState((previousState) => ({
                        count: previousState.count + 1,
                    }))
                }
            />

            <button data-test-id="button-2" onClick={() => setTmp((previousState) => previousState + 1)}>
                {tmp}
            </button>
        </>
    );
};

describe('useDeepCompareEffect', () => {
    it('should warn when used with no dependencies', () => {
        cy.spy(console, 'warn');

        const effect = cy.stub();

        mount(<Component effect={effect} deps={[]} />);

        cy.wrap(console.warn).should('be.calledTwice');
        cy.wrap(effect).should('be.called');
    });

    it('should warn when used with all primitive dependencies', () => {
        cy.spy(console, 'warn');

        const effect = cy.stub();

        mount(<Component effect={effect} deps={[1, 'string', true]} />);

        cy.wrap(console.warn).should('be.calledOnce');
        cy.wrap(effect).should('be.called');
    });

    it('should call the effect with the correct dependencies', () => {
        const effect = cy.stub();

        mount(<Component effect={effect} />);

        cy.wrap(effect).should('be.calledOnce');

        cy.get(BUTTON_TEST_ID_2).click({ force: true });

        cy.wrap(effect).should('be.calledOnce');
        cy.get(BUTTON_TEST_ID_2).should('contain.text', '1');

        cy.get(BUTTON_TEST_ID_1).click({ force: true });

        cy.wrap(effect).should('be.calledTwice');
        cy.get(BUTTON_TEST_ID_2).should('contain.text', '1');
    });
});
