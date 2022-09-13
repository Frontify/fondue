/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ALIGN_PLUGIN } from '../id';
import { AlignCenterMarkupElement } from './AlignCenterMarkupElement';
import { AlignCenterButton } from './AlignCenterButton';
import { AlignPlugin } from '../AlignPlugin';
import { PluginProps } from '../../Plugin';

export class AlignCenterPlugin extends AlignPlugin {
    constructor(props?: PluginProps) {
        super({
            id: ALIGN_PLUGIN,
            button: AlignCenterButton,
            markupElement: new AlignCenterMarkupElement(),
            ...props,
        });
    }
}
