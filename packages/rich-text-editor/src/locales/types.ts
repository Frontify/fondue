/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type enUS } from './en-US';

type English = typeof enUS;

export type RichTextStringKey = keyof English;

/** Every string the editor and its shipped plugins show, keyed `RichTextEditor_camelCase`, with `${name}` variables. */
export type RichTextStrings = { [Key in RichTextStringKey]: string };

/** The names of the `${name}` variables in `Text`. */
type VariableNames<Text extends string> = Text extends `${string}\${${infer Name}}${infer Rest}`
    ? Name | VariableNames<Rest>
    : never;

/** The names of the variables the string under `Key` needs, as its English wording has them. */
export type VariableNamesOf<Key extends RichTextStringKey> = VariableNames<English[Key]>;

/** The keys of the strings that need no variables, such as a control's name. */
export type PlainStringKey = {
    [Key in RichTextStringKey]: [VariableNamesOf<Key>] extends [never] ? Key : never;
}[RichTextStringKey];
