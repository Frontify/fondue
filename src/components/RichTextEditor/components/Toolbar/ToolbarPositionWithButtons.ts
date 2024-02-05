/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../EditorPositioningWrapper';
import { Button, Buttons, Plugin, ToolbarButtons } from '../../Plugins/types';
import { ToolbarButtonsPosition } from './types';

export class ToolbarPositionWithButtons implements ToolbarButtons {
    private toolbarButtons: ToolbarButtonsPosition = {
        [Position.BOTTOM]: [],
        [Position.FLOATING]: [],
        [Position.TOP]: [],
    };

    public createGroupOfButtons(plugins: Plugin[]): void {
        const groupOfButtonsBottom: Button[] = [];
        const groupOfButtonsTop: Button[] = [];
        const groupOfButtonsFloating: Button[] = [];

        for (const { markupElement, button, id, showIn } of plugins) {
            if (!button) {
                continue;
            }

            const setButton = {
                id: markupElement?.getId() || id,
                button,
            };

            if (showIn.includes(Position.BOTTOM)) {
                groupOfButtonsBottom.push(setButton);
            }

            if (showIn.includes(Position.TOP)) {
                groupOfButtonsTop.push(setButton);
            }

            if (showIn.includes(Position.FLOATING)) {
                groupOfButtonsFloating.push(setButton);
            }
        }

        if (groupOfButtonsBottom.length > 0) {
            this.toolbarButtons[Position.BOTTOM].push(groupOfButtonsBottom);
        }
        if (groupOfButtonsTop.length > 0) {
            this.toolbarButtons[Position.TOP].push(groupOfButtonsTop);
        }
        if (groupOfButtonsFloating.length > 0) {
            this.toolbarButtons[Position.FLOATING].push(groupOfButtonsFloating);
        }
    }

    at(position: Position): Buttons {
        return this.toolbarButtons[position];
    }
}
