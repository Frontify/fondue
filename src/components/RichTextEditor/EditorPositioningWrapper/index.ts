/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorPositioningWrapperProps, Position } from './types';
import {
    ToolbarWrapperPositioningBottom,
    ToolbarWrapperPositioningFloating,
    ToolbarWrapperPositioningTop,
} from './ToolbarWrapper';
import { merge } from '@utilities/merge';

export { Position } from './types';
export const EditorPositioningWrapper: EditorPositioningWrapperProps = {
    [Position.BOTTOM]: {
        PlateWrapperClassNames: 'tw-relative tw-w-full tw-flex tw-flex-col',
        ToolbarWrapper: ToolbarWrapperPositioningBottom,
    },
    [Position.FLOATING]: {
        PlateWrapperClassNames: 'tw-relative tw-w-full',
        ToolbarWrapper: ToolbarWrapperPositioningFloating,
    },
    [Position.TOP]: {
        PlateWrapperClassNames: 'tw-relative tw-w-full tw-flex tw-flex-col-reverse',
        ToolbarWrapper: ToolbarWrapperPositioningTop,
    },
};

export const getEditorWrapperClassNames = (position: Position, border: boolean) => {
    const toolbarPositioningClasses = EditorPositioningWrapper[position].PlateWrapperClassNames;

    return merge([toolbarPositioningClasses, border && 'tw-border tw-border-line tw-rounded']);
};
