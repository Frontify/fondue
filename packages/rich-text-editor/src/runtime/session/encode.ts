/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';

import { type CapabilityRef, type ContentModel, type RichTextDocument } from '#/model';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { snapshot } from '#/model/values';

export interface Encoder {
    capabilities: readonly CapabilityRef[];
    encode(doc: Node): RichTextDocument;
    encodeByBlock(doc: Node): RichTextDocument;
}

export const createEncoder = (model: ContentModel, capabilities: readonly CapabilityRef[]): Encoder => {
    // Each top-level node's frozen stored form under this root, so a snapshot after an edit encodes only changed blocks.
    let blocks = new WeakMap<Node, RichTextDocument>();
    let blocksOf: { readonly attrs: Node['attrs']; readonly stored: readonly CapabilityRef[] } | undefined;
    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, model, encoder.capabilities).document;
    const encodeByBlock = (doc: Node): RichTextDocument => {
        const stored = encoder.capabilities;
        if (blocksOf?.attrs !== doc.attrs || blocksOf.stored !== stored) {
            blocks = new WeakMap();
            blocksOf = { attrs: doc.attrs, stored };
        }
        // As `toJSON` writes the root: its attributes only when the node type has any.
        let root: TreeNode = { type: doc.type.name };
        if (Object.keys(doc.attrs).length > 0) {
            root = { ...root, attrs: doc.attrs };
        }
        let last: RichTextDocument | undefined;
        const content: unknown[] = [];
        const versions = new Map<string, number>();
        for (const child of doc.children) {
            let block = blocks.get(child);
            if (block === undefined) {
                const tree: TreeNode = { ...root, content: [child.toJSON() as TreeNode] };
                block = snapshot(encodeTree(tree, model, stored).document);
                // A block that is no plain JSON stays unfrozen, so no later snapshot may share it.
                if (Object.isFrozen(block)) {
                    blocks.set(child, block);
                }
            }
            last = block;
            content.push(block.content.content?.[0]);
            for (const { id, version } of block.requiredCapabilities) {
                versions.set(id, Math.max(version, versions.get(id) ?? version));
            }
        }
        if (last === undefined) {
            return encode(doc);
        }
        // The union of what each block needs is what the whole document needs, as `encodeTree` sorts it.
        const requiredCapabilities = [...versions.keys()].sort().map((id) => ({ id, version: versions.get(id) ?? 0 }));
        return { ...last, requiredCapabilities, content: { ...last.content, content } } as RichTextDocument;
    };
    const encoder: Encoder = { capabilities, encode, encodeByBlock };
    return encoder;
};
