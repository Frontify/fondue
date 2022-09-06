/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_UNDERLINE, createUnderlinePlugin } from '@udecode/plate';
import { UnderlineElement } from './UnderlineElement';
import { Plugin } from '../types';
import { UnderlineButton } from './UnderlineButton';

export class UnderlinePlugin implements Plugin {
    public id = MARK_UNDERLINE;
    public element = UnderlineElement;
    public button = UnderlineButton;

    plugins() {
        return [createUnderlinePlugin()];
    }
}
