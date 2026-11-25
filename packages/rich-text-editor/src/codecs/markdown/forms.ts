/* (c) Copyright Frontify Ltd., all rights reserved. */

// The Markdown forms of a registry's nodes, with a host's overrides applied, as the lookups the reader and
// the writer ask: by node name to write, by token type to read.

import {
    type ContentRegistry,
    type MarkdownBlockForm,
    type MarkdownDelimiters,
    type MarkdownInlineForm,
    type MarkdownInlineOutput,
    type MarkdownLinePrefix,
    type MarkdownMarkForm,
    type MarkdownMarkReadRule,
    type MarkdownReadRule,
    type MarkdownSuffixPattern,
    type MarkdownTextPattern,
    type MarkdownToken,
} from '#/core';

/** Replaces a node's Markdown form, by the name the node is stored under. */
export type MarkdownOverrides = {
    blocks?: Record<string, MarkdownBlockForm>;
    marks?: Record<string, MarkdownMarkForm>;
    inlines?: Record<string, MarkdownInlineForm>;
};

type NodeValue = Record<string, unknown>;

type ReadRule = MarkdownReadRule<NodeValue>;

export type MarkRule = MarkdownMarkReadRule<NodeValue>;

type TextRule = MarkdownTextPattern<NodeValue>;

type FormWithRules<TRule extends ReadRule> = { read: readonly (TRule | TextRule)[] };

/** A node that reads from a token type, and how. */
type Reader<TRule extends ReadRule> = { name: string; rule: TRule };

/** A node that reads from text matching a pattern. `pattern` is global, so every match in a text is found. */
export type TextReader = { name: string; pattern: RegExp; value: TextRule['value'] };

/** What a token read as: the node's name, its value, and the rule that read it. */
export type ReadMatch<TRule extends ReadRule = ReadRule> = { name: string; value: NodeValue; rule: TRule };

export type ReadersByToken<TRule extends ReadRule = ReadRule> = ReadonlyMap<string, readonly Reader<TRule>[]>;

export type MarkdownForms = {
    blocks: ReadonlyMap<string, MarkdownBlockForm>;
    marks: ReadonlyMap<string, MarkdownMarkForm>;
    inlines: ReadonlyMap<string, MarkdownInlineForm>;
    blockReaders: ReadersByToken;
    markReaders: ReadersByToken<MarkRule>;
    inlineReaders: ReadersByToken;
    /** In registry order, which is the order a pattern wins a tie. */
    textReaders: readonly TextReader[];
    /** The block types that are a list's items, which only a list holds. */
    itemTypes: ReadonlySet<string>;
};

type FormedDefinition<TForm> = { markdown?: TForm };

const GLOBAL_FLAG = 'g';

const STICKY_FLAG = 'y';

const isTokenRule = <TRule extends ReadRule>(rule: TRule | TextRule): rule is TRule => 'token' in rule;

const isRecord = (value: unknown): value is NodeValue =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const isLinePrefix = (value: unknown): value is MarkdownLinePrefix =>
    isRecord(value) && typeof value.first === 'string' && (typeof value.rest === 'string' || value.rest === null);

const isDelimiters = (value: unknown): value is MarkdownDelimiters =>
    isRecord(value) &&
    typeof value.open === 'string' &&
    typeof value.close === 'string' &&
    (value.suffix === undefined || typeof value.suffix === 'string');

const isInlineOutput = (value: unknown): value is MarkdownInlineOutput => {
    if (!isRecord(value)) {
        return false;
    }

    switch (value.kind) {
        case 'text':
            return typeof value.text === 'string';
        case 'markdown':
            return typeof value.markdown === 'string';
        case 'lineBreak':
            return true;
    }

    return false;
};

const isFunction = (value: unknown): value is (...parameters: unknown[]) => unknown => typeof value === 'function';

/** A form is host code, so it is checked once here: what it is not, throws or returns wrongly is no form for the value. */
const guarded = <TArguments extends unknown[], TResult>(
    form: unknown,
    isResult: (result: unknown) => result is TResult,
): ((...parameters: TArguments) => TResult | null) => {
    if (!isFunction(form)) {
        return () => null;
    }

    return (...parameters) => {
        try {
            const result: unknown = form(...parameters);
            if (isResult(result)) {
                return result;
            }

            return null;
        } catch {
            return null;
        }
    };
};

const hasToken = (rule: unknown): rule is { token: string; value?: unknown; suffix?: unknown } =>
    isRecord(rule) && typeof rule.token === 'string';

const hasPattern = (rule: unknown): rule is { pattern: RegExp; value?: unknown } =>
    isRecord(rule) && rule.pattern instanceof RegExp;

const checkedTokenRule = ({ token, value }: { token: string; value?: unknown }): ReadRule => {
    if (value === undefined) {
        return { token };
    }

    return { token, value: guarded(value, isRecord) };
};

const checkedTextRule = ({ pattern, value }: { pattern: RegExp; value?: unknown }): TextRule => ({
    pattern,
    value: guarded<[match: RegExpExecArray], NodeValue>(value, isRecord),
});

/** A suffix needs a pattern, which is sticky so it only reads at the start of the text after the mark. */
const checkedSuffix = (suffix: unknown): MarkdownSuffixPattern<NodeValue> | undefined => {
    if (!hasPattern(suffix)) {
        return undefined;
    }

    const { pattern, value } = suffix;
    const flags = pattern.flags.replace(GLOBAL_FLAG, '').replace(STICKY_FLAG, '');

    return {
        pattern: new RegExp(pattern.source, `${flags}${STICKY_FLAG}`),
        value: guarded<[value: NodeValue, match: RegExpExecArray], NodeValue>(value, isRecord),
    };
};

const checkedMarkRules = (rules: unknown): MarkRule[] => {
    if (!Array.isArray(rules)) {
        return [];
    }

    const checked: MarkRule[] = [];
    for (const rule of rules) {
        if (hasToken(rule)) {
            checked.push({ ...checkedTokenRule(rule), suffix: checkedSuffix(rule.suffix) });
        }
    }

    return checked;
};

/** The rules that have a token or a pattern, each with a value that never throws or returns a non-object. */
const checkedReadRules = (rules: unknown): (ReadRule | TextRule)[] => {
    if (!Array.isArray(rules)) {
        return [];
    }

    const checked: (ReadRule | TextRule)[] = [];
    for (const rule of rules) {
        if (hasToken(rule)) {
            checked.push(checkedTokenRule(rule));
        } else if (hasPattern(rule)) {
            checked.push(checkedTextRule(rule));
        }
    }

    return checked;
};

const formPartsOf = (form: unknown): Record<string, unknown> => {
    if (isRecord(form)) {
        return form;
    }

    return {};
};

const checkedBlockForm = (form: unknown): MarkdownBlockForm => {
    const { read, write } = formPartsOf(form);

    return { read: checkedReadRules(read).filter(isTokenRule), write: guarded(write, isLinePrefix) };
};

const checkedMarkForm = (form: unknown): MarkdownMarkForm => {
    const { read, write, literal } = formPartsOf(form);

    return {
        read: checkedMarkRules(read),
        write: guarded(write, isDelimiters),
        literal: literal === true,
    };
};

const checkedInlineForm = (form: unknown): MarkdownInlineForm => {
    const { read, write } = formPartsOf(form);

    return { read: checkedReadRules(read), write: guarded(write, isInlineOutput) };
};

/**
 * An override replaces the definition's form for the node of that name; a name no definition has is ignored.
 * Each form comes back checked, so a form that throws or returns the wrong shape never reaches the reader or the writer.
 */
const formsOf = <TForm>(
    definitions: ReadonlyMap<string, FormedDefinition<TForm>>,
    overrides: Readonly<Record<string, TForm>> | undefined,
    check: (form: unknown) => TForm,
): Map<string, TForm> => {
    const replaced = new Map(Object.entries(overrides ?? {}));
    const forms = new Map<string, TForm>();
    for (const [name, definition] of definitions) {
        const form = replaced.get(name) ?? definition.markdown;
        if (form !== undefined) {
            forms.set(name, check(form));
        }
    }

    return forms;
};

const readersByToken = <TRule extends ReadRule>(
    forms: ReadonlyMap<string, FormWithRules<TRule>>,
): Map<string, Reader<TRule>[]> => {
    const index = new Map<string, Reader<TRule>[]>();
    for (const [name, form] of forms) {
        for (const rule of form.read.filter(isTokenRule)) {
            const readers = index.get(rule.token) ?? [];
            readers.push({ name, rule });
            index.set(rule.token, readers);
        }
    }

    return index;
};

const textReadersOf = (forms: ReadonlyMap<string, MarkdownInlineForm>): TextReader[] => {
    const readers: TextReader[] = [];
    for (const [name, form] of forms) {
        for (const rule of form.read) {
            if (!isTokenRule(rule)) {
                const { pattern, value } = rule;
                const flags = pattern.flags.includes(GLOBAL_FLAG) ? pattern.flags : `${pattern.flags}${GLOBAL_FLAG}`;
                readers.push({ name, pattern: new RegExp(pattern.source, flags), value });
            }
        }
    }

    return readers;
};

export const buildForms = (registry: ContentRegistry, overrides: MarkdownOverrides | undefined): MarkdownForms => {
    const blocks = formsOf(registry.blocks, overrides?.blocks, checkedBlockForm);
    const marks = formsOf(registry.marks, overrides?.marks, checkedMarkForm);
    const inlines = formsOf(registry.inlines, overrides?.inlines, checkedInlineForm);

    return {
        blocks,
        marks,
        inlines,
        blockReaders: readersByToken(blocks),
        markReaders: readersByToken(marks),
        inlineReaders: readersByToken(inlines),
        textReaders: textReadersOf(inlines),
        itemTypes: new Set(registry.itemTypeByList.values()),
    };
};

/** A rule without a `value` reads every token of its type, as a node with no value. */
const ruleValueOf = (rule: ReadRule, token: MarkdownToken): NodeValue | null => {
    if (rule.value === undefined) {
        return {};
    }

    return rule.value(token);
};

/** The first node, in registry order, whose rule reads the token. */
export const matchToken = <TRule extends ReadRule>(
    readers: ReadersByToken<TRule>,
    token: MarkdownToken,
): ReadMatch<TRule> | null => {
    for (const { name, rule } of readers.get(token.type) ?? []) {
        const value = ruleValueOf(rule, token);
        if (value !== null) {
            return { name, value, rule };
        }
    }

    return null;
};
