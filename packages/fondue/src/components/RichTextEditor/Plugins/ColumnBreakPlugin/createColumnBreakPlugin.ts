/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { type CSSProperties } from 'react';

import { type BreakAfterPluginProps } from '@components/RichTextEditor/Plugins/ColumnBreakPlugin/types';

import { Plugin } from '../Plugin';

import { ColumnBreakButton } from './ColumnBreakButton';
import { columnBreakHandler } from './columnBreakHandler';
import { onKeyDownColumnBreak } from './onKeyDownColumnBreak';

export const KEY_ELEMENT_BREAK_AFTER_COLUMN = 'breakAfterColumn';
export const GAP_DEFAULT = 'normal';

export class BreakAfterPlugin extends Plugin {
    private columns: number;
    private gap: CSSProperties['gap'];
    private customClass: string | undefined;
    constructor(props?: BreakAfterPluginProps) {
        super('break-after-plugin', {
            button: ColumnBreakButton,
            ...props,
        });
        this.columns = props?.columns ?? 1;
        this.gap = props?.gap ?? GAP_DEFAULT;
        this.customClass = props?.customClass;
    }

    plugins(): PlatePlugin[] {
        return [createColumnBreakPlugin(this.columns, this.gap, this.customClass)];
    }
}

export const createColumnBreakPlugin = (
    columns: number,
    gap: CSSProperties['gap'],
    customClass: string | undefined,
): PlatePlugin => {
    return createPluginFactory({
        key: KEY_ELEMENT_BREAK_AFTER_COLUMN,
        handlers: {
            onKeyDown: onKeyDownColumnBreak,
        },
        useHooks: columnBreakHandler,
        options: {
            columns,
            gap,
            customClass,
            hotkey: ['shift+ctrl+enter'],
        },
    })();
};
