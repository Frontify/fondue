/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Container } from './Container';

const CONTAINER_ID = '[data-test-id=fondue-container]';
const CONTENT_STRING = 'Test';
const CONTENT_STRING_LONG =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('Container component', () => {
    it('renders with children', () => {
        cy.mount(
            <Container>
                <div>{CONTENT_STRING}</div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('exist');
        cy.get(CONTAINER_ID).should('contain', CONTENT_STRING);
    });

    it('renders with a minWidth', () => {
        cy.mount(
            <Container minWidth={'50px'}>
                <div></div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'min-width', '50px');
    });

    it('renders with a maxWidth', () => {
        cy.mount(
            <Container maxWidth={'50px'}>
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'max-width', '50px');
    });

    it('renders with a minHeight', () => {
        cy.mount(
            <Container minHeight={'50px'}>
                <div></div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'min-height', '50px');
    });

    it('renders with a maxHeight', () => {
        cy.mount(
            <Container maxHeight={'50px'}>
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'max-height', '50px');
    });

    it('renders with padding', () => {
        cy.mount(
            <Container padding={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'padding', '12px');
    });

    it('renders with margin', () => {
        cy.mount(
            <Container margin={12}>
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.css', 'margin', '12px');
    });

    it('renders with proper bg', () => {
        cy.mount(
            <Container bg="tw-bg-box-neutral">
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );

        cy.get(CONTAINER_ID).should('have.class', 'tw-bg-box-neutral');
    });

    it('renders with proper color', () => {
        cy.mount(
            <Container color="tw-text-box-neutral-inverse">
                <div>{CONTENT_STRING_LONG}</div>
            </Container>,
        );

        cy.get(CONTAINER_ID).should('have.class', 'tw-text-box-neutral-inverse');
    });

    it('renders as span tag', () => {
        cy.mount(<Container as="span">{CONTENT_STRING_LONG}</Container>);

        cy.get(CONTAINER_ID).first().should('have.prop', 'tagName', 'SPAN');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<Container data-test-id="custom-container-test-id">{CONTENT_STRING_LONG}</Container>);

        cy.get('[data-test-id=custom-container-test-id]').as('Container');
        cy.get('@Container').should('exist');
        cy.get('@Container').should('contain', CONTENT_STRING_LONG);
    });

    it('should render with padding className', () => {
        cy.mount(
            <Container as="div" padding={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-p-2');
    });

    it('should render with paddingX className', () => {
        cy.mount(
            <Container as="div" paddingX={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-px-2');
    });

    it('should render with paddingY className', () => {
        cy.mount(
            <Container as="div" paddingY={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-py-2');
    });

    it('should render with paddingX & paddingY classNames', () => {
        cy.mount(
            <Container as="div" paddingX={8} paddingY={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-px-2 tw-py-2');
    });

    it('should render with specified padding css', () => {
        cy.mount(<Container padding={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'padding', '8px');
    });

    it('should render with specified X padding css', () => {
        cy.mount(<Container paddingX={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'padding', '0px 8px');
    });

    it('should render with specified Y padding css', () => {
        cy.mount(<Container paddingY={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'padding', '8px 0px');
    });

    it('should render with specified X & Y padding css', () => {
        cy.mount(
            <Container paddingY={8} paddingX={12}>
                {CONTENT_STRING}
            </Container>,
        );

        cy.get(CONTAINER_ID).should('have.css', 'padding', '8px 12px');
    });

    it('should render with margin className', () => {
        cy.mount(
            <Container as="div" margin={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-m-2');
    });

    it('should render with marginX className', () => {
        cy.mount(
            <Container as="div" marginX={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-mx-2');
    });

    it('should render with marginY className', () => {
        cy.mount(
            <Container as="div" marginY={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-my-2');
    });

    it('should render with marginX & marginY classNames', () => {
        cy.mount(
            <Container as="div" marginX={8} marginY={8}>
                {CONTENT_STRING}
            </Container>,
        );
        cy.get(CONTAINER_ID).should('have.class', 'tw-mx-2 tw-my-2');
    });

    it('should render with specified margin css', () => {
        cy.mount(<Container margin={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'margin', '8px');
    });

    it('should render with specified X margin css', () => {
        cy.mount(<Container marginX={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'margin', '0px 8px');
    });

    it('should render with specified Y margin css', () => {
        cy.mount(<Container marginY={8}>{CONTENT_STRING}</Container>);

        cy.get(CONTAINER_ID).should('have.css', 'margin', '8px 0px');
    });

    it('should render with specified X & Y margin css', () => {
        cy.mount(
            <Container marginY={8} marginX={12}>
                {CONTENT_STRING}
            </Container>,
        );

        cy.get(CONTAINER_ID).should('have.css', 'margin', '8px 12px');
    });
});
