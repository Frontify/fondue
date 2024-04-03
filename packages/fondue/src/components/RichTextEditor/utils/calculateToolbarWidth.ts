/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ButtonGroupsPerRow } from '../components/Toolbar/types';

export const calculateToolbarWidth = (toolbarButtonGroups: ButtonGroupsPerRow) =>
    Math.max(
        0,
        ...toolbarButtonGroups.map((element) =>
            [...element, { buttonGroupWidth: 0 }].reduce((prev, { buttonGroupWidth }) => prev + buttonGroupWidth, 0),
        ),
    );
