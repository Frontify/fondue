/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_ITALIC, createItalicPlugin } from '@udecode/plate';
import { ItalicElement } from './ItalicElement';
import { Plugin } from '../types';

export class ItalicPlugin implements Plugin {
    public id = MARK_ITALIC;
    public element = ItalicElement;

    plugins() {
        return [createItalicPlugin()];
    }
}
