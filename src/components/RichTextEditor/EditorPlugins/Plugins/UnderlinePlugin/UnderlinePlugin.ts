/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_UNDERLINE, createUnderlinePlugin } from '@udecode/plate';
import { UnderlineElement } from './UnderlineElement';
import { EditorPlugin } from '../EditorPlugin';

export class UnderlinePlugin implements EditorPlugin {
    public id = MARK_UNDERLINE;
    public element = UnderlineElement;

    plugins() {
        return [createUnderlinePlugin()];
    }
}
