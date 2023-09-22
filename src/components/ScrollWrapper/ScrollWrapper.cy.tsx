/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ScrollWrapper } from './ScrollWrapper';
import { ScrollWrapperDirection, ScrollWrapperProps } from './types';

const SCROLL_WRAPPER_CONTAINER = '[data-test-id=scroll-wrapper]';
const SCROLL_WRAPPER_TOP_SHADOW_ID = '[data-test-id=fondue-scrollwrapper-top-shadow]';
const SCROLL_WRAPPER_BOTTOM_SHADOW_ID = '[data-test-id=fondue-scrollwrapper-bottom-shadow]';
const SCROLL_WRAPPER_CONTENT_ID = '[data-test-id=fondue-scrollwrapper-content]';
const SCROLL_WRAPPER_CONTAINER_CUSTOM_ID = '[data-test-id=custom-data-test-id]';

const ScrollWrapperComponent = (args: ScrollWrapperProps) => {
    return (
        <div className="tw-h-[50px] tw-w-full">
            <ScrollWrapper {...args}>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </div>
            </ScrollWrapper>
        </div>
    );
};

describe('ScrollWrapper Component', () => {
    it('should render the ScrollWrapper component', () => {
        cy.mount(<ScrollWrapperComponent />);

        cy.get(SCROLL_WRAPPER_CONTAINER).should('exist');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<ScrollWrapperComponent data-test-id="custom-data-test-id" />);

        cy.get(SCROLL_WRAPPER_CONTAINER_CUSTOM_ID).should('exist');
    });

    it('should render with custom tabindex', () => {
        cy.mount(<ScrollWrapperComponent tabindex={-1} />);

        cy.get(`${SCROLL_WRAPPER_CONTAINER} > div`).should('have.attr', 'tabindex', '-1');
    });

    it('should hide shadows when scrollShadows is false', () => {
        cy.mount(<ScrollWrapperComponent scrollShadows={false} />);

        cy.get(SCROLL_WRAPPER_TOP_SHADOW_ID).should('not.exist');
        cy.get(SCROLL_WRAPPER_BOTTOM_SHADOW_ID).should('not.exist');
    });

    it('should show shadows by default', () => {
        cy.mount(<ScrollWrapperComponent />);

        cy.get(SCROLL_WRAPPER_CONTAINER).children().first().scrollTo(0, 20);

        cy.get(SCROLL_WRAPPER_TOP_SHADOW_ID).should('exist');
        cy.get(SCROLL_WRAPPER_BOTTOM_SHADOW_ID).should('exist');
    });

    it('should render with direction horizontal', () => {
        cy.mount(<ScrollWrapperComponent direction={ScrollWrapperDirection.Horizontal} />);

        cy.get(SCROLL_WRAPPER_CONTENT_ID)
            .should('have.class', 'tw-w-full')
            .should('have.class', 'tw-overflow-x-auto')
            .should('have.class', 'tw-overflow-y-hidden');
    });

    it('should render with direction vertical', () => {
        cy.mount(<ScrollWrapperComponent direction={ScrollWrapperDirection.Vertical} />);

        cy.get(SCROLL_WRAPPER_CONTENT_ID)
            .should('have.class', 'tw-h-full')
            .should('have.class', 'tw-overflow-y-auto')
            .should('have.class', 'tw-overflow-x-hidden');
    });

    it('should render with direction "both"', () => {
        cy.mount(<ScrollWrapperComponent direction={ScrollWrapperDirection.Both} />);

        cy.get(SCROLL_WRAPPER_CONTENT_ID)
            .should('have.class', 'tw-w-full')
            .should('have.class', 'tw-h-full')
            .should('have.class', 'tw-overflow-auto');
    });

    it('should render without negative margin', () => {
        cy.mount(<ScrollWrapperComponent disableNegativeMargin={true} />);

        cy.get(SCROLL_WRAPPER_CONTENT_ID).should('not.have.class', 'tw-px-2').should('not.have.class', 'tw--mx-2');
    });
});
