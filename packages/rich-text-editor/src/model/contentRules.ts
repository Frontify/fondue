/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON, type MarkJSON } from './format';
import { type ColorToken } from './styles';
import { type JsonValue } from './types';

/** A minor release may add rules, so handle a rule ID you do not know. */
export type ContentRuleId =
    | 'image.alt-missing'
    | 'image.alt-suspicious'
    | 'image.content-review'
    | 'link.text-empty'
    | 'link.text-vague'
    | 'link.purpose-review'
    | 'heading.empty'
    | 'heading.skipped-level'
    | 'heading.descriptive-review'
    | 'contrast.low'
    | 'contrast.unknown'
    | 'color.meaning-review'
    | 'language.parts-review'
    | 'sensory.review'
    | 'structure.review';
/** The repair command a rule offers, which the editor part of `feature` registers. */
export type ContentRepair = {
    command: string;
    feature: string;
};
/** What a rule found: `true` for an issue with no repair, the repair command's payload, or `undefined` for none. */
export type ContentFinding = true | { payload: JsonValue | null } | undefined;
/**
 * What a rule looks at: each node of a type that passes `where`, or each run of adjacent inline children that carry
 * the same `marks`.
 */
export type ContentRuleSubject =
    | { node: string; where?: (node: ContentNodeJSON) => boolean }
    | { marks: readonly string[] };
/** The subject a rule checks, as the content check engine finds it. */
export type ContentRuleInput = {
    /** The node, or the first inline child of a run. */
    node: ContentNodeJSON;
    /** The nodes the subject covers: the node alone, or the inline children of a run. */
    covered: readonly ContentNodeJSON[];
    /** The nodes around the subject from the document node down; a run's last ancestor is the node that holds it. */
    ancestors: readonly ContentNodeJSON[];
    /** The subject of the same rule before this one in reading order; `undefined` for a first one and for a run. */
    previous?: ContentNodeJSON | undefined;
    /** The run's first child's marks, by the mark names the rule's subject lists; empty for a node. */
    marks: Readonly<Record<string, MarkJSON | undefined>>;
    /** The text a reader meets in the covered nodes. */
    text: string;
};
/** What every rule may read besides its subject: the locale's word lists and the host's check options. */
export type ContentRuleContext = {
    genericWords: ReadonlySet<string>;
    vagueTexts: ReadonlySet<string>;
    colorTokens: readonly ColorToken[];
    background: string | undefined;
    /** The host page's heading level around the editor, or `undefined` when the first heading is exempt. */
    enclosingHeadingLevel: number | undefined;
    creatableHeadingLevels: readonly number[];
};
/** A content check a feature declares for its own nodes or marks; the engine runs it and lists issues in rule order. */
export type ContentRule = {
    id: ContentRuleId;
    kind: 'automatic' | 'manual';
    severity: 'error' | 'warning' | 'review';
    subject: ContentRuleSubject;
    /** The command a finding's payload is offered with, when the model installs its feature. */
    repair?: ContentRepair;
    check(input: ContentRuleInput, context: ContentRuleContext): ContentFinding;
};
/** Where a feature's node stores a reference to a host resource, as the names of the attributes that hold it. */
export type ReferenceDeclaration = {
    readonly node: string;
    readonly nodeId: string;
    readonly resourceType: string;
    readonly resourceId: string;
};
/** What a feature declares about content beyond its nodes and marks: its content checks and its references. */
export type FeatureContentDeclaration = {
    /** Content checks for this feature's nodes and marks, listed in this order after the document rules. */
    readonly contentRules?: readonly ContentRule[];
    /** The resources this feature's nodes mention, which `diffReferences` reports. */
    readonly references?: readonly ReferenceDeclaration[];
};
