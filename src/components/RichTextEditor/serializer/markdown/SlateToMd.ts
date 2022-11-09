/* (c) Copyright Frontify Ltd., all rights reserved. */

import { serialize } from './serializer';
import { options } from './options';
import { MdTransformer } from './MdTransformer';
import { NodeType } from './types';

export class SlateToMd extends MdTransformer<NodeType[], string> {
    process(value: NodeType[]) {
        return serialize(options(this.editor))(value);
    }
}
