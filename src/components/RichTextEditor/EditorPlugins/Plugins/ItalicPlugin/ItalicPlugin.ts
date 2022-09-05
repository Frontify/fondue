/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_ITALIC, createItalicPlugin } from '@udecode/plate';
import { ItalicElement } from './ItalicElement';
import { EditorPlugin } from '../EditorPlugin';

export class ItalicPlugin implements EditorPlugin {
    public id = MARK_ITALIC;
    public element = ItalicElement;

    plugins() {
        return [createItalicPlugin()];
    }
}
