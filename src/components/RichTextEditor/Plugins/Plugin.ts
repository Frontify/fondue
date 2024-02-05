/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { InlineData, PluginButton } from './types';
import { Position } from '../components/EditorPositioningWrapper';
import type { MarkupElement } from './MarkupElement';
import { CSSProperties } from 'react';

export type PluginProps = {
    id?: string;
    button?: PluginButton;
    markupElement?: MarkupElement;
    markupInputElement?: MarkupElement;
    leafMarkupElements?: MarkupElement | MarkupElement[];
    showIn?: Position[];
    columns?: number;
    gap?: string | number;
    label?: string;
    textStyles?: Plugin<PluginProps>[];
    styles?: CSSProperties;
};

export abstract class Plugin<P extends PluginProps = PluginProps> {
    readonly id: string;
    readonly button?: PluginButton;
    readonly markupElement?: MarkupElement;
    readonly markupInputElement?: MarkupElement;
    readonly leafMarkupElements?: MarkupElement | MarkupElement[];
    readonly showIn: Position[];
    readonly props?: P;
    readonly textStyles?: Plugin<PluginProps>[];
    readonly styles?: CSSProperties;

    constructor(id: string, rest?: P) {
        this.id = rest?.id || id;
        this.button = rest?.button;
        this.markupElement = rest?.markupElement;
        this.markupInputElement = rest?.markupInputElement;
        this.leafMarkupElements = rest?.leafMarkupElements;
        this.showIn = rest?.showIn ?? [Position.BOTTOM, Position.TOP, Position.FLOATING];
        this.props = rest;
    }

    inline(): InlineData | undefined {
        return undefined;
    }

    abstract plugins(): PlatePlugin[];
}
