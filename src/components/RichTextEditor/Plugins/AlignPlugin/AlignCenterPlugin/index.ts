/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignCenterMarkupElement } from './AlignCenterMarkupElement';
import { AlignCenterButton } from './AlignCenterButton';
import { AlignPlugin } from '../AlignPlugin';
import { AlignPluginProps } from '../types';

export class AlignCenterPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignCenterButton,
            markupElement: new AlignCenterMarkupElement(),
            ...props,
        });
    }
}
