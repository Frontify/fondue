/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Mark, type Node, type Schema } from 'prosemirror-model';

import { DefinitionError, type ResourceLimits } from '#/model';

const SPACED = /(?<= )\u00A0/g;

/** Turns each U+00A0 after a U+0020 outside code blocks back into U+0020, reversing the space encoding of copied HTML. */
export const withSpaces = (fragment: Fragment): Fragment => {
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        if (node.isLeaf || node.type.spec.code === true) {
            nodes.push(node);
            continue;
        }

        if (!node.isTextblock) {
            nodes.push(node.copy(withSpaces(node.content)));
            continue;
        }

        let previous = '';
        const inline: Node[] = [];
        for (const child of node.content.content) {
            if (child.text === undefined) {
                previous = '';
                inline.push(child);
                continue;
            }

            const text = `${previous}${child.text}`.replace(SPACED, ' ').slice(previous.length);
            previous = child.text.slice(-1);
            inline.push(child.type.schema.text(text, child.marks));
        }

        nodes.push(node.copy(Fragment.from(inline)));
    }

    return Fragment.from(nodes);
};

/** The allowed level nearest `level`, the lower on a tie, or none. */
const nearestLevel = (level: number, levels: readonly number[]) => {
    let nearest: number | undefined;
    for (const allowed of [...levels].sort((left, right) => left - right)) {
        if (nearest === undefined || Math.abs(allowed - level) < Math.abs(nearest - level)) {
            nearest = allowed;
        }
    }

    return nearest;
};

/**
 * Attributes as `decodeDocument` accepts them: a string but `href` longer than `maxAttributeLength` takes its default, and a
 * mark or node with no default for it goes, keeping its text, so the saved document still decodes as `editable`.
 * Each heading takes the nearest creatable level, or becomes a paragraph when none is.
 */
export const withValidAttributes = (
    schema: Schema,
    fragment: Fragment,
    limits: ResourceLimits,
    levels: readonly number[] | undefined,
): Fragment => {
    const valid = (type: Node['type'] | Mark['type'], attrs: Node['attrs']) => {
        const result: Record<string, unknown> = { ...attrs };
        for (const [name, value] of Object.entries(attrs)) {
            // Decode exempts `href` from `maxAttributeLength`: the URL check bounds it.
            if (name === 'href' || typeof value !== 'string' || value.length <= limits.maxAttributeLength) {
                continue;
            }

            const attribute = type.spec.attrs?.[name];
            if (attribute === undefined || !('default' in attribute)) {
                return undefined;
            }

            result[name] = attribute.default;
        }

        return result;
    };

    const paragraph = schema.nodes.paragraph;
    if (paragraph === undefined) {
        throw new DefinitionError('definition.invalid-declaration', { node: 'paragraph' });
    }

    // Only what the paragraph declares carries over from the node it replaces.
    const asParagraph = (node: Node, content: Fragment, marks: readonly Mark[]) => {
        const declared = Object.fromEntries(
            Object.keys(paragraph.spec.attrs ?? {}).map((name) => [name, node.attrs[name]]),
        );

        return paragraph.create(valid(paragraph, declared) ?? null, content, marks);
    };

    const nodes: Node[] = [];
    for (const node of fragment.content) {
        const marks = node.marks.flatMap((mark) => {
            const attrs = valid(mark.type, mark.attrs);
            if (attrs === undefined) {
                return [];
            }

            return [mark.type.create(attrs)];
        });
        if (node.text !== undefined) {
            nodes.push(node.mark(marks));
            continue;
        }

        const content = withValidAttributes(schema, node.content, limits, levels);
        const attrs = valid(node.type, node.attrs);
        if (attrs === undefined) {
            // A required value decode would reject cannot take a default, so the node goes and its text stays, as with paste: false.
            if (node.isTextblock) {
                nodes.push(asParagraph(node, content, marks));
            } else if (!node.isLeaf) {
                nodes.push(...content.content);
            }

            continue;
        }

        if (node.type.name !== 'heading' || levels === undefined) {
            nodes.push(node.type.create(attrs, content, marks));
            continue;
        }

        const level: unknown = node.attrs.level;
        if (typeof level !== 'number') {
            nodes.push(asParagraph(node, content, marks));
            continue;
        }

        const nearest = nearestLevel(level, levels);
        if (nearest === undefined) {
            nodes.push(asParagraph(node, content, marks));
            continue;
        }

        nodes.push(node.type.create({ ...attrs, level: nearest }, content, marks));
    }

    return Fragment.from(nodes);
};
