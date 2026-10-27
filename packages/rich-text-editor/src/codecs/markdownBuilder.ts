/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, type Diagnostic, type HrefPolicy } from '#/model';
import {
    attributesOf,
    markHrefPolicy,
    type TreeMark,
    type TreeNode,
    type Vocabulary,
    vocabularyOf,
    pointer,
    isValidValue,
    ownValue,
} from '#/model/internal';

/** The shipped feature that holds each Markdown structure, named when the model lacks it. */
const FEATURE_OF: Readonly<Record<string, string>> = {
    heading: 'blocks.heading',
    blockquote: 'blocks.quote',
    bullet_list: 'lists.bullet',
    ordered_list: 'lists.ordered',
    code_block: 'blocks.code',
    horizontal_rule: 'blocks.rule',
    table: 'tables',
    image: 'media.image',
    link: 'links',
    bold: 'marks.bold',
    italic: 'marks.italic',
    strike: 'marks.strike',
    code: 'marks.code',
};

/** One open structure on the builder's stack; a frame with no `node` is an unwrapped structure the model cannot hold. */
export type Frame = {
    node: { type: string; attrs: Record<string, unknown>; content: TreeNode[] } | undefined;
    path: string;
    /** List frames: whether its items become task items. */
    task: boolean;
};

/** Builds the model's node tree from Markdown tokens, recording a warning for each structure the model lacks. */
export class Builder {
    readonly diagnostics: Diagnostic[] = [];
    readonly vocabulary: Vocabulary;
    private readonly stack: Frame[];
    readonly root: { type: string; attrs: Record<string, unknown>; content: TreeNode[] };
    /** The `allowedSchemes` and `allowedHosts` of the feature that declares `link`. */
    readonly linkPolicy: HrefPolicy | undefined;

    constructor(
        model: ContentModel,
        private readonly generateId: () => string,
    ) {
        this.vocabulary = vocabularyOf(model);
        this.linkPolicy = markHrefPolicy(model, 'link');
        this.root = { type: 'doc', attrs: this.attrsFor('doc', {}), content: [] };
        this.stack = [{ node: this.root, path: '/content', task: false }];
    }

    /** Whether the model declares the node `name`. */
    has(name: string): boolean {
        return this.vocabulary.nodes.has(name);
    }

    /** Whether the model declares the mark `name`. */
    hasMark(name: string): boolean {
        return this.vocabulary.marks.has(name);
    }

    /** Every declared attribute at its given value, its default, a new `nodeId`, or null. */
    attrsFor(name: string, given: Readonly<Record<string, unknown>>): Record<string, unknown> {
        const node = this.vocabulary.nodes.get(name);
        const attrs: Record<string, unknown> = {};
        if (node === undefined) {
            return attrs;
        }

        for (const [attribute, declaration] of Object.entries(attributesOf(node))) {
            const value = ownValue(given, attribute);
            if (value !== undefined && isValidValue(declaration, value)) {
                attrs[attribute] = value;
            } else if ('default' in declaration && declaration.default !== undefined) {
                attrs[attribute] = declaration.default;
            } else if (attribute === 'nodeId') {
                attrs[attribute] = this.generateId();
            } else {
                attrs[attribute] = null;
            }
        }

        attrs.unknownAttributes = null;

        return attrs;
    }

    /** A mark of `name` with each declared attribute at its given value, its default, or null. */
    markOf(name: string, given: Readonly<Record<string, unknown>> = {}): TreeMark {
        const attrs: Record<string, unknown> = { unknownAttributes: null };
        const declared = this.vocabulary.marks.get(name)?.declaration.attrs;
        for (const [attribute, declaration] of Object.entries(declared ?? {})) {
            const value = ownValue(given, attribute);
            if (value !== undefined) {
                attrs[attribute] = value;
            } else if ('default' in declaration && declaration.default !== undefined) {
                attrs[attribute] = declaration.default;
            } else {
                attrs[attribute] = null;
            }
        }

        return { type: name, attrs };
    }

    /** The innermost frame that holds nodes; an unwrapped structure's frame holds none. */
    private target(): Frame {
        for (let index = this.stack.length - 1; index >= 0; index -= 1) {
            const frame = this.stack[index];
            if (frame?.node !== undefined) {
                return frame;
            }
        }

        return this.stack[0] as Frame;
    }

    /** Where the next node of the current parent goes. */
    nextPath(): string {
        const { node, path } = this.target();
        let index = 0;
        if (node !== undefined) {
            index = node.content.length;
        }

        return `${path}${pointer('content', index)}`;
    }

    /** The innermost frame, which may be an unwrapped one. */
    current(): Frame {
        return this.stack.at(-1) as Frame;
    }

    /** Records a warning that the model cannot hold the Markdown `structure`. */
    unsupported(structure: string, path = this.nextPath()): void {
        this.diagnostics.push({
            code: 'codecs.markdown-unsupported',
            severity: 'warning',
            messageKey: 'codecs.markdown-unsupported',
            path,
            featureId: FEATURE_OF[structure] ?? structure,
            details: { structure },
        });
    }

    /** Appends a node of `type` to the current parent and makes it the current frame; `task` marks a list whose items are task items. */
    open(type: string, given: Readonly<Record<string, unknown>> = {}, task = false): void {
        const node = { type, attrs: this.attrsFor(type, given), content: [] as TreeNode[] };
        const path = this.nextPath();
        this.append(node);
        this.stack.push({ node, path, task });
    }

    /** A structure the model cannot hold: its children go to the parent. */
    unwrap(task = false): void {
        this.stack.push({ node: undefined, path: this.nextPath(), task });
    }

    /** Pops the current frame, giving a list item or an emptied container the paragraph it requires. */
    close(): void {
        const frame = this.stack.pop();
        const node = frame?.node;
        if (node === undefined) {
            return;
        }

        const first = node.content[0];
        // Containers whose content starts with or requires a paragraph get an empty one, as the editor makes them.
        if (['list_item', 'task_item'].includes(node.type) && first?.type !== 'paragraph') {
            node.content.unshift({ type: 'paragraph', attrs: this.attrsFor('paragraph', {}) });
        } else if (node.content.length === 0 && ['blockquote', 'table_cell', 'table_header'].includes(node.type)) {
            node.content.push({ type: 'paragraph', attrs: this.attrsFor('paragraph', {}) });
        }
    }

    /** Adds `node` to the innermost frame that holds nodes. */
    append(node: TreeNode): void {
        this.target().node?.content.push(node);
    }
}
