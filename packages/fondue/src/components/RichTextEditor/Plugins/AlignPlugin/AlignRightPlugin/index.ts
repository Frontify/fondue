/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignRightMarkupElement } from './AlignRightMarkupElement';
import { AlignRightButton } from './AlignRightButton';
import { AlignPlugin } from '../AlignPlugin';
import { AlignPluginProps } from '../types';

export class AlignRightPlugin extends AlignPlugin {
    constructor(props?: AlignPluginProps) {
        super({
            button: AlignRightButton,
            markupElement: new AlignRightMarkupElement(),
            ...props,
        });
    }
}
