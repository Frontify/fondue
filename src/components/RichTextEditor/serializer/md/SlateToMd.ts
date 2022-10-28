/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockType, LeafType } from 'remark-slate';
import { options } from './options';
import { serialize as remarkSerialize } from 'remark-slate';
import { MdTransformer } from './MdTransformer';

export class SlateToMd extends MdTransformer<(BlockType | LeafType)[]> {
    process(value: (BlockType | LeafType)[]) {
        return value.map((node) => remarkSerialize(node, options(this.editor))).join('\n');
    }
}
