/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The lines of a source file from the exact line `firstLine` to the next exact line `lastLine`, both included.
 * Throws on a missing anchor, so a drifted excerpt fails at page load instead of showing stale code.
 */
export const excerptOf = (source: string, firstLine: string, lastLine: string): string => {
    const lines = source.split('\n');
    const start = lines.indexOf(firstLine);
    if (start === -1) {
        throw new Error(`Guide excerpt anchor not found: ${firstLine}`);
    }
    const end = lines.indexOf(lastLine, start + 1);
    if (end === -1) {
        throw new Error(`Guide excerpt end anchor not found after "${firstLine}": ${lastLine}`);
    }
    return lines.slice(start, end + 1).join('\n');
};
