/* (c) Copyright Frontify Ltd., all rights reserved. */

const NAME = /^\w+$/;
const RANGE = /^\{\s*(\d+)\s*(?:,\s*(\d*)\s*)?\}$/;
/** The engine's content automaton grows with range bounds, so a larger bound from a manifest could stall compilation. */
const MAX_REPEAT = 64;
const MAX_NESTING = 16;

type Expression =
    | { readonly kind: 'name'; readonly name: string }
    | { readonly kind: 'sequence'; readonly items: readonly Expression[] }
    | { readonly kind: 'choice'; readonly options: readonly Expression[] }
    | { readonly kind: 'repeat'; readonly item: Expression; readonly min: number; readonly max: number };

/** A quantifier's bounds and how many copies it expands its term to: 1 for `?`, `*` and `+`, the upper bound of `{n,m}`. */
const quantifierOf = (token: string | undefined) => {
    if (token === '?') {
        return { min: 0, max: 1, copies: 1 };
    }
    if (token === '*' || token === '+') {
        return { min: token === '*' ? 0 : 1, max: Infinity, copies: 1 };
    }
    const range = token === undefined ? null : RANGE.exec(token);
    if (range === null) {
        return undefined;
    }
    const min = Number(range[1]);
    if (range[2] === undefined || range[2] === '') {
        return { min, max: range[2] === undefined ? min : Infinity, copies: min };
    }
    const max = Number(range[2]);
    return max >= min ? { min, max, copies: max } : undefined;
};

type Parsed = { readonly expression: Expression; readonly widest: number };

const parse = (source: string): { readonly expression: Expression; readonly names: readonly string[] } | undefined => {
    const tokens = source.match(/\w+|\{[^}]*\}|\S/g);
    if (tokens === null) {
        return { expression: { kind: 'sequence', items: [] }, names: [] };
    }
    const names: string[] = [];
    let index = 0;
    let depth = 0;

    /** Each parser also returns the largest repeat product inside what it read, or `undefined` on failure. */
    const parseChoice = (): Parsed | undefined => {
        const first = parseSequence();
        if (first === undefined) {
            return undefined;
        }
        const options = [first.expression];
        let widest = first.widest;
        while (tokens[index] === '|') {
            index += 1;
            const next = parseSequence();
            if (next === undefined) {
                return undefined;
            }
            options.push(next.expression);
            widest = Math.max(widest, next.widest);
        }
        return { expression: options.length === 1 ? first.expression : { kind: 'choice', options }, widest };
    };
    const parseSequence = (): Parsed | undefined => {
        const items: Expression[] = [];
        let widest = 0;
        for (
            let token = tokens[index];
            token !== undefined && (NAME.test(token) || token === '(');
            token = tokens[index]
        ) {
            index += 1;
            let item: Expression = { kind: 'name', name: token };
            let repeat = 1;
            if (token === '(') {
                depth += 1;
                const inner = depth > MAX_NESTING ? undefined : parseChoice();
                depth -= 1;
                if (inner === undefined || tokens[index] !== ')') {
                    return undefined;
                }
                index += 1;
                item = inner.expression;
                repeat = inner.widest;
            } else {
                names.push(token);
            }
            const quantifier = quantifierOf(tokens[index]);
            if (quantifier !== undefined) {
                index += 1;
                repeat *= quantifier.copies;
                item = { kind: 'repeat', item, min: quantifier.min, max: quantifier.max };
            }
            if (repeat > MAX_REPEAT) {
                return undefined;
            }
            widest = Math.max(widest, repeat);
            items.push(item);
        }
        return items.length > 0 ? { expression: { kind: 'sequence', items }, widest } : undefined;
    };

    const parsed = parseChoice();
    return parsed !== undefined && index === tokens.length ? { expression: parsed.expression, names } : undefined;
};

/**
 * The node and group names of a content expression in the package grammar,
 * or `undefined` when it fails the grammar: terms with an optional `?`, `*`, `+` or `{n,m}`, in sequence or
 * joined by `|`, grouped by parentheses up to 16 deep. The `{n,m}` upper bounds along any nesting path multiply
 * to at most 64.
 */
export const contentNames = (expression: string): readonly string[] | undefined => parse(expression)?.names;

interface Edge {
    /** A node or group name; none for an empty move. */
    readonly term?: string;
    readonly to: number;
}
interface Automaton {
    readonly edges: readonly (readonly Edge[])[];
    readonly accept: number;
}

const build = (expression: Expression): Automaton => {
    const edges: Edge[][] = [[]];
    const state = () => edges.push([]) - 1;
    const link = (from: number, to: number, term?: string) =>
        edges[from]?.push(term === undefined ? { to } : { term, to });
    const add = (part: Expression, from: number): number => {
        switch (part.kind) {
            case 'name': {
                const to = state();
                link(from, to, part.name);
                return to;
            }
            case 'sequence':
                return part.items.reduce((at, item) => add(item, at), from);
            case 'choice': {
                const end = state();
                for (const option of part.options) {
                    link(add(option, from), end);
                }
                return end;
            }
            case 'repeat': {
                let at = from;
                for (let copy = 0; copy < part.min; copy += 1) {
                    at = add(part.item, at);
                }
                const end = state();
                if (part.max === Infinity) {
                    link(at, end);
                    link(add(part.item, end), end);
                    return end;
                }
                link(at, end);
                for (let copy = part.min; copy < part.max; copy += 1) {
                    at = add(part.item, at);
                    link(at, end);
                }
                return end;
            }
        }
    };
    const accept = add(expression, 0);
    return { edges, accept };
};

const automata = new Map<string, Automaton | null>();

const automatonOf = (expression: string): Automaton | undefined => {
    let automaton = automata.get(expression);
    if (automaton === undefined) {
        const parsed = parse(expression);
        automaton = parsed === undefined ? null : build(parsed.expression);
        automata.set(expression, automaton);
    }
    return automaton ?? undefined;
};

const closure = (automaton: Automaton, states: readonly number[]): number[] => {
    const reached = new Set(states);
    const pending = [...states];
    for (let state = pending.pop(); state !== undefined; state = pending.pop()) {
        for (const edge of automaton.edges[state] ?? []) {
            if (edge.term === undefined && !reached.has(edge.to)) {
                reached.add(edge.to);
                pending.push(edge.to);
            }
        }
    }
    return [...reached];
};

/** Where matching a child sequence against a content expression stands; empty once the expression rejects. */
export type ContentMatch = { readonly expression: string; readonly states: readonly number[] };

/** The match before the first child; a missing expression, a leaf, accepts no child. */
export const startMatch = (expression = ''): ContentMatch => {
    const automaton = automatonOf(expression);
    return { expression, states: automaton === undefined ? [] : closure(automaton, [0]) };
};

/** The match after one more child, which `accepts` says each term takes. */
export const advanceMatch = (match: ContentMatch, accepts: (term: string) => boolean): ContentMatch => {
    const automaton = automatonOf(match.expression);
    if (automaton === undefined) {
        return { expression: match.expression, states: [] };
    }
    const next: number[] = [];
    for (const state of match.states) {
        for (const edge of automaton.edges[state] ?? []) {
            if (edge.term !== undefined && accepts(edge.term)) {
                next.push(edge.to);
            }
        }
    }
    return { expression: match.expression, states: closure(automaton, next) };
};

/** Whether the children so far complete the expression. */
export const matchEnds = (match: ContentMatch): boolean => {
    const automaton = automatonOf(match.expression);
    return automaton !== undefined && match.states.includes(automaton.accept);
};
