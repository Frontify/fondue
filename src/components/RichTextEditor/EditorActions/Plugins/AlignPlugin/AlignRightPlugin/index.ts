/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignRightMarkupElement } from './AlignRightMarkupElement';
import { AlignRightButton } from './AlignRightButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';

export class AlignRightPlugin extends AlignPlugin {
    constructor(id = ALIGN_PLUGIN, button = AlignRightButton, markupElement = new AlignRightMarkupElement()) {
        super(id, button, markupElement);
    }
}
