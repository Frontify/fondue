/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { UnknownObject } from '../types';
import { PluginButton } from './types';
import type { MarkupElement } from './MarkupElement';

export type PluginProps = {
    id?: string;
    button?: PluginButton;
    markupElement?: MarkupElement;
    leafMarkupElements?: MarkupElement | MarkupElement[];
};

export abstract class Plugin {
    readonly id?: string;
    readonly button?: PluginButton;
    readonly markupElement?: MarkupElement;
    readonly leafMarkupElements?: MarkupElement | MarkupElement[];

    constructor(private props?: PluginProps) {
        this.id = this.props?.id;
        this.button = this.props?.button;
        this.markupElement = this.props?.markupElement;
        this.leafMarkupElements = this.props?.leafMarkupElements;
    }

    abstract plugins(): PlatePlugin<UnknownObject, any>[];
}
