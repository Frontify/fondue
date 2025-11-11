/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Stack } from './Stack';

const STACK_ID = '[data-test-id=fondue-stack]';
const CONTENT_STRING = 'Test content';
const CONTENT_STRING_LONG =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('Stack component', () => {
    it('renders with children', () => {
        cy.mount(
            <Stack>
                <div>{CONTENT_STRING}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('exist');
        cy.get(STACK_ID).should('contain', CONTENT_STRING);
    });

    it('renders with specified padding', () => {
        cy.mount(
            <Stack padding={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'padding', '12px');
    });

    it('renders with specified horizontal padding', () => {
        cy.mount(
            <Stack paddingX={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'padding', '0px 12px');
    });

    it('renders with specified vertical padding', () => {
        cy.mount(
            <Stack paddingY={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'padding', '12px 0px');
    });

    it('renders with specified horizontal & vertical padding', () => {
        cy.mount(
            <Stack paddingX={8} paddingY={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'padding', '12px 8px');
    });

    it('renders with specified margin', () => {
        cy.mount(
            <Stack margin={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'margin', '12px');
    });

    it('renders with specified horizontal margin', () => {
        cy.mount(
            <Stack marginX={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'margin', '0px 12px');
    });

    it('renders with specified vertical margin', () => {
        cy.mount(
            <Stack marginY={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'margin', '12px 0px');
    });

    it('renders with specified horizontal & vertical margin', () => {
        cy.mount(
            <Stack marginX={8} marginY={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'margin', '12px 8px');
    });

    it('renders with specified spacing', () => {
        cy.mount(
            <Stack spacing={4}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'gap', '4px');
    });

    it('renders with specified horizontal spacing', () => {
        cy.mount(
            <Stack spacingX={4}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'gap', 'normal 4px');
    });

    it('renders with specified vertical spacing', () => {
        cy.mount(
            <Stack spacingY={4}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'gap', '4px normal');
    });

    it('renders with specified horizontal & vertical spacing', () => {
        cy.mount(
            <Stack spacingX={8} spacingY={4}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.css', 'gap', '4px 8px');
    });

    it('renders with "row" direction', () => {
        cy.mount(
            <Stack direction={'row'}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.class', 'tw-flex-row');
    });

    it('renders with "column" direction', () => {
        cy.mount(
            <Stack direction={'column'}>
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );
        cy.get(STACK_ID).should('have.class', 'tw-flex-col');
    });

    it('renders with proper bg', () => {
        cy.mount(
            <Stack bg="tw-bg-box-neutral">
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );

        cy.get(STACK_ID).should('have.class', 'tw-bg-box-neutral');
    });

    it('renders with proper color', () => {
        cy.mount(
            <Stack color="tw-text-box-neutral-inverse">
                <div>{CONTENT_STRING_LONG}</div>
            </Stack>,
        );

        cy.get(STACK_ID).should('have.class', 'tw-text-box-neutral-inverse');
    });

    it('renders as span tag', () => {
        cy.mount(<Stack as="span">{CONTENT_STRING_LONG}</Stack>);

        cy.get(STACK_ID).first().should('have.prop', 'tagName', 'SPAN');
    });

    it('should render with wrap justify center', () => {
        cy.mount(<Stack justify="center" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-center');
    });

    it('should render with justify start', () => {
        cy.mount(<Stack justify="start" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-start');
    });

    it('should render with justify end', () => {
        cy.mount(<Stack justify="end" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-end');
    });

    it('should render with justify between', () => {
        cy.mount(<Stack justify="between" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-between');
    });

    it('should render with justify around', () => {
        cy.mount(<Stack justify="around" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-around');
    });

    it('should render with justify evenly', () => {
        cy.mount(<Stack justify="evenly" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-evenly');
    });

    it('should render with alignItems start', () => {
        cy.mount(<Stack alignItems="start" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-start');
    });

    it('should render with alignItems end', () => {
        cy.mount(<Stack alignItems="end" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-end');
    });

    it('should render with alignItems center', () => {
        cy.mount(<Stack alignItems="center" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-center');
    });

    it('should render with alignItems baseline', () => {
        cy.mount(<Stack alignItems="baseline" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-baseline');
    });

    it('should render with alignItems stretch', () => {
        cy.mount(<Stack alignItems="stretch" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-stretch');
    });

    it('should render with alignItems stretch', () => {
        cy.mount(<Stack alignItems="stretch" />);

        cy.get(STACK_ID).as('Stack');
        cy.get('@Stack').should('have.class', 'tw-items-stretch');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<Stack data-test-id="custom-container-test-id">{CONTENT_STRING_LONG}</Stack>);

        cy.get('[data-test-id=custom-container-test-id]').as('Stack');
        cy.get('@Stack').should('exist');
        cy.get('@Stack').should('contain', CONTENT_STRING_LONG);
    });
});
