/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignJustifyMarkupElement } from './AlignJustifyMarkupElement';
import { AlignJustifyButton } from './AlignJustifyButton';
import { AlignPlugin } from '../AlignPlugin';
import { AlignPluginProps } from '../types';

export class AlignJustifyPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignJustifyButton,
            markupElement: new AlignJustifyMarkupElement(),
            ...props,
        });
    }
}
