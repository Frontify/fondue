/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { UnknownObject } from '../types';
import { PluginButton } from './types';
import type { MarkupElement } from './MarkupElement';

export abstract class Plugin {
    constructor(
        readonly id: string,
        readonly button?: PluginButton,
        readonly markupElement?: MarkupElement | MarkupElement[],
    ) {}

    abstract plugins(): PlatePlugin<UnknownObject, any>[];
}
