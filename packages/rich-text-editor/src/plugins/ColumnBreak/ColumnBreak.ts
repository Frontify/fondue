/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak } from '@frontify/fondue-icons';

import { definePlugin } from '#/core';

import { columnBreakContent, type ColumnBreakPluginOptions } from './content';

/** Adds the column break to the content laid out in columns, and a button and `/` entry to insert it. */
export const columnBreakPlugin = (options: ColumnBreakPluginOptions = {}) =>
    definePlugin({
        id: 'column-break',
        content: columnBreakContent(options),
        toolbar: [
            { label: 'Column break', icon: IconTextColumnBreak, menu: { keywords: ['columns', 'break', 'split'] } },
        ],
    });
