/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ExitBreakPlugin, ExitBreakRule, createExitBreakPlugin } from '@udecode/plate';
import { INIT_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { exitBreakPluginConfig } from './config';

export type ShiftEnterBreakPluginProps = PluginProps & ExitBreakPlugin;

export class ShiftEnterBreakPlugin extends Plugin {
    private rules?: ExitBreakRule[];

    constructor(props?: ShiftEnterBreakPluginProps) {
        super(INIT_PLUGIN, {
            ...props,
        });

        this.rules = props?.rules;
    }

    plugins() {
        const config = this.rules && this.rules.length > 0 ? { options: { rules: this.rules } } : {};
        return [createExitBreakPlugin({ ...exitBreakPluginConfig, ...config })];
    }
}
