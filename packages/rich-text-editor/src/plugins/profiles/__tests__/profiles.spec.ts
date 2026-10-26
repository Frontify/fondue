/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { READER_OVERRIDES } from '#/entries/shippedReaders';
import { type ContentModel, type RichTextDocument } from '#/model';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK, type TreeNode, decodeToTree } from '#/model/internal';
import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/plugins';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { UNSHIPPED_FEATURES } from '#/plugins/stages';
import { engineOf, pluginsOf, readersOf } from '#/react/compile/compileEditor';
import { editorEngine } from '#/react/compile/engine';
import { shipped as brandDocument } from '#/react/profiles/brandDocument';
import { shipped as comment } from '#/react/profiles/comment';
import { shipped as document } from '#/react/profiles/document';
import { shipped as inline } from '#/react/profiles/inline';
import { type ShippedProfile } from '#/react/profiles/parts';
import { featureFixtures } from '#/testing/conformance/fixtures';

// The profile tables, before the filter by release stage.
const INLINE = [
    'core',
    'marks.bold',
    'marks.italic',
    'marks.underline',
    'links',
    'marks.font-color',
    'marks.highlight',
    'marks.language',
    'blocks.align',
    'blocks.indent',
    'input-rules',
];
const COMMENT_ADDS = [
    'marks.strike',
    'marks.code',
    'blocks.quote',
    'blocks.code',
    'lists.item',
    'lists.bullet',
    'lists.ordered',
    'lists.task',
    'mentions',
    'emoji',
];
const DOCUMENT_ADDS = [
    'marks.subscript',
    'marks.superscript',
    'blocks.heading',
    'blocks.rule',
    'blocks.handle',
    'tables',
    'media.upload',
    'media.image',
    'media.embed',
    'nav.find-replace',
    'nav.outline',
    'format.clear',
    'a11y.content-checks',
];
const BRAND_ADDS = ['styles.brand', 'layout.columns'];
const INLINE_CREATABLE = ['core', 'marks.bold', 'marks.italic', 'marks.underline', 'links'];
const COMMENT_CREATABLE = [...INLINE_CREATABLE, ...COMMENT_ADDS];
const DOCUMENT_CREATABLE = [
    ...COMMENT_CREATABLE,
    ...DOCUMENT_ADDS,
    'marks.font-color',
    'marks.highlight',
    'marks.language',
    'blocks.indent',
];

// The profile columns of the input rules, with `link.autolink` of `links`; typography is off.
const INLINE_RULES = ['bold.stars', 'bold.underscores', 'italic.star', 'italic.underscore', 'link.autolink'];
const COMMENT_RULES = [
    ...INLINE_RULES,
    'quote.angle',
    'list.bullet.marker',
    'list.ordered.number',
    'list.task.brackets',
    'code.fence',
    'strike.tildes',
    'code.backtick',
];
const DOCUMENT_RULES = [...COMMENT_RULES, 'heading.hashes', 'rule.dashes'];

type Row = {
    name: string;
    profile: () => ShippedProfile;
    model: ContentModel;
    installed: readonly string[];
    creatable: readonly string[];
    rules: readonly string[];
};
const ROWS: readonly Row[] = [
    {
        name: 'Inline',
        profile: inline,
        model: inlineModel,
        installed: INLINE,
        creatable: INLINE_CREATABLE,
        rules: INLINE_RULES,
    },
    {
        name: 'Comment',
        profile: comment,
        model: commentModel,
        installed: [...INLINE, ...COMMENT_ADDS],
        creatable: COMMENT_CREATABLE,
        rules: COMMENT_RULES,
    },
    {
        name: 'Document',
        profile: document,
        model: documentModel,
        installed: [...INLINE, ...COMMENT_ADDS, ...DOCUMENT_ADDS],
        creatable: DOCUMENT_CREATABLE,
        rules: DOCUMENT_RULES,
    },
    {
        name: 'Brand document',
        profile: brandDocument,
        model: brandDocumentModel,
        installed: [...INLINE, ...COMMENT_ADDS, ...DOCUMENT_ADDS, ...BRAND_ADDS],
        creatable: [...DOCUMENT_CREATABLE, ...BRAND_ADDS, 'blocks.align'],
        rules: DOCUMENT_RULES,
    },
];

/** The row's IDs this release ships, sorted. */
const shippedOf = (ids: readonly string[]) => ids.filter((id) => !UNSHIPPED_FEATURES.includes(id)).sort();

/** Whether an island node or mark sits anywhere in the tree. */
const hasIsland = (node: TreeNode): boolean =>
    node.type === ISLAND_BLOCK ||
    node.type === ISLAND_INLINE ||
    (node.marks ?? []).some((mark) => mark.type === ISLAND_MARK) ||
    (node.content ?? []).some(hasIsland);

/** The commands a profile's compiled keymap binds to `key`. */
const boundTo = (key: string, row: () => ShippedProfile) =>
    engineOf(row().definition)
        .keymap.filter((binding) => binding.key === key)
        .map(({ command }) => command);

// The code block leaves on Mod+Enter through a key handler, which the compiled keymap of commands does not list.
const codeBlockModEnter = (row: () => ShippedProfile) =>
    pluginsOf(row().definition).find(({ feature }) => feature === 'blocks.code')?.keys?.['Mod-Enter'];

describe('the shipped profiles', () => {
    it.each(ROWS)('installs the $name row without the unshipped stage 1.x features', ({ profile, installed }) => {
        const { definition } = profile();

        expect(definition.capabilities.map(({ id }) => id).sort()).toEqual(shippedOf(installed));
    });

    it.each(ROWS)('lets the author create the $name row of creatable features', ({ profile, creatable }) => {
        const { definition } = profile();
        const created = Object.entries(definition.authoring.features).filter(([, policy]) => policy.create);

        expect(created.map(([id]) => id).sort()).toEqual(shippedOf(creatable));
    });

    it.each(ROWS)('registers the commands of every $name feature', ({ profile, model }) => {
        const commands = [...engineOf(profile().definition).commands.keys()].sort();
        const expected = [...editorEngine(model, unitsOf(model)).engine.commands.keys()];

        expect(commands).toEqual(expected.sort());
    });

    it.each(ROWS)('turns on the input rules of the $name column and no typography rule', ({ profile, rules }) => {
        const ids = pluginsOf(profile().definition).flatMap(({ inputRules }) => (inputRules ?? []).map(({ id }) => id));

        expect(ids.sort()).toEqual([...rules].sort());
    });

    it.each(ROWS)('supplies the reader overrides of the $name features and of no other feature', ({ profile }) => {
        const { definition } = profile();
        const ids = definition.capabilities.map(({ id }) => id);

        expect(Object.keys(readersOf(definition)).sort()).toEqual(
            Object.keys(READER_OVERRIDES)
                .filter((id) => ids.includes(id))
                .sort(),
        );
    });

    it('leaves Shift+Enter out of the Inline keymap, which a comment binds to a line break', () => {
        expect(boundTo('Shift-Enter', inline)).toEqual([]);
        expect(boundTo('Shift-Enter', comment)).toEqual(['hard-break.insert']);
    });

    it('leaves Mod+Enter out of the Comment keymap and its code block, which it submits with', () => {
        expect(boundTo('Mod-Enter', comment)).toEqual([]);
        expect(codeBlockModEnter(comment)).toBeUndefined();
    });

    it('keeps Mod+Enter for the task toggle and leaving a code block in Document and Brand document', () => {
        expect([boundTo('Mod-Enter', document), boundTo('Mod-Enter', brandDocument)]).toEqual([
            ['task.toggle'],
            ['task.toggle'],
        ]);
        expect([typeof codeBlockModEnter(document), typeof codeBlockModEnter(brandDocument)]).toEqual([
            'function',
            'function',
        ]);
    });

    it.each(ROWS)('decodes a fixture of every $name feature as editable with no island', ({ model }) => {
        for (const { id } of model.capabilities) {
            const fixtures = Object.values(featureFixtures[id] ?? {});

            expect(fixtures, id).not.toHaveLength(0);
            for (const fixture of fixtures) {
                const stored: RichTextDocument = { ...fixture, model: model.ref };
                const { result, tree } = decodeToTree(stored, model);

                expect(result.status, id).toBe('editable');
                expect(tree !== undefined && hasIsland(tree), id).toBe(false);
            }
        }
    });
});
