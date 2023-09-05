/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Heading } from './Heading';

const classRecord = {
    color: ['warning', 'tw-text-text-warning'],
    overflow: ['clip', 'tw-text-clip'],
    whitespace: ['pre', 'tw-whitespace-pre'],
    display: ['inline-block', 'tw-inline-block'],
    wordBreak: ['break-all', 'tw-break-all'],
    decoration: ['underline', 'tw-underline'],
    size: ['large', 'tw-text-heading-large'],
    weight: ['strong', 'tw-font-bold'],
};

const headingProps = Object.entries(classRecord).reduce(
    (acc, [key, [value]]) => {
        acc[key] = value;
        return acc;
    },
    {} as Record<string, string>,
);

describe('Heading', () => {
    it('should render headings as span by default', () => {
        cy.mount(<Heading>The fox jumps over the lazy dog</Heading>);

        cy.get('[data-test-id=heading]').should((el) => el.attr('tagName') === 'SPAN');
    });

    it('should render headings as h1 if provided', () => {
        cy.mount(<Heading as="h1">The fox jumps over the lazy dog</Heading>);

        cy.get('[data-test-id=heading]').should((el) => el.attr('tagName') === 'H1');
    });

    it('should add correct classes to element', () => {
        cy.mount(<Heading {...headingProps}>The fox jumps over the lazy dog</Heading>);

        cy.get('[data-test-id=heading]').should((el) => {
            for (const value of Object.values(classRecord)) {
                expect(el).to.have.class(value[1]);
            }
        });
    });
});
