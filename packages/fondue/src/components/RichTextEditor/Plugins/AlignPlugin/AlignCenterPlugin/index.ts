/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from '../AlignPlugin';
import { type AlignPluginProps } from '../types';

import { AlignCenterButton } from './AlignCenterButton';
import { AlignCenterMarkupElement } from './AlignCenterMarkupElement';

export class AlignCenterPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignCenterButton,
            markupElement: new AlignCenterMarkupElement(),
            ...props,
        });
    }
}
