/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { UnknownObject } from '../types';
import { ButtonProps } from './types';
import type { MarkupElement } from './MarkupElement';

export abstract class Plugin {
    constructor(
        private readonly _id: string,
        private readonly _button: ({ editor, id }: ButtonProps) => JSX.Element,
        private readonly _markupElement: MarkupElement,
    ) {}

    get id() {
        return this._id;
    }

    get markupElement() {
        return this._markupElement;
    }

    get button() {
        return this._button;
    }

    abstract plugins(): PlatePlugin<UnknownObject, any>[];
}
