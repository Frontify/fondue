/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignLeftMarkupElement } from './AlignLeftMarkupElement';
import { AlignLeftButton } from './AlignLeftButton';
import { ALIGN_PLUGIN } from '../id';
import { AlignPlugin } from '../AlignPlugin';

export class AlignLeftPlugin extends AlignPlugin {
    constructor(id = ALIGN_PLUGIN, button = AlignLeftButton, markupElement = new AlignLeftMarkupElement()) {
        super(id, button, markupElement);
    }
}
