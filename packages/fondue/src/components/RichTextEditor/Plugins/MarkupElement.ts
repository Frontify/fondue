/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePluginComponent } from '@udecode/plate-core';

export class MarkupElement {
    constructor(
        protected id: string,
        protected node?: PlatePluginComponent,
    ) {}

    getId() {
        return this.id;
    }

    getNode() {
        return this.node;
    }
}
