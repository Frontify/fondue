/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_ITALIC, createItalicPlugin } from '@udecode/plate';
import { ItalicElement } from './ItalicElement';
import { Plugin } from '../types';
import { ItalicButton } from './ItalicButton';

export class ItalicPlugin implements Plugin {
    public id = MARK_ITALIC;
    public element = ItalicElement;
    public button = ItalicButton;

    plugins() {
        return [createItalicPlugin()];
    }
}
