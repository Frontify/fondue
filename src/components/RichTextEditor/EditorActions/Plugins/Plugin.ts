/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { UnknownObject } from '../types';
import { InlineData, PluginButton } from './types';
import type { MarkupElement } from './MarkupElement';

export abstract class Plugin {
    constructor(
        readonly id: string,
        readonly button?: PluginButton,
        readonly markupElement?: MarkupElement,
        readonly leafMarkupElements?: MarkupElement | MarkupElement[],
    ) {}

    inline(): InlineData | undefined {
        return undefined;
    }

    abstract plugins(): PlatePlugin<UnknownObject, any>[];
}
