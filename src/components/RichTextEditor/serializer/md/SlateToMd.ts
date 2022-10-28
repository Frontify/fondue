/* (c) Copyright Frontify Ltd., all rights reserved. */

import { serialize } from 'remark-slate';
import { BlockType, LeafType } from 'remark-slate';
import { options } from './options';
import { MdTransformer } from './MdTransformer';
import { SlateObject } from './types';

export class SlateToMd extends MdTransformer<SlateObject, string> {
    process(value: (BlockType | LeafType)[]) {
        return value.map((node) => serialize(node, options(this.editor))).join('');
    }
}
