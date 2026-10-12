/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocks-align/feature';
import { codeBlock } from '#/features/blocks-code/feature';
import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { rule } from '#/features/blocks-rule/feature';
import { core } from '#/features/core/feature';
import { emoji } from '#/features/emoji/feature';
import { formatClear } from '#/features/format-clear/feature';
import { inputRules } from '#/features/input-rules/feature';
import { columns } from '#/features/layout-columns/feature';
import { links } from '#/features/links/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { bold } from '#/features/marks-bold/feature';
import { code } from '#/features/marks-code/feature';
import { fontColor } from '#/features/marks-font-color/feature';
import { italic } from '#/features/marks-italic/feature';
import { language } from '#/features/marks-language/feature';
import { strike } from '#/features/marks-strike/feature';
import { subscript } from '#/features/marks-subscript/feature';
import { superscript } from '#/features/marks-superscript/feature';
import { underline } from '#/features/marks-underline/feature';
import { mentions } from '#/features/mentions/feature';
import { brandStyles } from '#/features/styles-brand/feature';
import { DefinitionError, type Feature } from '#/model';

/** Every shipped feature factory by feature ID. */
export const registry: Readonly<Record<string, () => Feature>> = {
    core,
    emoji,
    'marks.bold': bold,
    'marks.italic': italic,
    'marks.language': language,
    'marks.underline': underline,
    'marks.strike': strike,
    'marks.code': code,
    'marks.subscript': subscript,
    'marks.superscript': superscript,
    'marks.font-color': fontColor,
    links,
    'blocks.heading': heading,
    'blocks.quote': quote,
    'blocks.code': codeBlock,
    'blocks.align': align,
    'format.clear': formatClear,
    'blocks.rule': rule,
    'layout.columns': columns,
    'lists.item': listItem,
    'lists.bullet': bulletList,
    'lists.ordered': orderedList,
    'lists.task': taskList,
    'styles.brand': brandStyles,
    'input-rules': inputRules,
    mentions,
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
