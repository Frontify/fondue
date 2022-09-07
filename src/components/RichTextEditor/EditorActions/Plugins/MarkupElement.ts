/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePluginComponent } from '@udecode/plate';

export class MarkupElement {
    constructor(private readonly _id: string, private readonly _elementTag?: PlatePluginComponent<any>) {}

    get id() {
        return this._id;
    }

    get elementTag() {
        return this._elementTag;
    }
}
