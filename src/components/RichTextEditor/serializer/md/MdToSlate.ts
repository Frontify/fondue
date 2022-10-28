/* (c) Copyright Frontify Ltd., all rights reserved. */

import { unified } from 'unified';
import slate from 'remark-slate';
import parse from 'remark-parse';
import { options } from './options';
import { MdTransformer } from './MdTransformer';

export class MdToSlate extends MdTransformer<string> {
    process(value: string) {
        return unified().use(parse).use(slate, options(this.editor)).processSync(value).result;
    }
}
