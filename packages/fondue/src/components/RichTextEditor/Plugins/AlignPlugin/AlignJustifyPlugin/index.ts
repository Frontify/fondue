/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from '../AlignPlugin';
import { type AlignPluginProps } from '../types';

import { AlignJustifyButton } from './AlignJustifyButton';
import { AlignJustifyMarkupElement } from './AlignJustifyMarkupElement';

export class AlignJustifyPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignJustifyButton,
            markupElement: new AlignJustifyMarkupElement(),
            ...props,
        });
    }
}
