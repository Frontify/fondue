/* (c) Copyright Frontify Ltd., all rights reserved. */

import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { inputRules } from '#/features/input-rules/feature';
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
    'marks.bold': bold,
    'marks.italic': italic,
    'marks.underline': underline,
    'marks.strike': strike,
    'marks.code': code,
    'marks.subscript': subscript,
    'marks.superscript': superscript,
    'blocks.heading': heading,
    'blocks.quote': quote,
    'input-rules': inputRules,
};

/**
 * Resolves shipped feature IDs from remote configuration, with their default options (SPEC-rich-text/AC-030);
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details` (SPEC-rich-text/AC-035).
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
