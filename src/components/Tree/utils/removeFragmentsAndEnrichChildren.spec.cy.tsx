/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { removeFragmentsAndEnrichChildren } from './removeFragmentsAndEnrichChildren';

const Child1 = ({ id }: { id?: string }) => <div id={id}>Child 1</div>;
const Child2 = ({ id }: { id?: string }) => <div id={id}>Child 2</div>;
const Child3 = ({ id }: { id?: string }) => <div id={id}>Child 3</div>;

describe('removeFragmentsAndEnrichChildren', () => {
    it('should remove fragments and enrich children with props', () => {
        const children = (
            <>
                <Child1 />
                <Child2 />
                <Child3 />
            </>
        );

        const enrichedProps = {
            parentId: '12345',
            level: 2,
        };

        const result = removeFragmentsAndEnrichChildren(children, enrichedProps);

        cy.wrap(result).should('have.length', 3);

        for (const child of result) {
            cy.wrap(child.props.parentId).should('equal', '12345');
            cy.wrap(child.props.level).should('equal', 2);
        }
    });

    it('should not remove child components custom props', () => {
        const children = (
            <>
                <Child1 id="1" />
                <Child2 id="2" />
                <Child3 id="3" />
            </>
        );

        const enrichedProps = {
            parentId: '12345',
            level: 2,
        };

        const result = removeFragmentsAndEnrichChildren(children, enrichedProps);

        cy.wrap(result).should('have.length', 3);

        const resultIds = result.map((child) => child.props.id);
        cy.wrap(resultIds).should('deep.equal', ['1', '2', '3']);
    });

    it('should overwrite child component props', () => {
        const children = (
            <>
                <Child1 id="1" />
                <Child2 id="2" />
                <Child3 id="3" />
            </>
        );

        const enrichedProps = {
            parentId: '12345',
            level: 2,
            id: 'overwritten-id',
        };

        const result = removeFragmentsAndEnrichChildren(children, enrichedProps);

        cy.wrap(result).should('have.length', 3);

        const resultIds = result.map((child) => child.props.id);
        cy.wrap(resultIds).should('deep.equal', ['overwritten-id', 'overwritten-id', 'overwritten-id']);
    });

    it('should handle null or undefined children', () => {
        cy.wrap(removeFragmentsAndEnrichChildren(null)).should('be.instanceOf', Array);
        cy.wrap(removeFragmentsAndEnrichChildren(null)).should('have.length', 0);
        cy.wrap(removeFragmentsAndEnrichChildren(undefined)).should('be.instanceOf', Array);
        cy.wrap(removeFragmentsAndEnrichChildren(undefined)).should('have.length', 0);
    });

    it('should handle nullable children', () => {
        const children = null;
        const result = removeFragmentsAndEnrichChildren(children);
        cy.wrap(result).should('be.instanceOf', Array);
        cy.wrap(result).should('have.length', 0);
    });

    it('should handle non-React elements', () => {
        const children = 'hello world';
        const result = removeFragmentsAndEnrichChildren(children);
        cy.wrap(result).should('be.instanceOf', Array);
        cy.wrap(result).should('have.length', 0);
    });
});
