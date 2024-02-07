/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { ColumnBreakButton } from './ColumnBreakButton';
import { onKeyDownColumnBreak } from './onKeyDownColumnBreak';
import { CSSProperties } from 'react';
import { useColumnBreakHandler } from './useColumnBreakHandler';

export const KEY_ELEMENT_BREAK_AFTER_COLUMN = 'breakAfterColumn';
export const GAP_DEFAULT = 'normal';

export class BreakAfterPlugin extends Plugin {
    private columns: number;
    private gap: CSSProperties['gap'];
    constructor(props?: PluginProps) {
        super('break-after-plugin', {
            button: ColumnBreakButton,
            ...props,
        });
        this.columns = props?.columns ?? 1;
        this.gap = props?.gap ?? GAP_DEFAULT;
    }

    plugins(): PlatePlugin[] {
        return [createColumnBreakPlugin(this.columns, this.gap)];
    }
}

export const createColumnBreakPlugin = (columns: number, gap: CSSProperties['gap']): PlatePlugin => {
    return createPluginFactory({
        key: KEY_ELEMENT_BREAK_AFTER_COLUMN,
        handlers: {
            onKeyDown: onKeyDownColumnBreak,
        },
        useHooks: useColumnBreakHandler,
        options: {
            columns,
            gap,
            hotkey: ['shift+ctrl+enter'],
        },
    })();
};
