/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createListPlugin } from '@udecode/plate';
import { Plugin } from '../../types';
import { LIST_PLUGIN } from '../id';
import { UnorderedListMarkupElement } from './UnorderedListMarkupElement';
import { UnorderedListButton } from './UnorderedListButton';

export class UnorderedListPlugin implements Plugin {
    public type = LIST_PLUGIN;
    public markupElement = new UnorderedListMarkupElement();
    public button = UnorderedListButton;

    plugins() {
        return [createListPlugin()];
    }
}
