/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PopperPlacement } from '@components/Popper/types';
import { Tooltip } from '@components/Tooltip/Tooltip';
import IconIcon24 from '@foundation/Icon/Generated/IconIcon24';

const TOOLTIP_SELECTOR = '[data-test-id=fondue-tooltip-content]';
const TOOLTIP_TRIGGER = '[data-test-id=tooltip-trigger]';
const TOOLTIP_ARROW = '[data-test-id=popper-arrow]';

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
        cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
            eventConstructor: 'MouseEvent',
            pointerType: 'mouse',
        });
        cy.get(TOOLTIP_SELECTOR).should('exist');
        cy.get(TOOLTIP_SELECTOR).should('have.text', 'Hello There');
    });

    describe('Positioning', () => {
        const positions = ['top', 'bottom', 'right', 'left', 'bottom-start', 'bottom-end'];
        for (const position of positions) {
            it(`should render the tooltip in a position: ${position}`, () => {
                cy.mount(
                    <Tooltip content="Hello Positioning" placement={`${position}` as PopperPlacement} flip={false}>
                        <span data-test-id="tooltip-trigger">
                            <IconIcon24 />
                        </span>
                    </Tooltip>,
                );
                cy.get(TOOLTIP_TRIGGER).should('exist');
                cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                    eventConstructor: 'MouseEvent',
                    pointerType: 'mouse',
                });
                cy.get(TOOLTIP_SELECTOR).parent().should('have.attr', 'data-popper-placement', position);
            });
        }
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(TOOLTIP_SELECTOR).parent().should('have.attr', 'data-popper-placement', 'bottom');
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(TOOLTIP_SELECTOR).find('p').should('have.css', 'padding', '8px 12px 10px');
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
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(TOOLTIP_SELECTOR).find('p').should('have.css', 'padding', '4px 8px 6px');
        });

        const widthTests = [
            { value: undefined, expected: '200px' },
            { value: 150, expected: '150px' },
        ];
        for (const test of widthTests) {
            it(`should render with a max width of: ${test.expected}`, () => {
                cy.mount(
                    <Tooltip content="Hello max Width of the Tooltip" maxWidth={test.value}>
                        <span data-test-id="tooltip-trigger">
                            <IconIcon24 />
                        </span>
                    </Tooltip>,
                );
                cy.get(TOOLTIP_TRIGGER).should('exist');
                cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                    eventConstructor: 'MouseEvent',
                    pointerType: 'mouse',
                });
                cy.get(TOOLTIP_SELECTOR).should('have.text', 'Hello max Width of the Tooltip');
                cy.get(TOOLTIP_SELECTOR).should('have.css', 'max-width', `${test.expected}`);
            });
        }

        it('should render with a custom max height', () => {
            cy.mount(
                <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." maxHeight={50}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'mouse',
            });
            cy.get(TOOLTIP_SELECTOR).should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            cy.get(TOOLTIP_SELECTOR).should('have.css', 'max-height', '50px');
        });
    });

    describe('Pointer Events for touch devices', () => {
        it('should not open tooltip on touch event', () => {
            cy.mount(
                <Tooltip content="No Touch" maxHeight={50}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'touch',
            });
            cy.get(TOOLTIP_SELECTOR).should('not.exist');
        });

        it('should not open tooltip on pen event', () => {
            cy.mount(
                <Tooltip content="No Pen" maxHeight={50}>
                    <span data-test-id="tooltip-trigger">
                        <IconIcon24 />
                    </span>
                </Tooltip>,
            );
            cy.get(TOOLTIP_TRIGGER).should('exist');
            cy.get(TOOLTIP_TRIGGER).trigger('pointerover', {
                eventConstructor: 'MouseEvent',
                pointerType: 'pen',
            });
            cy.get(TOOLTIP_SELECTOR).should('not.exist');
        });
    });
});
