/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMusicNote } from '@foundation/Icon';
import { IconSize } from '@foundation/Icon/IconSize';
import React from 'react';
import { MenuItem, MenuItemContentSize, MenuItemProps, SelectionIndicatorIcon } from '@components/MenuItem';

const MENU_ITEM_ACTIVE_ID = '[data-test-id=menu-item-active]';
const MENU_ITEM_TITLE_ID = '[data-test-id=menu-item-title]';
const MENU_ITEM_DECORATOR_ID = '[data-test-id=menu-item-decorator]';
const MENU_ITEM_CONTENT_ID = '[data-test-id=menu-item-content]';
const MENU_ITEM_CARET_ID = '[data-test-id=menu-item-caret]';
const MENU_ITEM_SUBTITLE_ID = '[data-test-id=menu-item-subtitle]';

const ITEMS: MenuItemProps[] = [
    {
        title: 'Small',
        size: MenuItemContentSize.Small,
        decorator: <IconMusicNote size={IconSize.Size16} />,
    },
    {
        title: 'Small',
        size: MenuItemContentSize.Small,
    },
    {
        title: 'Small',
        size: MenuItemContentSize.Small,
        selectionIndicator: SelectionIndicatorIcon.CaretRight,
    },
    {
        title: 'Large icon',
        subtitle: 'Large icon subtitle',
        decorator: <IconMusicNote size={IconSize.Size16} />,
        size: MenuItemContentSize.Large,
    },
    {
        title: 'Large icon',
        subtitle: 'Large icon subtitle',
        size: MenuItemContentSize.Large,
    },
    {
        title: 'Large icon',
        subtitle: 'Large icon subtitle',
        size: MenuItemContentSize.Large,
        selectionIndicator: SelectionIndicatorIcon.CaretRight,
    },
];

describe('MenuItem Component', () => {
    it('renders small item with icon', () => {
        cy.mount(<MenuItem {...ITEMS[0]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should('exist');
        cy.get(MENU_ITEM_CONTENT_ID).contains('Small');
        cy.get(MENU_ITEM_SUBTITLE_ID).should('not.exist');
    });

    it('renders small item without icon', () => {
        cy.mount(<MenuItem {...ITEMS[1]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should('not.exist');
        cy.get(MENU_ITEM_CONTENT_ID).contains('Small');
        cy.get(MENU_ITEM_SUBTITLE_ID).should('not.exist');
    });

    it('renders small active item', () => {
        cy.mount(<MenuItem {...ITEMS[1]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should('exist');
    });

    it('renders small item with caret indicator', () => {
        cy.mount(<MenuItem {...ITEMS[2]} />);
        cy.get(MENU_ITEM_CARET_ID).should('exist');
    });

    it('renders large item with icon', () => {
        cy.mount(<MenuItem {...ITEMS[3]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should('exist');
        cy.get(MENU_ITEM_TITLE_ID).contains('Large icon');
        cy.get(MENU_ITEM_SUBTITLE_ID).contains('Large icon subtitle');
    });

    it('renders large item without icon', () => {
        cy.mount(<MenuItem {...ITEMS[4]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should('not.exist');
        cy.get(MENU_ITEM_TITLE_ID).contains('Large icon');
        cy.get(MENU_ITEM_SUBTITLE_ID).contains('Large icon subtitle');
    });

    it('renders large item with caret indicator', () => {
        cy.mount(<MenuItem {...ITEMS[5]} />);
        cy.get(MENU_ITEM_CARET_ID).should('exist');
    });
});
