/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePluginComponent } from '@udecode/plate';

export class MarkupElement {
    constructor(readonly id: string, readonly node?: PlatePluginComponent<any>) {}
}
