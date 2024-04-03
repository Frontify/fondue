/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from '../AlignPlugin';
import { type AlignPluginProps } from '../types';

import { AlignLeftButton } from './AlignLeftButton';
import { AlignLeftMarkupElement } from './AlignLeftMarkupElement';

export class AlignLeftPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignLeftButton,
            markupElement: new AlignLeftMarkupElement(),
            ...props,
        });
    }
}
