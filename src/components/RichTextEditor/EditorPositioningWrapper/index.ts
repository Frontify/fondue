/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorPositioningWrapperProps, Position } from './types';
import {
    PlateWrapperPositioningBottom,
    PlateWrapperPositioningFloating,
    PlateWrapperPositioningTop,
} from './PlateWrapper';
import {
    ToolbarWrapperPositioningBottom,
    ToolbarWrapperPositioningFloating,
    ToolbarWrapperPositioningTop,
} from './ToolbarWrapper';

export { Position } from './types';
export const EditorPositioningWrapper: EditorPositioningWrapperProps = {
    [Position.BOTTOM]: {
        PlateWrapper: PlateWrapperPositioningBottom,
        ToolbarWrapper: ToolbarWrapperPositioningBottom,
    },
    [Position.FLOATING]: {
        PlateWrapper: PlateWrapperPositioningFloating,
        ToolbarWrapper: ToolbarWrapperPositioningFloating,
    },
    [Position.TOP]: {
        PlateWrapper: PlateWrapperPositioningTop,
        ToolbarWrapper: ToolbarWrapperPositioningTop,
    },
};
