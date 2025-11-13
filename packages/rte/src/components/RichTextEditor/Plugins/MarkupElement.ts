/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePluginComponent } from '@udecode/plate-core';

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
