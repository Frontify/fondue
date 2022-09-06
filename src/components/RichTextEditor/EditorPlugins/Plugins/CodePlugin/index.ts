/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_CODE, createCodePlugin } from '@udecode/plate';
import { CodeElement } from './CodeElement';
import { CodeButton } from './CodeButton';
import { Plugin } from '../types';

export class CodePlugin implements Plugin {
    public id = MARK_CODE;
    public element = CodeElement;
    public button = CodeButton;

    plugins() {
        return [createCodePlugin()];
    }
}
