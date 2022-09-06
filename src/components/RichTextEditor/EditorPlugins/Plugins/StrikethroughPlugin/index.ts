/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_STRIKETHROUGH, createStrikethroughPlugin } from '@udecode/plate';
import { StrikethroughElement } from './StrikethroughElement';
import { Plugin } from '../types';
import { StrikethroughButton } from './StrikethroughButton';

export class StrikethroughPlugin implements Plugin {
    public id = MARK_STRIKETHROUGH;
    public element = StrikethroughElement;
    public button = StrikethroughButton;

    plugins() {
        return [createStrikethroughPlugin()];
    }
}
