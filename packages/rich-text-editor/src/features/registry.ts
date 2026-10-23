/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocks-align/feature';
import { codeBlock } from '#/features/blocks-code/feature';
import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { rule } from '#/features/blocks-rule/feature';
import { core } from '#/features/core/feature';
import { emoji } from '#/features/emoji/feature';
import { inputRules } from '#/features/input-rules/feature';
import { columns } from '#/features/layout-columns/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { bold } from '#/features/marks-bold/feature';
import { code } from '#/features/marks-code/feature';
import { italic } from '#/features/marks-italic/feature';
import { strike } from '#/features/marks-strike/feature';
import { subscript } from '#/features/marks-subscript/feature';
import { superscript } from '#/features/marks-superscript/feature';
import { underline } from '#/features/marks-underline/feature';
import { DefinitionError, type Feature } from '#/model';

/** Every shipped feature factory by feature ID. */
export const registry: Readonly<Record<string, () => Feature>> = {
    core,
    emoji,
    'marks.bold': bold,
    'marks.italic': italic,
    'marks.underline': underline,
    'marks.strike': strike,
    'marks.code': code,
    'marks.subscript': subscript,
    'marks.superscript': superscript,
    'blocks.heading': heading,
    'blocks.quote': quote,
    'blocks.code': codeBlock,
    'blocks.align': align,
    'blocks.rule': rule,
    'layout.columns': columns,
    'lists.item': listItem,
    'lists.bullet': bulletList,
    'lists.ordered': orderedList,
    'lists.task': taskList,
    'input-rules': inputRules,
};

export interface FeatureRecord {
    /** The team that reviews and maintains the feature. */
    readonly owner: string;
    /** Each package dependency the feature's files import, with its SPDX license. */
    readonly dependencies: Readonly<Record<string, string>>;
}

// The CODEOWNERS default owner, since no rule names this package.
const OWNER = '@Frontify/frontend-platform';
const NO_DEPENDENCIES: FeatureRecord = { owner: OWNER, dependencies: {} };

/** The owner and the dependency and license record of every shipped feature, by feature ID. */
export const featureRecords: Readonly<Record<string, FeatureRecord>> = {
    core: NO_DEPENDENCIES,
    emoji: { owner: OWNER, dependencies: { 'emojibase-data': 'MIT' } },
    'marks.bold': NO_DEPENDENCIES,
    'marks.italic': NO_DEPENDENCIES,
    'marks.underline': NO_DEPENDENCIES,
    'marks.strike': NO_DEPENDENCIES,
    'marks.code': NO_DEPENDENCIES,
    'marks.subscript': NO_DEPENDENCIES,
    'marks.superscript': NO_DEPENDENCIES,
    'blocks.heading': NO_DEPENDENCIES,
    'blocks.quote': NO_DEPENDENCIES,
    'blocks.code': { owner: OWNER, dependencies: { lowlight: 'MIT' } },
    'blocks.align': NO_DEPENDENCIES,
    'blocks.rule': NO_DEPENDENCIES,
    'layout.columns': NO_DEPENDENCIES,
    'lists.item': NO_DEPENDENCIES,
    'lists.bullet': NO_DEPENDENCIES,
    'lists.ordered': NO_DEPENDENCIES,
    'lists.task': NO_DEPENDENCIES,
    'input-rules': NO_DEPENDENCIES,
};

/**
 * Resolves shipped feature IDs from remote configuration, with their default options;
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details`.
 */
export const featuresById = (ids: readonly string[]): readonly Feature[] => {
    if (!Array.isArray(ids)) {
        throw new DefinitionError('definition.unknown-feature', { path: '' });
    }
    return ids.map((id: unknown, index) => {
        const factory = typeof id === 'string' && Object.hasOwn(registry, id) ? registry[id] : undefined;
        if (factory === undefined) {
            throw new DefinitionError('definition.unknown-feature', { id: typeof id === 'string' ? id : null, index });
        }
        return factory();
    });
};
