/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_BOLD, createBoldPlugin } from '@udecode/plate';
import { BoldElement } from './BoldElement';
import { EditorPlugin } from '../EditorPlugin';

export class BoldPlugin implements EditorPlugin {
    public id = MARK_BOLD;
    public element = BoldElement;

    plugins() {
        return [createBoldPlugin()];
    }
}
