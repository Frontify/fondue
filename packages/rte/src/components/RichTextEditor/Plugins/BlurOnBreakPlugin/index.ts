/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../Plugin';

import { createBlurOnBreakPlugin } from './createBlurOnBreakPlugin';
import { BLUR_ON_BREAK_PLUGIN } from './id';
import { type BlurOnBreakPlatePlugin } from './types';

export type BlurOnBreakPluginProps = PluginProps & BlurOnBreakPlatePlugin;

export class BlurOnBreakPlugin extends Plugin {
    protected onBreak;

    constructor(props?: BlurOnBreakPluginProps) {
        super(BLUR_ON_BREAK_PLUGIN, {
            ...props,
        });

        this.onBreak = props?.onBreak;
    }

    plugins(): PlatePlugin[] {
        return [
            createBlurOnBreakPlugin({
                options: {
                    onBreak: this.onBreak,
                },
            }),
        ];
    }
}
