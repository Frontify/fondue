/* (c) Copyright Frontify Ltd., all rights reserved. */

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import slate from './RemarkPlate';
import { options } from './options';
import { MdTransformer } from './MdTransformer';
import { SlateObject } from './types';

export class MdToSlate extends MdTransformer<string, SlateObject> {
    process(value: string) {
        return unified().use(parse).use(remarkGfm).use(slate, options(this.editor)).processSync(value)
            .result as SlateObject;
    }
}
