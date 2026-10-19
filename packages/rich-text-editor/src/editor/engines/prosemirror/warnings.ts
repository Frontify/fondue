/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Dev-only warning for a command naming a type no mounted plugin provides (a typo, or a missing plugin); the command itself does nothing. */
export const warnUnknownType = (command: string, type: string): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.warn(`[RichTextEditor] ${command}("${type}") does nothing: no mounted plugin provides "${type}".`);
};

const warnedUnknown = new Set<string>();

/** Dev-only warning, once per type, for content in a document that no mounted plugin provides; it is kept as it is. */
export const warnUnknownContent = (kind: 'block' | 'inline' | 'mark', type: string): void => {
    if (process.env.NODE_ENV === 'production' || warnedUnknown.has(`${kind}:${type}`)) {
        return;
    }
    warnedUnknown.add(`${kind}:${type}`);
    console.warn(
        `[RichTextEditor] Unknown ${kind} type "${type}" kept as it is but cannot be edited. Did you forget to pass the plugin that defines it in \`plugins\`?`,
    );
};
