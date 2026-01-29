/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownAstNode, type PartialOptionType } from '../types';
import { getSelectedOptions } from '../utils';

import deserialize from './deserialize';
import { type DeserializerConfig } from './types';

const defaultDeserializerConfig: DeserializerConfig = {
    allowUnsafeLink: false,
};

export default function plugin(options?: PartialOptionType, config?: DeserializerConfig) {
    const compiler = (node: { children: Array<MarkdownAstNode> }) => {
        const mergedConfig = {
            ...defaultDeserializerConfig,
            ...config,
        };
        return node.children.map((c) => deserialize(c, getSelectedOptions(options), mergedConfig));
    };

    // @ts-expect-error this is not correctly typed as it doesn't know what we extend
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-invalid-this
    this.Compiler = compiler;
}
