/* (c) Copyright Frontify Ltd., all rights reserved. */

const NAME = /^\w+$/;
const RANGE = /^\{\s*(\d+)\s*(?:,\s*(\d*)\s*)?\}$/;
/** The engine's content automaton grows with range bounds, so a larger bound from a manifest could stall compilation. */
const MAX_REPEAT = 64;
const MAX_NESTING = 16;

/** How many copies a quantifier expands its term to: 1 for `?`, `*` and `+`, the upper bound of `{n,m}`. */
const repeatOf = (token: string | undefined) => {
    if (token === '?' || token === '*' || token === '+') {
        return 1;
    }
    const range = token === undefined ? null : RANGE.exec(token);
    if (range === null) {
        return undefined;
    }
    const min = Number(range[1]);
    const max = range[2] === undefined || range[2] === '' ? min : Number(range[2]);
    return max >= min ? max : undefined;
};

/**
 * The node and group names of a content expression in the package grammar (SPEC-rich-text-format, Vocabulary),
 * or `undefined` when it fails the grammar: terms with an optional `?`, `*`, `+` or `{n,m}`, in sequence or
 * joined by `|`, grouped by parentheses up to 16 deep. The `{n,m}` upper bounds along any nesting path multiply
 * to at most 64.
 */
export const contentNames = (expression: string): readonly string[] | undefined => {
    const tokens = expression.match(/\w+|\{[^}]*\}|\S/g);
    if (tokens === null) {
        return [];
    }
    const names: string[] = [];
    let index = 0;
    let depth = 0;

    /** Each parser returns the largest repeat product inside what it read, or `undefined` on failure. */
    const parseChoice = (): number | undefined => {
        let widest = parseSequence();
        while (widest !== undefined && tokens[index] === '|') {
            index += 1;
            const next = parseSequence();
            widest = next === undefined ? undefined : Math.max(widest, next);
        }
        return widest;
    };
    const parseSequence = (): number | undefined => {
        let terms = 0;
        let widest = 0;
        for (
            let token = tokens[index];
            token !== undefined && (NAME.test(token) || token === '(');
            token = tokens[index]
        ) {
            index += 1;
            let repeat = 1;
            if (token === '(') {
                depth += 1;
                const inner = depth > MAX_NESTING ? undefined : parseChoice();
                depth -= 1;
                if (inner === undefined || tokens[index] !== ')') {
                    return undefined;
                }
                index += 1;
                repeat = inner;
            } else {
                names.push(token);
            }
            const quantifier = repeatOf(tokens[index]);
            if (quantifier !== undefined) {
                index += 1;
                repeat *= quantifier;
            }
            if (repeat > MAX_REPEAT) {
                return undefined;
            }
            widest = Math.max(widest, repeat);
            terms += 1;
        }
        return terms > 0 ? widest : undefined;
    };

    return parseChoice() !== undefined && index === tokens.length ? names : undefined;
};
