import { TDescendant } from '@udecode/plate';
import { Node } from 'slate';

export const toPlaintext = (nodes: TDescendant[]): string =>
    nodes.map((node) => (node.children ? toPlaintext(node.children) : Node.string(node))).join('\n');
