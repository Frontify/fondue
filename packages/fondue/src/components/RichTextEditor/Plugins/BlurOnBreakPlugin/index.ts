/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BLUR_ON_BREAK_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { createBlurOnBreakPlugin } from './createBlurOnBreakPlugin';
import { BlurOnBreakPlatePlugin } from './types';
import { PlatePlugin } from '@udecode/plate';

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
            }) as PlatePlugin,
        ];
    }
}
