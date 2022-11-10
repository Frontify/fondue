/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkdownAstNode, PartialOptionType } from '../types';
import { getSelectedOptions } from '../utils';
import deserialize from './deserialize';

export default function plugin(opts?: PartialOptionType) {
    const compiler = (node: { children: Array<MarkdownAstNode> }) => {
        const options = getSelectedOptions(opts);
        return node.children.map((c) => deserialize(c, options));
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.Compiler = compiler;
}
