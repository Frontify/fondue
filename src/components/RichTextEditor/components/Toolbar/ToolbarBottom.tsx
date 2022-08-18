/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { defaultActions } from '../../utils/actions';
import { getButtonGroupWidths, getButtonGroupWidthsPerRow } from '../../utils/toolbarCalc';
import { ButtonGroup } from './ButtonGroup';
import { ToolbarBottomProps } from './types';

export const ToolbarBottom = ({ editorId, actions = [] }: ToolbarBottomProps) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const buttonGroupWidths = getButtonGroupWidths(toolbarActions);
    const toolbarButtonGroups = getButtonGroupWidthsPerRow(0, buttonGroupWidths);

    return (
        <div
            data-test-id="toolbar-bottom"
            className="tw-relative tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
        >
            {toolbarButtonGroups.map((row, index) => (
                <div key={index} className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap">
                    {row.map(({ actions, index }) => (
                        <ButtonGroup key={index} actions={actions} index={index} editorId={editorId} />
                    ))}
                </div>
            ))}
        </div>
    );
};
