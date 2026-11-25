/* (c) Copyright Frontify Ltd., all rights reserved. */

// The Markdown forms of a registry's nodes, with a host's overrides applied, as the lookups the reader and
// the writer ask: by node name to write, by token type to read.

import {
    type ContentRegistry,
    type MarkdownBlockForm,
    type MarkdownInlineForm,
    type MarkdownMarkForm,
    type MarkdownReadRule,
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

type TextRule = MarkdownTextPattern<NodeValue>;

type FormWithRules = { read: readonly (ReadRule | TextRule)[] };

/** A node that reads from a token type, and how. */
type Reader = { name: string; rule: ReadRule };

/** A node that reads from text matching a pattern. `pattern` is global, so every match in a text is found. */
export type TextReader = { name: string; pattern: RegExp; value: TextRule['value'] };

/** What a token read as: the node's name, and its value. */
export type ReadMatch = { name: string; value: NodeValue };

export type ReadersByToken = ReadonlyMap<string, readonly Reader[]>;

export type MarkdownForms = {
    blocks: ReadonlyMap<string, MarkdownBlockForm>;
    marks: ReadonlyMap<string, MarkdownMarkForm>;
    inlines: ReadonlyMap<string, MarkdownInlineForm>;
    blockReaders: ReadersByToken;
    markReaders: ReadersByToken;
    inlineReaders: ReadersByToken;
    /** In registry order, which is the order a pattern wins a tie. */
    textReaders: readonly TextReader[];
    /** The block types that are a list's items, which only a list holds. */
    itemTypes: ReadonlySet<string>;
};

type FormedDefinition<TForm> = { markdown?: TForm };

const GLOBAL_FLAG = 'g';

const isTokenRule = (rule: ReadRule | TextRule): rule is ReadRule => 'token' in rule;

/** An override replaces the definition's form for the node of that name; a name no definition has is ignored. */
const formsOf = <TForm>(
    definitions: ReadonlyMap<string, FormedDefinition<TForm>>,
    overrides: Readonly<Record<string, TForm>> | undefined,
): Map<string, TForm> => {
    const replaced = new Map(Object.entries(overrides ?? {}));
    const forms = new Map<string, TForm>();
    for (const [name, definition] of definitions) {
        const form = replaced.get(name) ?? definition.markdown;
        if (form !== undefined) {
            forms.set(name, form);
        }
    }

    return forms;
};

const readersByToken = (forms: ReadonlyMap<string, FormWithRules>): Map<string, Reader[]> => {
    const index = new Map<string, Reader[]>();
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
    const blocks = formsOf(registry.blocks, overrides?.blocks);
    const marks = formsOf(registry.marks, overrides?.marks);
    const inlines = formsOf(registry.inlines, overrides?.inlines);

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
export const matchToken = (readers: ReadersByToken, token: MarkdownToken): ReadMatch | null => {
    for (const { name, rule } of readers.get(token.type) ?? []) {
        const value = ruleValueOf(rule, token);
        if (value !== null) {
            return { name, value };
        }
    }

    return null;
};
