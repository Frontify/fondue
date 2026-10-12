/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { featuresById } from '#/features/registry';
import { type Feature } from '#/model';

import { fixtureBold, fixtureColor, fixtureHeading, fixtureHistory, fixtureItalic } from './features';

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
 * Stand-ins for the shipped profile lists until the profiles ship: the features delivered so far, and the
 * same with the fixture stand-ins of later features.
 */
export const fixtureProfiles = (): Readonly<Record<string, readonly Feature[]>> => ({
    core: [core()],
    document: [
        core(),
        fixtureHistory(),
        fixtureBold(),
        fixtureItalic(),
        links(),
        fixtureColor(),
        fixtureHeading({ defaultLevel: 3 }),
    ],
});

/**
 * The features delivered so far, in two shapes: a comment-like set, and the same with headings.
 * Each installs `blocks.code`.
 */
export const deliveredProfiles = (): Readonly<Record<string, readonly Feature[]>> => ({
    comment: featuresById(['core', ...MARKS, 'blocks.quote', ...LISTS, 'blocks.code']),
    document: featuresById(['core', ...MARKS, 'blocks.heading', 'blocks.quote', ...LISTS, 'blocks.code']),
});
