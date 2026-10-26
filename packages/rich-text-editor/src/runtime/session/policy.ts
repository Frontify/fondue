/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type CapabilityRef, type ContentModel, type ResourceLimits } from '#/model';
import { type EngineCommand } from '#/runtime/definition';

import { createLimitCheck, type ExceededLimit } from '../limits';
import { authoringOf, createPolicyCheck } from '../policy';
import { type AuthoringPolicy } from '../types';

import { type RejectedCode } from './types';

export type PolicyService = {
    current(): AuthoringPolicy;
    revision(): number;
    /** Takes the next policy, counts a revision, then tells `onUpdate`. */
    update(next: AuthoringPolicy): void;
    /** The limit check measures a stored form that lists these capabilities. */
    setCapabilities(capabilities: readonly CapabilityRef[]): void;
    /** The final check of a change from `before` to `doc`: whether the policy refuses it, and the limit it exceeds. */
    finalCheck(
        before: Node,
        doc: Node,
        mapping: Transaction['mapping'],
        history?: boolean,
    ): { policy: boolean; limit: ExceededLimit | undefined };
    breaks(before: Node, doc: Node, mapping: Transaction['mapping'], history?: boolean): boolean;
    exceeds(doc: Node, before: Node): ExceededLimit | undefined;
    /** Why the policy refuses `command` with `payload` on `base` before it runs. */
    refusal(command: EngineCommand, base: EditorState, payload: unknown): RejectedCode | undefined;
    /** Why the policy or the limits refuse the change of `transaction` from `before`. */
    writeRefusal(before: Node, transaction: Transaction): 'policy' | 'limit' | undefined;
};

export const createPolicy = ({
    model,
    limits,
    initial,
    capabilities,
    onUpdate,
}: {
    model: ContentModel;
    limits: ResourceLimits;
    initial: AuthoringPolicy;
    capabilities: readonly CapabilityRef[];
    onUpdate: (next: AuthoringPolicy) => void;
}): PolicyService => {
    const breaksPolicy = createPolicyCheck(model);
    let exceedsLimits = createLimitCheck(model, capabilities);
    let policy = initial;
    let revision = 0;
    const breaks: PolicyService['breaks'] = (before, doc, mapping, history) =>
        breaksPolicy(policy, before, doc, mapping, history);
    const exceeds: PolicyService['exceeds'] = (doc, before) => exceedsLimits(doc, limits, before);
    const finalCheck: PolicyService['finalCheck'] = (before, doc, mapping, history) => ({
        policy: breaks(before, doc, mapping, history),
        limit: exceeds(doc, before),
    });

    return {
        current: () => policy,
        revision: () => revision,
        update: (next) => {
            policy = authoringOf(model, next);
            revision += 1;
            onUpdate(policy);
        },
        setCapabilities: (next) => {
            exceedsLimits = createLimitCheck(model, next);
        },
        finalCheck,
        breaks,
        exceeds,
        refusal: (command, base, payload) => {
            if (command.policyRefuses?.(policy, payload) === true || command.refuses?.(base, payload) === true) {
                return 'not-allowed';
            }

            return undefined;
        },
        writeRefusal: (before, transaction) => {
            const checked = finalCheck(before, transaction.doc, transaction.mapping);
            if (checked.policy) {
                return 'policy';
            }

            if (checked.limit !== undefined) {
                return 'limit';
            }

            return undefined;
        },
    };
};
