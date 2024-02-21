/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignLeftMarkupElement } from './AlignLeftMarkupElement';
import { AlignLeftButton } from './AlignLeftButton';
import { AlignPlugin } from '../AlignPlugin';
import { AlignPluginProps } from '../types';

export class AlignLeftPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignLeftButton,
            markupElement: new AlignLeftMarkupElement(),
            ...props,
        });
    }
}
