/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonGroupsPerRow } from '../Toolbar/types';
import { ButtonGroupWidths } from '../types';

export const calculateToolbarWidth = (toolbarButtonGroups: ButtonGroupWidths[] | ButtonGroupsPerRow) =>
    Math.max(
        0,
        ...toolbarButtonGroups.map((element) =>
            [...element, { buttonGroupWidth: 0 }].reduce((prev, { buttonGroupWidth }) => prev + buttonGroupWidth, 0),
        ),
    );
