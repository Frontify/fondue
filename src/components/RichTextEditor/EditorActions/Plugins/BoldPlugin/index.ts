/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createBoldPlugin } from '@udecode/plate';
import { BOLD_PLUGIN } from './id';
import { BoldMarkupElement } from './BoldMarkupElement';
import { BoldButton } from './BoldButton';
import { Plugin } from '../types';

export class BoldPlugin implements Plugin {
    public type = BOLD_PLUGIN;
    public markupElement = new BoldMarkupElement();
    public button = BoldButton;

    plugins() {
        return [createBoldPlugin()];
    }
}
