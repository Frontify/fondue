/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { ColumnBreakButton } from './ColumnBreakButton';
import { withColumnBreak } from './withColumnBreak';

export const KEY_ELEMENT_BREAK_AFTER = 'breakAfterColumn';

export class BreakAfterPlugin extends Plugin {
    private columns: number;
    private gap: number;
    constructor(props?: PluginProps) {
        super('break-after-plugin', {
            button: ColumnBreakButton,
            ...props,
        });
        this.columns = props?.columns ?? 1;
        this.gap = props?.gap ?? 10;
    }

    plugins() {
        return [createColumnBreakPlugin(this.columns, this.gap)];
    }
}

export const createColumnBreakPlugin = (columns: number, gap: number) => {
    return createPluginFactory({
        key: KEY_ELEMENT_BREAK_AFTER,
        withOverrides: withColumnBreak(columns),
        options: {
            columns,
            gap,
        },
    })();
};
