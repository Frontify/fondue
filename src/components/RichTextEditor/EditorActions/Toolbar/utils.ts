/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorActions } from '../../utils/actions';
import { Button, Buttons } from '../Plugins/types';
import { ButtonGroupWidths, ButtonGroupsPerRow } from './types';

const BUTTON_GROUP_PADDING_PX = 12;
const BUTTON_GROUP_SIZE_PX = 27;
const BUTTON_GROUP_DROPDOWN_PX = 128;

export const getButtonGroupWidths = (buttons: Buttons) =>
    buttons.map((group, index) => ({
        group,
        buttonGroupWidth: group.reduce(
            (prev, button: Button) =>
                button.id === EditorActions.TEXT_STYLES ? BUTTON_GROUP_DROPDOWN_PX : BUTTON_GROUP_SIZE_PX + prev,
            BUTTON_GROUP_PADDING_PX,
        ),
        index,
    }));

export const getButtonGroupsPerRow = (editorWidth: number, buttonGroupWidths: ButtonGroupWidths) =>
    buttonGroupWidths.reduce<ButtonGroupsPerRow>((buttonGroupWidthsPerRow, { group, buttonGroupWidth, index }) => {
        const rowCount = Math.max(0, buttonGroupWidthsPerRow.length - 1);

        buttonGroupWidthsPerRow[rowCount] = buttonGroupWidthsPerRow[rowCount] ?? [];

        const currentRowWidth = (buttonGroupWidthsPerRow[rowCount] ?? [{ actions: [], buttonGroupWidth: 0 }]).reduce(
            (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
            0,
        );

        if (currentRowWidth + buttonGroupWidth <= editorWidth) {
            buttonGroupWidthsPerRow[rowCount].push({ group, buttonGroupWidth, index });
        } else {
            buttonGroupWidthsPerRow.push([{ group, buttonGroupWidth, index }]);
        }

        return buttonGroupWidthsPerRow.filter((element) => element.length);
    }, []);
