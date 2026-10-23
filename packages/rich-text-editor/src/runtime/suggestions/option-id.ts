/* (c) Copyright Frontify Ltd., all rights reserved. */

// An `id` holds no white space; every character but ASCII letters, digits and `-` becomes its code point between
// underscores, which no other character writes, so two keys never give one id.
const ID_UNSAFE = /[^a-zA-Z0-9-]/gu;

/**
 * The `id` of the option with `key` in the list `listId`, which `aria-activedescendant` names. It follows the option, not its
 * place, so new results at the active place change the attribute and a screen reader announces the new option.
 */
export const suggestionOptionId = (listId: string, key: string): string =>
    `${listId}-option-${key.replaceAll(ID_UNSAFE, (character) => `_${(character.codePointAt(0) ?? 0).toString(16)}_`)}`;
