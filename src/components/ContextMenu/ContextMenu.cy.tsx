/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan16 } from '@foundation/Icon';
import React, { ReactElement } from 'react';
import { ContextMenu } from './ContextMenu';
import { ContextMenuProps, ContextMenuType } from './types';

const TITLE = 'Referencing Content Block';
const BLOCK_TYPE = 'Color Palette';
const TOOLTIP = 'Place a reference of the block at your desired position.';

const ACTION_BUTTONS = 'action-buttons';

const ACTION_BUTTONS_ID = `[data-test-id=${ACTION_BUTTONS}]`;
const CONTEXT_MENU_ID = '[data-test-id=context-menu]';

const Component = ({
    isOpen = true,
    contextMenuType = ContextMenuType.Reference,
    title = TITLE,
    blockType = BLOCK_TYPE,
    blockTypeIcon = <IconColorFan16 />,
    tooltip = TOOLTIP,
    actionButtons = <span data-test-id={ACTION_BUTTONS}>Action Buttons</span>,
}: Partial<ContextMenuProps>): ReactElement => (
    <ContextMenu
        isOpen={isOpen}
        contextMenuType={contextMenuType}
        title={title}
        tooltip={tooltip}
        blockType={blockType}
        blockTypeIcon={blockTypeIcon}
        actionButtons={actionButtons}
    />
);

describe('ContextMenu Component', () => {
    it('should not render context menu', () => {
        cy.mount(<Component isOpen={false} />);
        cy.get(CONTEXT_MENU_ID).should('not.exist');
    });

    it('should render context menu', () => {
        cy.mount(<Component />);
        cy.get(CONTEXT_MENU_ID).should('exist');
    });

    it('should render violet', () => {
        cy.mount(<Component />);
        cy.get(CONTEXT_MENU_ID).children().first().children().first().should('have.class', 'tw-bg-violet-60');
        cy.get(CONTEXT_MENU_ID).children().first().children().eq(1).should('have.class', 'tw-text-violet-60');
    });

    it('should render red', () => {
        cy.mount(<Component contextMenuType={ContextMenuType.Delete} />);
        cy.get(CONTEXT_MENU_ID).children().first().children().first().should('have.class', 'tw-bg-red-60');
        cy.get(CONTEXT_MENU_ID).children().first().children().eq(1).should('not.have.class', 'tw-text-violet-60');
    });

    it('should render title, block type and action buttons', () => {
        cy.mount(<Component />);
        cy.get(CONTEXT_MENU_ID).should('contain', TITLE);
        cy.get(CONTEXT_MENU_ID).should('contain', BLOCK_TYPE);
        cy.get(ACTION_BUTTONS_ID).should('exist');
    });
});
