/* (c) Copyright Frontify Ltd., all rights reserved. */

import { unified } from 'unified';
import slate from 'remark-slate';
import parse from 'remark-parse';
import { options } from './options';
import { MdTransformer } from './MdTransformer';
import { MdToSlateReturn } from './types';

export class MdToSlate extends MdTransformer<string, MdToSlateReturn> {
    process(value: string) {
        return unified().use(parse).use(slate, options(this.editor)).processSync(value).result as MdToSlateReturn;
    }
}
