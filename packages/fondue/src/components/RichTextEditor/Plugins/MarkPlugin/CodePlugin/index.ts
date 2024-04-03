/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createCodePlugin } from '@udecode/plate-basic-marks';
import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../../Plugin';

import { CodeButton } from './CodeButton';
import { CodeMarkupElement } from './CodeMarkupElement';
import { CODE_PLUGIN } from './id';

export class CodePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(CODE_PLUGIN, {
            button: CodeButton,
            markupElement: new CodeMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [createCodePlugin()];
    }
}

export * from './CodeMarkupElement';
