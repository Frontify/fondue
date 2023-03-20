/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Placement, ToolbarButtonProps } from '@udecode/plate';
import React from 'react';

type GetToolip = (content: string, placement?: Placement) => ToolbarButtonProps['tooltip'];

export const getTooltip: GetToolip = (content, placement) => {
    const contentItems = content.split('\n');
    return {
        className:
            'tw-bg-text tw-border tw-border-line-strong tw-text-box-neutral-strong-inverse tw-py-2 tw-px-3 -tw-mb-1 tw-rounded tw-shadow-lg tw-text-xs',
        content: contentItems.map((item, index) => {
            return (
                <div key={index}>
                    {contentItems.length > 1 && index === 0 ? <strong>{item}</strong> : item}
                    <br />
                </div>
            );
        }),
        placement,
        delay: 300,
    };
};
