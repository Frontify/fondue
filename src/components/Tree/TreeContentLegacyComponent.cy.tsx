/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { Button, ButtonSize } from '@components/Button';
import { IconPlus, IconTester } from '@foundation/Icon';
import { TreeContentLegacyComponent } from '@components/Tree';

const TREE_CONTENT_LEGACY_COMPONENT = '[data-test-id=tree-content-legacy-component]';
const TREE_CONTENT_LEGACY_COMPONENT_ICON = '[data-test-id=tree-content-legacy-component-icon]';
const TREE_CONTENT_LEGACY_COMPONENT_EDITABLE_TITLE = '[data-test-id=tree-content-legacy-component-editable-title]';
const TREE_CONTENT_LEGACY_COMPONENT_BADGE = '[data-test-id=tree-content-legacy-component-badge]';
const TREE_CONTENT_LEGACY_COMPONENT_LABEL = '[data-test-id=tree-content-legacy-component-label]';
const TREE_CONTENT_LEGACY_COMPONENT_ACTIONS = '[data-test-id=tree-content-legacy-component-actions]';
const NODE_EDITABLE_ID = '[data-test-id=editable-input]';

describe('Tree Content Legacy Component', () => {
    it('renders component', () => {
        cy.mount(<TreeContentLegacyComponent title="Test" icon={<IconTester />} selected={false} hovered={false} />);

        cy.get(TREE_CONTENT_LEGACY_COMPONENT).should('be.visible');
    });

    it('renders component icon', () => {
        cy.mount(<TreeContentLegacyComponent title="Test" icon={<IconTester />} selected={false} hovered={false} />);

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_ICON).should('be.visible');
    });

    it('renders component editable title', () => {
        cy.mount(<TreeContentLegacyComponent title="Test" icon={<IconTester />} selected={false} hovered={false} />);

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_EDITABLE_TITLE).should('be.visible');
        cy.get(TREE_CONTENT_LEGACY_COMPONENT_EDITABLE_TITLE).dblclick();
        cy.get(NODE_EDITABLE_ID).should('exist');
    });

    it('renders component badge', () => {
        cy.mount(
            <TreeContentLegacyComponent
                title="Test"
                icon={<IconTester />}
                badge={<span>Test</span>}
                selected={false}
                hovered={false}
            />,
        );

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_BADGE).should('be.visible');
    });

    it('renders component label', () => {
        cy.mount(
            <TreeContentLegacyComponent
                title="Test"
                icon={<IconTester />}
                label="Test"
                selected={false}
                hovered={false}
            />,
        );

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_LABEL).should('be.visible');
    });

    it('renders component actions', () => {
        cy.mount(
            <TreeContentLegacyComponent
                title="Test"
                icon={<IconTester />}
                actions={[<Button size={ButtonSize.Small} icon={<IconPlus></IconPlus>} />]}
                selected={false}
                hovered={false}
            />,
        );

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_ACTIONS).should('exist');
        cy.get(TREE_CONTENT_LEGACY_COMPONENT_ACTIONS).should('not.be.visible');
    });

    it('renders and shows component actions', () => {
        cy.mount(
            <TreeContentLegacyComponent
                title="Test"
                icon={<IconTester />}
                actions={[<Button size={ButtonSize.Small} icon={<IconPlus></IconPlus>} />]}
                selected={true}
                hovered={true}
            />,
        );

        cy.get(TREE_CONTENT_LEGACY_COMPONENT_ACTIONS).should('be.visible');
    });
});
