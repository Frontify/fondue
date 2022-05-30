/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from 'react';
import { Button } from '@components/Button';
import { CollapsibleWrap as CollapsibleWrapComponent } from './CollapsibleWrap';
import { mount } from '@cypress/react';
import { CollapsibleWrapProps } from './types';

const CONTENT_ID = '[data-test-id="collapsible-wrap-content"]';
const WRAP_ID = '[data-test-id="collapsible-wrap"]';
const BUTTON_ID = '[data-test-id="button"]';

const CollapsibleWrap: FC<Partial<CollapsibleWrapProps>> = ({
    preventInitialAnimation = false,
    isOpen: externalIsOpen = false,
    animateOpacity = true,
}) => {
    const [isOpen, setIsOpen] = useState(externalIsOpen);
    return (
        <>
            <CollapsibleWrapComponent
                isOpen={isOpen}
                preventInitialAnimation={preventInitialAnimation}
                animateOpacity={animateOpacity}
            >
                <div style={{ height: '100px' }} data-test-id="collapsible-wrap-content">
                    Content
                </div>
            </CollapsibleWrapComponent>
            <Button onClick={() => setIsOpen((open) => !open)}>Click To Toggle Open</Button>
        </>
    );
};

describe('CollapsibleWrap', () => {
    it('renders without crashing', () => {
        mount(<CollapsibleWrap isOpen={true} />);
        cy.get(CONTENT_ID).should('exist');
    });

    it('renders without content visible', () => {
        mount(<CollapsibleWrap />);
        cy.get(CONTENT_ID).should('not.exist');
        cy.get(BUTTON_ID).click();
        cy.get(CONTENT_ID).should('be.visible');
        cy.get(WRAP_ID).should('have.css', 'opacity', '1');
        cy.get(BUTTON_ID).click();
        cy.get(WRAP_ID).should('have.css', 'opacity', '0');
        cy.get(CONTENT_ID).should('not.exist');
    });

    it('renders with no opacity transition', () => {
        mount(<CollapsibleWrap isOpen={true} animateOpacity={false} />);
        cy.get(WRAP_ID).should('have.css', 'opacity', '1');
    });

    it('renders with content visible and no animation', () => {
        mount(<CollapsibleWrap preventInitialAnimation={true} isOpen={true} />);
        cy.get(CONTENT_ID).should('be.visible');
        cy.get(BUTTON_ID).click();
        cy.get(CONTENT_ID).should('not.exist');
    });
});
