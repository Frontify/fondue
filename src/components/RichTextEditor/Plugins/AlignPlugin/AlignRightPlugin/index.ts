/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignRightMarkupElement } from './AlignRightMarkupElement';
import { AlignRightButton } from './AlignRightButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';
import { PluginProps } from '../../Plugin';

export class AlignRightPlugin extends AlignPlugin {
    constructor(props?: PluginProps) {
        super(ALIGN_PLUGIN, {
            button: AlignRightButton,
            markupElement: new AlignRightMarkupElement(),
            ...props,
        });
    }
}
