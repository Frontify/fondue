/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../../../types';
import * as ToolbarPositioningBottom from './ToolbarPositioningBottom';
import * as ToolbarPositioningFloating from './ToolbarPositioningFloating';
import * as ToolbarPositioningTop from './ToolbarPositioningTop';

export const ToolbarPositioningComponent = {
    [Position.BOTTOM]: {
        PlateWrapper: ToolbarPositioningBottom.PlateWrapper,
        ToolbarWrapper: ToolbarPositioningBottom.ToolbarWrapper,
    },
    [Position.FLOATING]: {
        PlateWrapper: ToolbarPositioningFloating.PlateWrapper,
        ToolbarWrapper: ToolbarPositioningFloating.ToolbarWrapper,
    },
    [Position.TOP]: {
        PlateWrapper: ToolbarPositioningTop.PlateWrapper,
        ToolbarWrapper: ToolbarPositioningTop.ToolbarWrapper,
    },
};
