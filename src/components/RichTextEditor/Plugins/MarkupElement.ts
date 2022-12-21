/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePluginComponent } from '@udecode/plate';

export class MarkupElement {
    constructor(protected id: string, protected node?: PlatePluginComponent) {}
}
