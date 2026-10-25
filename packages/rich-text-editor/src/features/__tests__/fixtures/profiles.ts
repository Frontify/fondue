/* (c) Copyright Frontify Ltd., all rights reserved. */

import { featuresById } from '#/features/registry';
import { type Feature } from '#/model';

export { fixtureProfiles } from './fixtureProfiles';

const MARKS = [
    'marks.bold',
    'marks.italic',
    'marks.underline',
    'marks.strike',
    'marks.code',
    'marks.subscript',
    'marks.superscript',
] as const;
const LISTS = ['lists.item', 'lists.bullet', 'lists.ordered', 'lists.task'] as const;

/**
 * The features delivered so far, in two shapes: a comment-like set, and the same with headings.
 * Each installs `blocks.code`.
 */
export const deliveredProfiles = (): Readonly<Record<string, readonly Feature[]>> => ({
    comment: featuresById(['core', ...MARKS, 'blocks.quote', ...LISTS, 'blocks.code']),
    document: featuresById(['core', ...MARKS, 'blocks.heading', 'blocks.quote', ...LISTS, 'blocks.code']),
});
