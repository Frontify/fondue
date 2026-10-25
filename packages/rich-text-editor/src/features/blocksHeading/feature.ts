/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON, type ContentRepair, defineFeature } from '#/model';

const LEVELS = [1, 2, 3, 4, 5, 6] as const;
const PARAGRAPH_REPAIR: ContentRepair = { command: 'paragraph.set', feature: 'core' };
const HEADING_REPAIR: ContentRepair = { command: 'heading.set', feature: 'blocks.heading' };

// A heading whose level is not a number is stored but not checked.
const HEADING = { node: 'heading', where: ({ attrs }: ContentNodeJSON) => typeof attrs?.level === 'number' } as const;

const levelOf = (node: ContentNodeJSON | undefined): number | undefined => {
    const level = node?.attrs?.level;
    if (typeof level === 'number') {
        return level;
    }
    return undefined;
};

/** The deepest level from one below `previous` up that the author may create, or none. */
const repairLevel = (previous: number, creatable: readonly number[]) => {
    const fits = creatable.filter((level) => level <= previous + 1);
    return fits.length === 0 ? undefined : Math.max(...fits);
};

/** Headings `h1` to `h6`, whose level only the `level` attribute sets. */
export const heading = defineFeature({
    id: 'blocks.heading',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        heading: {
            group: 'block',
            content: 'inline*',
            attrs: {
                nodeId: { type: 'string', required: true },
                level: { type: 'integer', min: 1, max: 6, required: true },
                lang: { type: 'language', nullable: true, default: null },
            },
            html: [
                { attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } },
                { lang: { attr: 'lang' } },
                0,
            ],
            parse: LEVELS.map((level) => ({
                tag: `h${level}`,
                attrs: { level: { value: level }, lang: { from: 'lang' } },
            })),
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
    contentRules: [
        {
            id: 'heading.empty',
            kind: 'automatic',
            severity: 'error',
            subject: HEADING,
            repair: PARAGRAPH_REPAIR,
            check: ({ text }) => (text.trim() === '' ? { payload: null } : undefined),
        },
        {
            id: 'heading.skipped-level',
            kind: 'automatic',
            severity: 'warning',
            subject: HEADING,
            repair: HEADING_REPAIR,
            check: ({ node, previous }, { enclosingHeadingLevel, creatableHeadingLevels }) => {
                const level = levelOf(node);
                const before = previous === undefined ? enclosingHeadingLevel : levelOf(previous);
                if (level === undefined || before === undefined || level <= before + 1) {
                    return undefined;
                }
                const repair = repairLevel(before, creatableHeadingLevels);
                if (repair === undefined) {
                    return true;
                }
                return { payload: { level: repair } };
            },
        },
        { id: 'heading.descriptive-review', kind: 'manual', severity: 'review', subject: HEADING, check: () => true },
    ],
});
