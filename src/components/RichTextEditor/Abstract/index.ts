/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../types';
import * as ToolbarPositioningBottom from './ToolbarPositioningBottom';
import * as ToolbarPositioningFloating from './ToolbarPositioningFloating';

export const ToolbarPositioningComponent = {
    [`${Position.BOTTOM}`]: {
        PlateWrapper: ToolbarPositioningBottom.PlateWrapper,
        ToolbarWrapper: ToolbarPositioningBottom.ToolbarWrapper,
    },
    [`${Position.FLOATING}`]: {
        PlateWrapper: ToolbarPositioningFloating.PlateWrapper,
        ToolbarWrapper: ToolbarPositioningFloating.ToolbarWrapper,
    },
};
