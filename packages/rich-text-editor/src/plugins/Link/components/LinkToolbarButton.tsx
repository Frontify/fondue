/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLink } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { type ToolbarItemProps } from '#/core';

import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';

/**
 * The toolbar's way in. It has no UI of its own: it hands over to the link's
 * `editorComponent`, opening its form — on the link the selection is in, or on
 * a new link made out of the selected text.
 */
export const LinkToolbarButton = ({ selectedNode, selection, toggle, openEditor }: ToolbarItemProps): ReactNode => {
    const inLink = selectedNode !== null;
    return (
        <ToolbarButton
            title={inLink ? 'Edit link' : 'Add link'}
            active={inLink}
            // A link needs text to sit on.
            disabled={!inLink && selection.isCollapsed}
            onClick={() => {
                if (!inLink) {
                    // No target yet: the form asks for it, and closing without
                    // one takes the link away again.
                    toggle({ href: '' });
                }
                openEditor();
            }}
        >
            <IconLink size={16} />
        </ToolbarButton>
    );
};
