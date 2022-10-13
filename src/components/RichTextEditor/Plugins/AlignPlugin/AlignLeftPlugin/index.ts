/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignLeftMarkupElement } from './AlignLeftMarkupElement';
import { AlignLeftButton } from './AlignLeftButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';
import { PluginProps } from '../../Plugin';

export class AlignLeftPlugin extends AlignPlugin {
    constructor(props?: PluginProps) {
        super(ALIGN_PLUGIN, {
            button: AlignLeftButton,
            markupElement: new AlignLeftMarkupElement(),
            ...props,
        });
    }
}
