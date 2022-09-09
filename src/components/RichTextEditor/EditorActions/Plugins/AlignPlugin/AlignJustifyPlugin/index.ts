/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignJustifyMarkupElement } from './AlignJustifyMarkupElement';
import { AlignJustifyButton } from './AlignJustifyButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';

export class AlignJustifyPlugin extends AlignPlugin {
    constructor(id = ALIGN_PLUGIN, button = AlignJustifyButton, markupElement = new AlignJustifyMarkupElement()) {
        super(id, button, markupElement);
    }
}
