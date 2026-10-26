/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema, type NodeSpec } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { type JsonObject } from '#/model';

import { EDITS } from '../capabilities';

const schemaOf = (docContent: string, withParagraph: boolean) => {
    const nodes: Record<string, NodeSpec> = {
        doc: { content: docContent },
        heading: { group: 'block', content: 'text*' },
        text: { group: 'inline' },
    };
    if (withParagraph) {
        nodes.paragraph = { group: 'block', content: 'text*' };
    }

    return new Schema({ nodes });
};

const stateOf = (schema: Schema) =>
    EditorState.create({ schema, doc: schema.node('doc', null, [schema.node('heading')]) });

const lookup = () => undefined;

// Each edit names a type the schema lacks, so it must reject instead of throwing.
const CASES: readonly (readonly [keyof typeof EDITS, JsonObject])[] = [
    ['toggleMark', { mark: 'bold' }],
    ['setMark', { mark: 'link' }],
    ['setBlock', { node: 'quote' }],
    ['wrapIn', { node: 'quote' }],
    ['toggleList', { list: 'bullet_list', item: 'list_item' }],
    ['indentItem', { item: 'list_item' }],
    ['outdentItem', { item: 'list_item' }],
];

describe('an edit whose mark or node type the schema lacks', () => {
    it.each(CASES)('%s is rejected without throwing', (name, args) => {
        const schema = schemaOf('block+', true);
        const state = stateOf(schema);
        const dispatch = vi.fn();
        const command = EDITS[name](args, schema, lookup);

        expect(command.run(state, dispatch, {})).toBe(false);
        expect(command.active(state, {})).toBe(false);
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('setBlock is rejected when the schema has no paragraph to toggle back to', () => {
        const schema = schemaOf('heading+', false);
        const state = stateOf(schema);
        const dispatch = vi.fn();
        const command = EDITS.setBlock({ node: 'heading', toggle: true }, schema, lookup);

        expect(command.run(state, dispatch, {})).toBe(false);
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('setBlock still applies when the schema holds its type', () => {
        const schema = schemaOf('block+', true);
        const state = stateOf(schema);
        const dispatch = vi.fn();
        const command = EDITS.setBlock({ node: 'paragraph' }, schema, lookup);

        expect(command.run(state, dispatch, {})).toBe(true);
        expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
