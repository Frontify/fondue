/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeStyle } from '@components/Badge';
import { TabItem, TabItemProps } from '@components/Tabs/TabItem';
import { Tabs, TabsPaddingX } from '@components/Tabs/Tabs';
import { IconSize } from '@foundation/Icon/IconSize';
import { IconIcon } from '@foundation/Icon/Generated';
import React, { useState } from 'react';

const data: TabItemProps[] = [
    {
        id: 'tab-1',
        label: 'A tab',
        children: 'This is content for label 1',
    },
    {
        id: 'tab-2',
        label: 'Disabled',
        disabled: true,
        children: 'This is content for label 2',
    },
    {
        id: 'tab-3',
        label: 'A long tab name',
        decorator: <IconIcon size={IconSize.Size12} />,
        children: 'This is content for label 3',
    },
    {
        id: 'tab-4',
        label: 'An even longer tab name',
        badge: { style: BadgeStyle.Positive, children: 'Badge 1' },
        children: (
            <div>
                <h2>Hello</h2>
                <p>This is content for tab 4</p>
            </div>
        ),
    },
    {
        id: 'tab-5',
        label: 'All disabled',
        decorator: <IconIcon size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: 'Badge 2' },
        disabled: true,
        children: <button>This is content for label 5</button>,
    },
    {
        id: 'tab-6',
        label: 'Last tab',
        decorator: <IconIcon size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: 'Badge 2' },
        children: <button>This is content for label 6</button>,
    },
];

const TabComponent = ({ paddingX }: { paddingX?: TabsPaddingX }) => {
    const [activeItemId, setActiveItemId] = useState(data[0].id);
    return (
        <Tabs activeItemId={activeItemId} onChange={(value) => setActiveItemId(value)} paddingX={paddingX} size="Small">
            {data.map((item) => (
                <TabItem
                    id={item.id}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled ?? false}
                    decorator={item.decorator}
                    badge={item.badge}
                >
                    {item.children}
                </TabItem>
            ))}
        </Tabs>
    );
};

describe('Tabs Component', () => {
    beforeEach('Mount Component', () => {
        cy.mount(<TabComponent />);
        cy.get('[data-test-id=tabs]').as('Tabs');
    });

    it('should render correctly', () => {
        cy.get('@Tabs').should('be.visible');
    });

    it('should be active on selected Tab', () => {
        const firstTab = cy.get('[data-test-id=tab-item]').first();

        firstTab.should('have.class', 'tw-font-medium');
        firstTab.children('[data-test-id=tab-active-highlight]').should('exist');

        const lastTab = cy.get('[data-test-id=tab-item]').last();
        lastTab.click({ force: true }).then(() => {
            lastTab.should('have.class', 'tw-font-medium');
            lastTab.children('[data-test-id=tab-active-highlight]').should('exist');
        });
    });

    it('should display correct content', () => {
        cy.get('[data-test-id=tab-item]').first().click();
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.html', data[0].children);
        cy.get('[data-test-id=tab-item]').eq(2).click();
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.html', data[2].children);
    });

    it('should have overflow on smaller screens', () => {
        cy.viewport(480, 850);
        cy.get('[data-test-id=tab-overflow]').as('OverflowBtn');
        cy.get('@OverflowBtn').should('be.visible');
        cy.get('@OverflowBtn').click();
        cy.get('[role=dialog]').as('Menu');
        cy.get('@Menu').should('be.visible');
        cy.get('@Menu').children().last().should('contain.text', data[5].label);
        cy.viewport(1280, 850);
        cy.get('@Tabs').children('[data-test-id=tab-overflow]').should('not.exist');
    });

    it('should not be clickable if disabled', () => {
        cy.get('[data-test-id=tab-item]').first().click();
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.html', data[0].children);
        cy.get('[data-test-id=tab-item]').eq(1).click();
        if (data[1].disabled) {
            cy.get('[data-test-id=tab-item]').eq(1).should('have.class', 'tw-text-text-disabled');
            cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.html', data[0].children);
        } else {
            cy.get('[data-test-id=tab-item]').eq(1).should('not.have.class', 'tw-text-text-disabled');
        }
    });

    it('should have Keyboard navigation', () => {
        cy.get('[data-test-id=tab-item]').first().type('{rightArrow}');
        cy.get('[data-test-id=tab-item]').eq(2).should('have.class', 'tw-font-medium');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.html', data[2].children);
        cy.get('[data-test-id=tab-item]').eq(2).trigger('keydown', { key: 'ArrowRight' });
        cy.get('[data-test-id=tab-item]').eq(3).should('have.class', 'tw-font-medium');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.text', 'content for tab 4');
        cy.get('[data-test-id=tab-item]').eq(3).trigger('keydown', { key: 'ArrowLeft' });
        cy.get('[data-test-id=tab-item]').eq(2).should('have.class', 'tw-font-medium');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.text', data[2].children);
    });

    it('should have Keyboard navigation in overflow menu', () => {
        cy.viewport(350, 850);
        cy.get('[data-test-id=tab-item]').eq(2).click();
        cy.get('body').realPress('Tab');
        cy.get('[data-test-id=tab-overflow]').realPress('Enter');
        cy.get('[role=dialog]').should('be.visible');
        cy.get('[data-test-id=tab-overflow]').realPress('Tab');
        cy.get('[data-test-id=tab-overflow]').trigger('keydown', { key: 'ArrowRight' });
        cy.get('button#tab-4-btn-m').should('be.focused');
        cy.get('[data-test-id=tab-overflow]').realPress('Tab');
        cy.get('button#tab-6-btn-m').should('be.focused');
        cy.get('[data-test-id=tab-overflow]').realPress(['Shift', 'Tab']);
        cy.get('button#tab-4-btn-m').should('be.focused');
        cy.get('[data-test-id=tab-overflow]').realPress('Tab');
        cy.get('button#tab-6-btn-m').should('be.focused');
        cy.get('[data-test-id=tab-overflow]').realPress(['Shift', 'Tab']);
        cy.get('button#tab-4-btn-m').should('be.focused');
        cy.get('[role=dialog]').realPress('Enter');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.text', 'content for tab 4');
    });

    it('should have focus on tab and content', () => {
        cy.get('button#tab-3-btn').click();
        cy.get('button#tab-3-btn').should('be.focused');
        cy.get('body').realPress('Tab');
        cy.get('body').realPress('Tab');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('be.focused');
        cy.get('[data-test-id=tab-content]').children().not('.tw-hidden').should('contain.text', data[2].children);
        cy.get('body').realPress(['Shift', 'Tab']);
        cy.get('body').realPress(['Shift', 'Tab']);
        cy.get('button#tab-3-btn').should('be.focused');
    });

    it('should not focus on tab content if it contains interactive elements', () => {
        cy.get('[data-test-id=tab-item]').first().click();
        cy.get('body').realPress('Tab');
        cy.get('body').realPress('Tab');
        cy.get('#tab-1-content').should('be.focused');
        cy.get('[data-test-id=tab-item]').eq(5).click();
        cy.get('body').realPress('Tab');
        cy.get('body').realPress('Tab');
        cy.get('#tab-6-content').children().first().should('be.focused');
        cy.get('#tab-6-content').should('not.be.focused');
    });

    it('should not pass on disabled tab with keyboard', () => {
        cy.get('[data-test-id=tab-item]').first().trigger('keydown', { key: 'ArrowRight' });
        cy.get('[data-test-id=tab-item]').eq(1).should('not.have.class', 'tw-font-medium');
        cy.get('[data-test-id=tab-item]').eq(2).trigger('keydown', { key: 'ArrowLeft' });
        cy.get('[data-test-id=tab-item]').eq(1).should('not.have.class', 'tw-font-medium');
    });

    it('tab item should have hovered state', () => {
        cy.get('[data-test-id=tab-item]').realHover();
        cy.get('[data-test-id=tab-item]').should('have.class', 'hover:tw-text-text');
    });

    it('disabled tab item should not have hovered state', () => {
        cy.get('#tab-2-btn[data-test-id=tab-item]').realHover();
        cy.get('#tab-2-btn[data-test-id=tab-item]').should('not.have.class', 'hover:tw-text-text');
    });

    it('tabs should render with paddingX of "8"', () => {
        cy.mount(<TabComponent paddingX="8" />);
        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pl-0');
        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pr-0');
    });

    it('tabs should render with paddingX of "16"', () => {
        cy.mount(<TabComponent paddingX="16" />);

        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pl-2');
        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pr-2');
    });

    it('tabs should render with paddingX of "20"', () => {
        cy.mount(<TabComponent paddingX="20" />);

        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pl-3.5');
        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pr-3.5');
    });

    it('tabs should render with paddingX of "24"', () => {
        cy.mount(<TabComponent paddingX="24" />);

        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pl-4');
        cy.get('[data-test-id=tabs] > div').should('have.class', 'tw-pr-4');
    });
});
