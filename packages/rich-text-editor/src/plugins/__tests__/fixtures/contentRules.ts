/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentRule, type ContentRuleId } from '#/model';
import { DOCUMENT_RULES, featureInternals } from '#/model/internal';
import { registry } from '#/plugins/registry';

type ShippedRule = ContentRule | (typeof DOCUMENT_RULES)[number];

const shipped: readonly ShippedRule[] = [
    ...DOCUMENT_RULES,
    ...Object.values(registry).flatMap((factory) => featureInternals(factory())?.declaration.contentRules ?? []),
];

/** Every shipped rule by ID, the objects the engine runs: the document rules first, then each feature's. */
export const CONTENT_RULES = Object.fromEntries(shipped.map((rule) => [rule.id, rule])) as Readonly<
    Record<ContentRuleId, ShippedRule>
>;

/** Every shipped rule ID, document rules first. */
export const CONTENT_RULE_IDS = shipped.map(({ id }) => id);
