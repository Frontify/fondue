/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The lines of a source file from `firstLine` to the next `lastLine`, both included.
 *
 * Each anchor must be a whole line of the file, exactly. A missing anchor throws, so a
 * guide excerpt that drifted from its file fails when the page loads, not by showing stale code.
 *
 * @param source - The whole file, as `?raw` imports it
 * @param firstLine - The exact line the excerpt starts at
 * @param lastLine - The exact line the excerpt ends at, searched for after `firstLine`
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
