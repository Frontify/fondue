/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ALIGN_PLUGIN } from '../id';
import { AlignCenterMarkupElement } from './AlignCenterMarkupElement';
import { AlignCenterButton } from './AlignCenterButton';
import { AlignPlugin } from '../AlignPlugin';

export class AlignCenterPlugin extends AlignPlugin {
    constructor(id = ALIGN_PLUGIN, button = AlignCenterButton, markupElement = new AlignCenterMarkupElement()) {
        super(id, button, markupElement);
    }
}
