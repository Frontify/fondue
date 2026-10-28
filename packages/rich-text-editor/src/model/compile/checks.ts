/* (c) Copyright Frontify Ltd., all rights reserved. */

import { canonicalJson } from '../helpers/hash';
import { isRecord } from '../helpers/values';
import { type ColorToken } from '../styling/styles';
import {
    type ContentFinding,
    type ContentRepair,
    type ContentRule,
    type ContentRuleContext,
    type ContentRuleId,
    type ContentRuleInput,
} from '../vocabulary/contentRules';
import { type ContentModel, type JsonObject, type JsonValue, type RichTextLocale } from '../vocabulary/declarations';
import { type ContentNodeJSON, type MarkJSON, type RichTextDocument } from '../vocabulary/format';

import { CONTENT_CHECKS_FEATURE } from './capabilities';
import { compiledModel } from './compile';

/** One finding of the content checks: which rule found it, where, and the repair on offer if any. */
export type ContentIssue = {
    /** `${ruleId}:${nodeId}`, `${ruleId}:${path}` or `${ruleId}`. */
    id: string;
    ruleId: ContentRuleId;
    kind: 'automatic' | 'manual';
    severity: 'error' | 'warning' | 'review';
    /** Child indexes from the doc node; `null` for a document-level rule. */
    path: readonly number[] | null;
    nodeId: string | null;
    /** Any feature's command, customer features included. */
    repairCommand: string | null;
    /** The repair command's payload, such as `{ level: 3 }` for `heading.set`. */
    repairPayload: JsonValue | null;
    sequence: number;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6;

/** What the content checks need: the locale for word lists and the installed features whose rules run. */
export type ContentCheckOptions = {
    /** The word lists come from its `RichTextEditor_checkGenericImageWords` and `RichTextEditor_checkVagueLinkTexts`; the en-US lists are always added. */
    locale: RichTextLocale;
    /** The installed features declare the rules and decide repair availability, such as the language repair, and nodes it does not declare are skipped. */
    model: ContentModel;
    /**
     * Written to `ContentIssue.sequence`; 0 outside an editor.
     *
     * @default 0
     */
    sequence?: number;
    /**
     * The named colours that a mark's `tokenId` resolves against in the contrast checks.
     *
     * @default []
     */
    colorTokens?: readonly ColorToken[];
    /** The CSS colour of the page behind the editor, which the contrast check uses under a run with no highlight; a colour it cannot parse, or one that is not opaque, leaves that background unknown. */
    background?: string;
    /** The host page's heading level around the editor; `heading.skipped-level` checks the first heading against it. */
    enclosingHeadingLevel?: Level;
    /**
     * The heading levels the author may create, which the heading level repair stays within.
     *
     * @default [1, 2, 3, 4, 5, 6]
     */
    creatableHeadingLevels?: readonly number[];
};

/** The en-US generic image words, which every check adds to the locale's own list. */
export const GENERIC_IMAGE_WORDS =
    'image|picture|photo|photograph|pic|img|graphic|illustration|icon|logo|banner|screenshot|screen shot|alt|alt text|placeholder|untitled|thumbnail';
/** The en-US vague link texts, which every check adds to the locale's own list. */
export const VAGUE_LINK_TEXTS =
    'click here|click|here|link|this link|more|read more|learn more|more info|more information|info|details|go|continue|this|this page|website';

const ISLANDS = new Set(['unsupported_block', 'unsupported_inline']);
const LEVELS: readonly Level[] = [1, 2, 3, 4, 5, 6];

/** The issue ID part of a rule ID in locale keys: PascalCase with its dots and hyphens removed. */
const pascalOf = (ruleId: ContentRuleId) =>
    ruleId
        .split(/[.-]/)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');

/**
 * The locale key of a rule's name, such as `RichTextEditor_checkImageAltSuspicious`.
 * Public so the shipped features and the core share it.
 */
export const ruleNameKey = (ruleId: ContentRuleId): `RichTextEditor_${string}` =>
    `RichTextEditor_check${pascalOf(ruleId)}`;

/**
 * The locale key of a rule's explanation of how to decide, such as `RichTextEditor_checkImageAltSuspiciousHelp`.
 * Public so the shipped features and the core share it.
 */
export const ruleHelpKey = (ruleId: ContentRuleId): `RichTextEditor_${string}` =>
    `RichTextEditor_check${pascalOf(ruleId)}Help`;

/** Where an issue sits and what it covers: one node, or a run of inline children. */
type Subject = {
    path: readonly number[];
    /** The inline children a run covers from `path`; 1 for a node. */
    span: number;
    nodeId: string | null;
    signature: string;
};

/** A rule that looks at the whole document and names no feature's node. */
type DocumentRule = {
    check(context: ContentRuleContext): ContentFinding;
} & Omit<ContentRule, 'subject' | 'check'>;

const folded = (value: string) => value.trim().toLowerCase();

const attrsOf = (node: ContentNodeJSON): JsonObject => node.attrs ?? {};

const LANGUAGE_REPAIR: ContentRepair = { command: 'mark.language.edit', feature: 'marks.language' };

/** The rules of the document as a whole, which run before every feature's rules. */
export const DOCUMENT_RULES: readonly DocumentRule[] = [
    {
        id: 'language.parts-review',
        kind: 'manual',
        severity: 'review',
        repair: LANGUAGE_REPAIR,
        check: () => ({ payload: null }),
    },
    { id: 'sensory.review', kind: 'manual', severity: 'review', check: () => true },
    { id: 'structure.review', kind: 'manual', severity: 'review', check: () => true },
];

/** The rules the model's features declare, in model order and then declaration order. */
const featureRules = (model: ContentModel): readonly ContentRule[] =>
    compiledModel(model).features.flatMap(({ declaration }) => declaration.contentRules ?? []);

/** Each repair command a rule offers with the feature whose editor part must register it. */
export const CONTENT_REPAIRS = (model: ContentModel): readonly ContentRepair[] =>
    [...DOCUMENT_RULES, ...featureRules(model)].flatMap(({ repair }) => repair ?? []);

/** An issue with the inline children it covers from its path and the stored content it was found on. */
export type LocatedIssue = {
    issue: ContentIssue;
    span: number;
    /** The canonical JSON of what the issue names, which changes when its node does. */
    signature: string;
};

const listOf = (locale: RichTextLocale, key: `RichTextEditor_${string}`, english: string): ReadonlySet<string> => {
    const own = locale.translationStrings[key];

    return new Set(
        [...english.split('|'), ...(typeof own === 'string' ? own.split('|') : [])]
            .map(folded)
            .filter((word) => word !== ''),
    );
};

/** The text a reader meets in inline children: text, a mention's label and a line break. */
const inlineText = (children: readonly ContentNodeJSON[]): string =>
    children
        .map((child) => {
            if (typeof child.text === 'string') {
                return child.text;
            }

            if (child.type === 'hard_break') {
                return '\n';
            }

            const label = attrsOf(child).labelSnapshot;
            if (typeof label === 'string') {
                return label;
            }

            return inlineText(child.content ?? []);
        })
        .join('');

const markOf = (node: ContentNodeJSON, type: string) => node.marks?.find((mark) => mark.type === type);

const markKey = (mark: MarkJSON | undefined) => (mark === undefined ? '' : canonicalJson(mark));

const nodeIdOf = (node: ContentNodeJSON) => {
    const { nodeId } = attrsOf(node);

    return typeof nodeId === 'string' ? nodeId : null;
};

const signatureOf = (nodes: readonly ContentNodeJSON[]) => canonicalJson(nodes);

/** Runs of adjacent inline children whose `key` is equal and not empty. */
const runsOf = (children: readonly ContentNodeJSON[], key: (child: ContentNodeJSON) => string) => {
    const runs: { start: number; end: number }[] = [];
    let start = 0;
    while (start < children.length) {
        const first = children[start];
        const value = first === undefined ? '' : key(first);
        let end = start + 1;
        while (end < children.length && key(children[end] as ContentNodeJSON) === value) {
            end += 1;
        }

        if (value !== '') {
            runs.push({ start, end });
        }

        start = end;
    }

    return runs;
};

const isInline = (children: readonly ContentNodeJSON[]) =>
    children.some((child) => child.type === 'text' || child.marks !== undefined);

/** A rule with the subject its engine found, in reading order. */
type Found = {
    rule: ContentRule;
    subject: Subject;
    given: ContentRuleInput;
};

/** The subjects gathered while reading a document, and the rules that match its nodes and mark runs. */
type SubjectWalk = {
    found: Found[];
    nodeRules: Map<string, ContentRule[]>;
    markGroups: { marks: readonly string[]; rules: ContentRule[] }[];
    // How often each `nodeId` occurs, since a repeated one names no single node.
    nodeIds: Map<string, number>;
    previous: Map<string, ContentNodeJSON>;
    ancestors: ContentNodeJSON[];
    declared: ReadonlySet<string>;
};

/** Groups `rules` by the node or the mark run each one looks at. */
const indexSubjectRules = (walk: SubjectWalk, rules: readonly ContentRule[]) => {
    for (const rule of rules) {
        const { subject } = rule;
        if ('node' in subject) {
            walk.nodeRules.set(subject.node, [...(walk.nodeRules.get(subject.node) ?? []), rule]);
            continue;
        }

        const group = walk.markGroups.find(({ marks }) => marks.join(' ') === subject.marks.join(' '));
        if (group === undefined) {
            walk.markGroups.push({ marks: subject.marks, rules: [rule] });
        } else {
            group.rules.push(rule);
        }
    }
};

/** Records the subjects of `node` and of its children, in reading order. */
const visitContent = (walk: SubjectWalk, node: ContentNodeJSON, path: readonly number[]) => {
    if (ISLANDS.has(node.type)) {
        return;
    }

    // The editor keeps a node its model lacks as an island, which no repair or Go to can reach.
    if (!walk.declared.has(node.type)) {
        return;
    }

    const ownId = nodeIdOf(node);
    if (ownId !== null) {
        walk.nodeIds.set(ownId, (walk.nodeIds.get(ownId) ?? 0) + 1);
    }

    const owned = walk.nodeRules
        .get(node.type)
        ?.filter(({ subject }) => !('where' in subject) || subject.where?.(node) !== false);
    if (owned !== undefined && owned.length > 0) {
        const subject: Subject = { path, span: 1, nodeId: ownId, signature: signatureOf([node]) };
        const given = {
            node,
            covered: [node],
            ancestors: [...walk.ancestors],
            previous: walk.previous.get(node.type),
            marks: {},
            text: inlineText(node.content ?? []),
        };
        walk.found.push(...owned.map((rule) => ({ rule, subject, given })));
        walk.previous.set(node.type, node);
    }

    const children = node.content ?? [];
    walk.ancestors.push(node);
    if (!isInline(children) || walk.markGroups.length === 0) {
        for (const [index, child] of children.entries()) {
            visitContent(walk, child, [...path, index]);
        }

        walk.ancestors.pop();

        return;
    }

    const runs = walk.markGroups.map(({ marks }) =>
        runsOf(children, (child) => {
            const held = marks.map((name) => markOf(child, name));
            if (held.every((mark) => mark === undefined)) {
                return '';
            }

            return held.map(markKey).join(' ');
        }),
    );
    for (const [index, child] of children.entries()) {
        for (const [group, { marks, rules: grouped }] of walk.markGroups.entries()) {
            for (const { start, end } of runs[group] ?? []) {
                if (start !== index) {
                    continue;
                }

                const covered = children.slice(start, end);
                const first = covered[0] as ContentNodeJSON;
                const subject: Subject = {
                    path: [...path, start],
                    span: end - start,
                    nodeId: null,
                    signature: signatureOf(covered),
                };
                const held = Object.fromEntries(marks.map((name) => [name, markOf(first, name)]));
                const given = {
                    node: first,
                    covered,
                    ancestors: [...walk.ancestors],
                    marks: held,
                    text: inlineText(covered),
                };
                walk.found.push(...grouped.map((rule) => ({ rule, subject, given })));
            }
        }

        visitContent(walk, child, [...path, index]);
    }

    walk.ancestors.pop();
};

/** Each subject of the document in reading order, with the rule that looks at it. */
const subjectsOf = (document: RichTextDocument, declared: ReadonlySet<string>, rules: readonly ContentRule[]) => {
    const walk: SubjectWalk = {
        found: [],
        nodeRules: new Map(),
        markGroups: [],
        nodeIds: new Map(),
        previous: new Map(),
        ancestors: [],
        declared,
    };
    indexSubjectRules(walk, rules);
    visitContent(walk, document.content, []);

    return { found: walk.found, repeated: (nodeId: string) => (walk.nodeIds.get(nodeId) ?? 0) > 1 };
};

/**
 * The issues of `document` with what each covers, as the editor holds them. Unlike `findContentIssues`, it
 * assumes a well-formed document.
 */
export const locateContentIssues = (
    document: RichTextDocument,
    options: ContentCheckOptions,
): readonly LocatedIssue[] => {
    const { locale, model, sequence = 0, colorTokens = [], background, creatableHeadingLevels = LEVELS } = options;
    const compiled = compiledModel(model);
    const features = new Set(compiled.features.map(({ id }) => id));
    const nodes = new Set(compiled.nodes.map(({ name }) => name));
    let enclosingHeadingLevel = options.enclosingHeadingLevel;
    // The feature's own option applies when the call gives none.
    const stored = compiled.features.find(({ id }) => id === CONTENT_CHECKS_FEATURE)?.options.enclosingHeadingLevel;
    if (enclosingHeadingLevel === undefined && typeof stored === 'number' && LEVELS.includes(stored as Level)) {
        enclosingHeadingLevel = stored as Level;
    }

    const { found, repeated } = subjectsOf(document, nodes, featureRules(model));
    const context: ContentRuleContext = {
        genericWords: listOf(locale, 'RichTextEditor_checkGenericImageWords', GENERIC_IMAGE_WORDS),
        vagueTexts: listOf(locale, 'RichTextEditor_checkVagueLinkTexts', VAGUE_LINK_TEXTS),
        colorTokens,
        background,
        enclosingHeadingLevel,
        creatableHeadingLevels,
    };
    const located: LocatedIssue[] = [];
    const add = (rule: DocumentRule | ContentRule, subject: Subject | undefined, finding: ContentFinding) => {
        if (finding === undefined) {
            return;
        }

        const { id: ruleId, kind, severity, repair } = rule;
        let repairCommand: string | null = null;
        let repairPayload: JsonValue | null = null;
        if (finding !== true && repair !== undefined && features.has(repair.feature)) {
            repairCommand = repair.command;
            repairPayload = finding.payload;
        }

        const path = subject === undefined ? null : subject.path;
        const nodeId = subject === undefined ? null : subject.nodeId;
        let id: string = ruleId;
        if (nodeId !== null && !repeated(nodeId)) {
            id = `${ruleId}:${nodeId}`;
        } else if (path !== null) {
            id = `${ruleId}:${path.join(',')}`;
        }

        located.push({
            issue: { id, ruleId, kind, severity, path, nodeId, repairCommand, repairPayload, sequence },
            span: subject === undefined ? 0 : subject.span,
            signature: subject === undefined ? '' : subject.signature,
        });
    };

    for (const rule of DOCUMENT_RULES) {
        add(rule, undefined, rule.check(context));
    }

    for (const { rule, subject, given } of found) {
        add(rule, subject, rule.check(given, context));
    }

    return located;
};

/**
 * The accessibility issues of `document`: the same issues and IDs the editor's content checks find for the same
 * document, locale, colour options and model. It reads no browser global, so it runs on a server too.
 */
export const findContentIssues = (
    document: RichTextDocument,
    options: ContentCheckOptions,
): readonly ContentIssue[] => {
    if (!isRecord(document) || !isRecord(document.content)) {
        return [];
    }

    return locateContentIssues(document, options).map(({ issue }) => issue);
};
