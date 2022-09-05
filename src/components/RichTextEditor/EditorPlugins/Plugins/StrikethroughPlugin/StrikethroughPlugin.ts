/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_STRIKETHROUGH, createStrikethroughPlugin } from '@udecode/plate';
import { StrikethroughElement } from './StrikethroughElement';
import { Plugin } from '../../types';

export class StrikethroughPlugin implements Plugin {
    public id = MARK_STRIKETHROUGH;
    public element = StrikethroughElement;

    plugins() {
        return [createStrikethroughPlugin()];
    }
}
