/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarWrapperProps } from './types';
import { ToolbarWrapper } from '@components/RichTextEditor/components/Toolbar/ToolbarWrapper';

export const ToolbarWrapperPositioningTop = ({ children }: ToolbarWrapperProps) => {
    return (
        <div
            data-test-id="toolbar-top"
            className="tw-relative tw-rounded-t tw-border-b tw-border-line tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
        >
            <ToolbarWrapper>{children}</ToolbarWrapper>
        </div>
    );
};
