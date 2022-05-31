import { ButtonGroupWidths } from '../types';

export const getButtonGroupWidthsPerRow = (toolbarWidth: number, buttonGroupsWidths: ButtonGroupWidths) =>
    buttonGroupsWidths.reduce<ButtonGroupWidths[]>((buttonGroupWidthsPerRow, { actions, buttonGroupWidth, index }) => {
        const rowCount = buttonGroupWidthsPerRow?.length === 0 ? 0 : buttonGroupWidthsPerRow?.length - 1;

        if (!buttonGroupWidthsPerRow[rowCount]) {
            buttonGroupWidthsPerRow[rowCount] = [];
        }

        const currentRowWidth = (buttonGroupWidthsPerRow[rowCount] ?? [{ actions: [], buttonGroupWidth: 0 }]).reduce(
            (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
            0,
        );

        if (currentRowWidth + buttonGroupWidth <= toolbarWidth) {
            buttonGroupWidthsPerRow[rowCount].push({ actions, buttonGroupWidth, index });
        } else {
            buttonGroupWidthsPerRow.push([{ actions, buttonGroupWidth, index }]);
        }

        return buttonGroupWidthsPerRow.filter((element) => element.length > 0);
    }, []);

export const calculateToolbarWidth = () => {
    toolbarButtonGroups?.length &&
        Math.max(
            ...toolbarButtonGroups.map((element) =>
                [...element, { actions: [], buttonGroupWidth: 0 }].reduce(
                    (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
                    0,
                ),
            ),
        );
};
