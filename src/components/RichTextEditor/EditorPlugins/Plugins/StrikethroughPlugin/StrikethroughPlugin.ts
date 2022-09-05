/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_STRIKETHROUGH, createStrikethroughPlugin } from '@udecode/plate';
import { StrikethroughElement } from './StrikethroughElement';
import { EditorPlugin } from '../EditorPlugin';

export class StrikethroughPlugin implements EditorPlugin {
    public id = MARK_STRIKETHROUGH;
    public element = StrikethroughElement;

    plugins() {
        return [createStrikethroughPlugin()];
    }
}
