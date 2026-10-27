/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type ParseRule, type Schema } from 'prosemirror-model';

import { type CompiledParseRule } from '#/model/internal';

/** What a function rule reads of an element: its attributes, or `null` when the rule refuses the element. */
export type Answer = ReturnType<CompiledParseRule['read']>;

/** The answers of function rules, each read once before the parse, and the elements refused per mark or node name. */
export type Answers = {
    byRule: ReadonlyMap<CompiledParseRule, ReadonlyMap<Element, Answer>>;
    refused: ReadonlyMap<string, ReadonlySet<Element>>;
};

/** The custom property on an element whose rule refuses mark `name`, since the engine clears a mark only by a style rule. */
const refusalOf = (name: string) => `--rte-refused-${name}`;

/**
 * Reads every function rule before the parse, then marks each element a mark rule refuses, so it, its own styles and
 * its content lose that mark, as CSS reads a `span` of normal weight inside a bold one.
 */
export const readAnswers = (body: HTMLElement, rules: readonly CompiledParseRule[]): Answers => {
    const byRule = new Map<CompiledParseRule, Map<Element, Answer>>();
    const refused = new Map<string, Set<Element>>();
    for (const rule of rules) {
        const answers = new Map<Element, Answer>();
        byRule.set(rule, answers);
        for (const element of Array.from(body.querySelectorAll<HTMLElement>(rule.tag))) {
            const answer = rule.read(element);
            answers.set(element, answer);
            if (answer !== null) {
                continue;
            }

            const elements = refused.get(rule.name) ?? new Set<Element>();
            elements.add(element);
            refused.set(rule.name, elements);
        }
    }

    // Only once every rule has read the elements, so no rule reads the property.
    for (const rule of rules) {
        if (rule.kind !== 'mark') {
            continue;
        }

        for (const element of refused.get(rule.name) ?? []) {
            (element as HTMLElement).style.setProperty(refusalOf(rule.name), 'refused');
        }
    }

    return { byRule, refused };
};

/** The engine rules of function rules, ahead of the schema's; a mark rule leaves the element to later rules for other marks. */
export const functionRules = (schema: Schema, rules: readonly CompiledParseRule[], answers: Answers): ParseRule[] =>
    rules.flatMap((rule): ParseRule[] => {
        const getAttrs = (element: HTMLElement) => answers.byRule.get(rule)?.get(element) ?? false;
        if (rule.kind === 'mark') {
            if (schema.marks[rule.name] === undefined) {
                return [];
            }

            return [{ tag: rule.tag, mark: rule.name, getAttrs, consuming: false }];
        }

        if (schema.nodes[rule.name] === undefined) {
            return [];
        }

        return [{ tag: rule.tag, node: rule.name, getAttrs }];
    });

/** A schema tag rule that no longer reads an element that a function rule of its own mark or node refuses. */
export const withRefusals = (rule: ParseRule, answers: Answers): ParseRule => {
    if (rule.tag === undefined) {
        return rule;
    }

    const owner = rule.mark ?? rule.node;
    const refused = answers.refused.get(owner ?? '');
    if (refused === undefined) {
        return rule;
    }

    const { getAttrs } = rule;
    const fixed = rule.attrs ?? null;

    return {
        ...rule,
        getAttrs: (element: HTMLElement) => {
            if (refused.has(element)) {
                return false;
            }

            if (getAttrs === undefined) {
                return fixed;
            }

            return getAttrs(element);
        },
    };
};

/** Style rules, after every other, that clear each refused mark from its marked elements. */
export const clearingRules = (schema: Schema, answers: Answers): ParseRule[] =>
    [...answers.refused.keys()]
        .filter((name) => schema.marks[name] !== undefined)
        .map((name) => ({ style: refusalOf(name), clearMark: (mark: Mark) => mark.type.name === name }));
