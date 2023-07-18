/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkdownAstNode, PartialOptionType } from '../types';
import { getSelectedOptions } from '../utils';
import deserialize from './deserialize';
import { DeserializerConfig } from './types';

const defaultDeserializerConfig: DeserializerConfig = {
    allowUnsafeLink: false,
};

export default function plugin(options?: PartialOptionType, config?: DeserializerConfig) {
    const compiler = (node: { children: Array<MarkdownAstNode> }) => {
        const mergedConfig = {
            ...defaultDeserializerConfig,
            ...config,
        };
        console.log('configMerged', mergedConfig);
        return node.children.map((c) => deserialize(c, getSelectedOptions(options), mergedConfig));
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.Compiler = compiler;
}
