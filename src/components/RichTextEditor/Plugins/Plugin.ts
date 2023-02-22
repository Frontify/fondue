/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnyObject, PlatePlugin } from '@udecode/plate';
import { InlineData, PluginButton } from './types';
import type { MarkupElement } from './MarkupElement';

export type PluginProps = {
    id?: string;
    button?: PluginButton;
    markupElement?: MarkupElement;
    leafMarkupElements?: MarkupElement | MarkupElement[];
    noButton?: boolean;
};

export abstract class Plugin<P extends PluginProps = PluginProps> {
    readonly id: string;
    readonly button?: PluginButton;
    readonly markupElement?: MarkupElement;
    readonly leafMarkupElements?: MarkupElement | MarkupElement[];
    readonly props?: P;

    constructor(id: string, protected rest: P) {
        this.id = this.rest.id || id;
        this.button = this.rest?.button;
        this.markupElement = this.rest?.markupElement;
        this.leafMarkupElements = this.rest?.leafMarkupElements;
        this.props = this.rest;
    }

    inline(): InlineData | undefined {
        return undefined;
    }

    abstract plugins(): PlatePlugin<AnyObject>[];
}
