/* (c) Copyright Frontify Ltd., all rights reserved. */

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import slate, { NodeType } from './RemarkPlate';
import { options } from './options';
import { MdTransformer } from './MdTransformer';

export class MdToSlate extends MdTransformer<string, NodeType[]> {
    process(value: string) {
        return unified().use(parse).use(remarkGfm).use(slate, options(this.editor)).processSync(value)
            .result as NodeType[];
    }
}
