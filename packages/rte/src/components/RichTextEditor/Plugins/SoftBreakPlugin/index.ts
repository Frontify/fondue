/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createSoftBreakPlugin } from '@udecode/plate-break';
import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../Plugin';

import { SOFT_BREAK_PLUGIN } from './id';

export class SoftBreakPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(SOFT_BREAK_PLUGIN, {
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [createSoftBreakPlugin()];
    }
}
