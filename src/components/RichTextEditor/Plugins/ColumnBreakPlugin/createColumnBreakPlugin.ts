/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { ColumnBreakButton } from './ColumnBreakButton';
import { withColumnBreak } from './withColumnBreak';
import { onKeyDownColumnBreak } from './onKeyDownColumnBreak';

export const KEY_ELEMENT_BREAK_AFTER = 'breakAfterColumn';

export class BreakAfterPlugin extends Plugin {
    private columns: number;
    private gap: string | number;
    constructor(props?: PluginProps) {
        super('break-after-plugin', {
            button: ColumnBreakButton,
            ...props,
        });
        this.columns = props?.columns ?? 1;
        this.gap = props?.gap ?? 'normal';
    }

    plugins() {
        return [createColumnBreakPlugin(this.columns, this.gap)];
    }
}

export const createColumnBreakPlugin = (columns: number, gap: string | number) => {
    return createPluginFactory({
        key: KEY_ELEMENT_BREAK_AFTER,
        handlers: {
            onKeyDown: onKeyDownColumnBreak,
        },
        withOverrides: withColumnBreak(columns),
        options: {
            columns,
            gap,
        },
    })();
};
