/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignPlugin } from '../AlignPlugin';
import { type AlignPluginProps } from '../types';

import { AlignRightButton } from './AlignRightButton';
import { AlignRightMarkupElement } from './AlignRightMarkupElement';

export class AlignRightPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignRightButton,
            markupElement: new AlignRightMarkupElement(),
            ...props,
        });
    }
}
