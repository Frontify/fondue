/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Dev-only warning for a command naming a type no mounted plugin provides (a typo, or a missing plugin); the command itself does nothing. */
export const warnUnknownType = (command: string, type: string): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.warn(`[RichTextEditor] ${command}("${type}") does nothing: no mounted plugin provides "${type}".`);
};
