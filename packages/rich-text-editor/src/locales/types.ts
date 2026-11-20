/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type enUS } from './en-US';

/** Every string the editor and its shipped plugins show, keyed `RichTextEditor_camelCase`, with `${name}` variables. */
export type RichTextStrings = typeof enUS;

export type RichTextStringKey = keyof RichTextStrings;
