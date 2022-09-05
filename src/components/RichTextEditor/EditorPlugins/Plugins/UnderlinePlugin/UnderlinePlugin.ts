/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_UNDERLINE, createUnderlinePlugin } from '@udecode/plate';
import { UnderlineElement } from './UnderlineElement';
import { Plugin } from '../../types';

export class UnderlinePlugin implements Plugin {
    public id = MARK_UNDERLINE;
    public element = UnderlineElement;

    plugins() {
        return [createUnderlinePlugin()];
    }
}
