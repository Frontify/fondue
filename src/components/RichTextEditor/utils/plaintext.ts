import { TDescendant, isDescendant } from '@udecode/plate';
import { Node } from 'slate';

export const toPlaintext = (nodes: TDescendant[]): string =>
    nodes
        .map((node) => {
            if (!isDescendant(node)) {
                return '';
            }

            return Array.isArray(node.children) ? toPlaintext(node.children) : Node.string(node);
        })
        .join('\n');
