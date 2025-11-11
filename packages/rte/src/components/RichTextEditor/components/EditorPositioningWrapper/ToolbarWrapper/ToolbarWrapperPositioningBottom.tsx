/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarWrapper } from '@components/RichTextEditor/components/Toolbar/ToolbarWrapper';

import { type ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningBottom = ({ children }: ToolbarWrapperProps) => {
    return (
        <div data-test-id="toolbar-bottom">
            <ToolbarWrapper className="tw-select-none tw-items-center tw-gap-1 tw-relative tw-rounded-b tw-border-t tw-border-line tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap">
                {children}
            </ToolbarWrapper>
        </div>
    );
};
