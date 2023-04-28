/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/Box';
import React from 'react';
import { Flex, FlexProps } from './Flex';

const FLEX_ID = '[data-test-id=fondue-flex]';
const CUSTOM_DATA_TEST_ID_STRING = 'my-custom-id';
const CUSTOM_FLEX_ID = `[data-test-id=${CUSTOM_DATA_TEST_ID_STRING}]`;
const FLEX_CHILD_ID_STRING = 'flex-child';
const FLEX_CHILD_ID = `[data-test-id=${FLEX_CHILD_ID_STRING}]`;

const CONTENT_STRING_LONG =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const FlexComponent = (props: FlexProps) => {
    return (
        <Flex {...props}>
            <Box data-test-id={FLEX_CHILD_ID_STRING} className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></Box>
            <Box data-test-id={FLEX_CHILD_ID_STRING} className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></Box>
            <Box data-test-id={FLEX_CHILD_ID_STRING} className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></Box>
            <Box data-test-id={FLEX_CHILD_ID_STRING} className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></Box>
        </Flex>
    );
};

describe('Flex Component', () => {
    it('should render', () => {
        cy.mount(<FlexComponent />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('exist');
    });

    it('should support custom data-test-id', () => {
        cy.mount(<FlexComponent data-test-id={CUSTOM_DATA_TEST_ID_STRING} />);

        cy.get(CUSTOM_FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.attr', 'data-test-id', CUSTOM_DATA_TEST_ID_STRING);
    });

    it('should render with direction row', () => {
        cy.mount(<FlexComponent direction="row" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-row');
    });

    it('should render with direction column', () => {
        cy.mount(<FlexComponent direction="column" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-col');
    });

    it('should render with direction row-reverse', () => {
        cy.mount(<FlexComponent direction="row-reverse" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-row-reverse');
    });

    it('should render with direction column-reverse', () => {
        cy.mount(<FlexComponent direction="column-reverse" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-col-reverse');
    });

    it('should render with wrap nowrap', () => {
        cy.mount(<FlexComponent wrap="nowrap" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-nowrap');
    });

    it('should render with wrap', () => {
        cy.mount(<FlexComponent wrap="wrap" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-wrap');
    });

    it('should render with wrap wrap-reverse', () => {
        cy.mount(<FlexComponent wrap="wrap-reverse" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-flex-wrap-reverse');
    });

    it('should render with wrap justify center', () => {
        cy.mount(<FlexComponent justify="center" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-center');
    });

    it('should render with justify start', () => {
        cy.mount(<FlexComponent justify="start" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-start');
    });

    it('should render with justify end', () => {
        cy.mount(<FlexComponent justify="end" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-end');
    });

    it('should render with justify between', () => {
        cy.mount(<FlexComponent justify="between" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-between');
    });

    it('should render with justify around', () => {
        cy.mount(<FlexComponent justify="around" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-around');
    });

    it('should render with justify evenly', () => {
        cy.mount(<FlexComponent justify="evenly" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-justify-evenly');
    });

    it('should render with alignItems start', () => {
        cy.mount(<FlexComponent alignItems="start" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-start');
    });

    it('should render with alignItems end', () => {
        cy.mount(<FlexComponent alignItems="end" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-end');
    });

    it('should render with alignItems center', () => {
        cy.mount(<FlexComponent alignItems="center" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-center');
    });

    it('should render with alignItems baseline', () => {
        cy.mount(<FlexComponent alignItems="baseline" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-baseline');
    });

    it('should render with alignItems stretch', () => {
        cy.mount(<FlexComponent alignItems="stretch" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-stretch');
    });

    it('should render with alignItems stretch', () => {
        cy.mount(<FlexComponent alignItems="stretch" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-items-stretch');
    });

    it('should render with alignContent start', () => {
        cy.mount(<FlexComponent alignContent="start" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-start');
    });

    it('should render with alignContent end', () => {
        cy.mount(<FlexComponent alignContent="end" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-end');
    });

    it('should render with alignContent center', () => {
        cy.mount(<FlexComponent alignContent="center" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-center');
    });

    it('should render with alignContent normal', () => {
        cy.mount(<FlexComponent alignContent="normal" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-normal');
    });

    it('should render with alignContent between', () => {
        cy.mount(<FlexComponent alignContent="between" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-between');
    });

    it('should render with alignContent around', () => {
        cy.mount(<FlexComponent alignContent="around" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-around');
    });

    it('should render with alignContent evenly', () => {
        cy.mount(<FlexComponent alignContent="evenly" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-evenly');
    });

    it('should render with alignContent baseline', () => {
        cy.mount(<FlexComponent alignContent="baseline" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-baseline');
    });

    it('should render with alignContent stretch', () => {
        cy.mount(<FlexComponent alignContent="stretch" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-content-stretch');
    });

    it("should render as a span using the 'as' prop", () => {
        cy.mount(<FlexComponent as="span" />);

        cy.get(`span${FLEX_ID}`).as('Flex');
        cy.get('@Flex').should('exist');
    });

    it('should render with bg', () => {
        cy.mount(<FlexComponent bg="tw-bg-box-positive-strong" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-bg-box-positive-strong');
    });

    it('should render with color', () => {
        cy.mount(<FlexComponent color="tw-text-box-positive-inverse" />);

        cy.get(FLEX_ID).as('Flex');
        cy.get('@Flex').should('have.class', 'tw-text-box-positive-inverse');
    });

    it('renders with a minWidth', () => {
        cy.mount(
            <FlexComponent minWidth={'50px'}>
                <div></div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'min-width', '50px');
    });

    it('renders with a maxWidth', () => {
        cy.mount(
            <FlexComponent maxWidth={'50px'}>
                <div>{CONTENT_STRING_LONG}</div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'max-width', '50px');
    });

    it('renders with a minHeight', () => {
        cy.mount(
            <FlexComponent minHeight={'50px'}>
                <div></div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'min-height', '50px');
    });

    it('renders with padding', () => {
        cy.mount(
            <FlexComponent padding={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'padding', '12px');
    });

    it('renders with margin', () => {
        cy.mount(
            <FlexComponent margin={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'margin', '12px');
    });

    it('renders with a maxHeight', () => {
        cy.mount(
            <FlexComponent maxHeight={'50px'}>
                <div>{CONTENT_STRING_LONG}</div>
            </FlexComponent>,
        );
        cy.get(FLEX_ID).should('have.css', 'max-height', '50px');
    });

    it('should render with children', () => {
        cy.mount(<FlexComponent />);

        cy.get(FLEX_CHILD_ID).as('FlexChild');
        cy.get('@FlexChild').should('have.length', 4);
    });
});
