import { ButtonGroupsPerRow } from '../Toolbar/types';
import { ButtonGroupWidths } from '../types';
import { EditorActions } from './actions';

export const getButtonGroupWidthsPerRow = (toolbarWidth: number, buttonGroupsWidths: ButtonGroupWidths) =>
    buttonGroupsWidths.reduce<ButtonGroupWidths[]>((buttonGroupWidthsPerRow, { actions, buttonGroupWidth, index }) => {
        const rowCount = Math.max(0, buttonGroupWidthsPerRow.length - 1);

        buttonGroupWidthsPerRow[rowCount] = buttonGroupWidthsPerRow[rowCount] ?? [];

        const currentRowWidth = (buttonGroupWidthsPerRow[rowCount] ?? [{ actions: [], buttonGroupWidth: 0 }]).reduce(
            (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
            0,
        );

        if (currentRowWidth + buttonGroupWidth <= toolbarWidth) {
            buttonGroupWidthsPerRow[rowCount].push({ actions, buttonGroupWidth, index });
        } else {
            buttonGroupWidthsPerRow.push([{ actions, buttonGroupWidth, index }]);
        }

        return buttonGroupWidthsPerRow.filter((element) => element.length);
    }, []);

export const calculateToolbarWidth = (toolbarButtonGroups: ButtonGroupWidths[] | ButtonGroupsPerRow) =>
    Math.max(
        0,
        ...toolbarButtonGroups.map((element) =>
            [...element, { buttonGroupWidth: 0 }].reduce((prev, { buttonGroupWidth }) => prev + buttonGroupWidth, 0),
        ),
    );

const BUTTON_GROUP_PADDING_PX = 12;
const BUTTON_GROUP_SIZE_PX = 26;
const BUTTON_GROUP_DROPDOWN_PX = 124;

export const getButtonGroupWidths = (toolbarActions: EditorActions[][]) =>
    toolbarActions.map((actions, index) => ({
        actions,
        buttonGroupWidth: actions.reduce(
            (prev, element: EditorActions) =>
                element === EditorActions.TEXT_STYLES ? BUTTON_GROUP_DROPDOWN_PX : BUTTON_GROUP_SIZE_PX + prev,
            BUTTON_GROUP_PADDING_PX,
        ),
        index,
    }));
