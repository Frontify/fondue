/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignJustifyMarkupElement } from './AlignJustifyMarkupElement';
import { AlignJustifyButton } from './AlignJustifyButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';
import { PluginProps } from '../../Plugin';

export class AlignJustifyPlugin extends AlignPlugin {
    constructor(props?: PluginProps) {
        super(ALIGN_PLUGIN, {
            button: AlignJustifyButton,
            markupElement: new AlignJustifyMarkupElement(),
            ...props,
        });
    }
}
