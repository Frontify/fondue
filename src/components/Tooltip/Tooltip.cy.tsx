/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@components/Tooltip/Tooltip';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';

const TOOLTIP_SELECTOR = '[data-test-id=fondue-tooltip]';
const TOOLTIP_TRIGGER = '[data-test-id=tooltip-trigger]';
const TOOLTIP_ARROW = '[data-test-id=fondue-tooltip-arrow]';

describe('Tooltip Component', () => {
    it('should render the tooltip', () => {
        cy.mount(
            <Tooltip content="Hello There" placement="bottom">
                <span data-test-id="tooltip-trigger">
                    <IconIcon24 />
                </span>
            </Tooltip>,
        );
        cy.get(TOOLTIP_TRIGGER).should('exist');
        cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
        cy.get(TOOLTIP_SELECTOR).should('exist');
        cy.get(TOOLTIP_SELECTOR).should('have.text', 'Hello There');
    });

    describe('Positioning', () => {
        it('should render the tooltip in an initial Top placement', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="top" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'top');
        });

        it('should render the tooltip in an initial Bottom placement', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="bottom" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'bottom');
        });

        it('should render the tooltip in an initial Right placement', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="right" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'right');
        });

        it('should render the tooltip in an initial Left placement', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="left" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'left');
        });

        it('should render the tooltip with start alignment', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="bottom-start" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'bottom-start');
        });

        it('should render the tooltip with start alignment', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="bottom-end" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'bottom-end');
        });
    });

    describe('Flip', () => {
        it('should flip by default', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="top">
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'bottom');
        });

        it('should not flip if disabled', () => {
            cy.mount(
                <Tooltip content="Hello There" placement="top" flip={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.attr', 'data-popper-placement', 'top');
        });
    });

    describe('Appearance/Disappearance', () => {
        it('should not appear if disabled', () => {
            cy.mount(
                <Tooltip content="Hello There" disabled>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('not.exist');
        });

        it('should render on mount', () => {
            cy.mount(
                <Tooltip content="Hello There" openOnMount>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_SELECTOR).should('exist');
        });

        it('should render after 2 seconds of delay', () => {
            cy.mount(
                <Tooltip content="Hello There" enterDelay={2000}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('not.exist');
            cy.wait(2000);
            cy.get(TOOLTIP_SELECTOR).should('exist');
        });

        it('should disappear after 1 second of delay', () => {
            cy.mount(
                <Tooltip content="Hello There" leaveDelay={1000}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseleave');
            cy.get(TOOLTIP_SELECTOR).should('exist');
            cy.wait(1000);
            cy.get(TOOLTIP_SELECTOR).should('exist');
        });
    });

    describe('Styling', () => {
        it('should render with Arrow', () => {
            cy.mount(
                <Tooltip content="Hello There">
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_ARROW).should('exist');
        });

        it('should not render with Arrow', () => {
            cy.mount(
                <Tooltip content="Hello There" withArrow={false}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_ARROW).should('not.exist');
        });

        it('should render in a spacious size by default', () => {
            cy.mount(
                <Tooltip content="Hello There">
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'padding', '8px 12px 10px');
        });

        it('should render in a compact size', () => {
            cy.mount(
                <Tooltip content="Hello There" size="compact">
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'padding', '4px 8px 6px');
        });

        it('should render with a default max width of 200px', () => {
            cy.mount(
                <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'max-width', '200px');
        });

        it('should render with a custom max width', () => {
            cy.mount(
                <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." maxWidth={150}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'max-width', '150px');
        });

        it('should render with a custom max height', () => {
            cy.mount(
                <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." maxHeight={50}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('mouseover');
            cy.get(TOOLTIP_SELECTOR).should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'max-height', '50px');
        });
    });
});
