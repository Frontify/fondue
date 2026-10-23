/* (c) Copyright Frontify Ltd., all rights reserved. */

/** One to four delimiter characters, then at most one trailing space. */
export const markdownDelimiterPattern = '^[!"#$%\'*+,./:;=>?@^_{|}~`-]{1,4} ?$';
/** Three or four backticks or tildes, or one to four delimiter characters with no space, backtick, or leading ~~~. */
export const markdownFencePattern = '^(?:`{3,4}|~{3,4}|(?!~~~)[!"#$%\'*+,./:;=>?@^_{|}~-]{1,4})$';
