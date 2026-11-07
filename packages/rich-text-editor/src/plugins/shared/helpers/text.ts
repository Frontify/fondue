/* (c) Copyright Frontify Ltd., all rights reserved. */

/** C0 and C1 control characters, and the bidirectional marks, embeddings, overrides and isolates that reorder the text around them. */
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F-\u009F؜‎‏‪-‮⁦-⁩]/g;

/** Text from a stored document or an app lookup as shown: without control characters; the letters of every script stay. */
export const withoutControlCharacters = (text: string): string => text.replaceAll(CONTROL_CHARACTERS, '');
