/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeType, serialize } from './RemarkPlate';
import { options } from './options';
import { MdTransformer } from './MdTransformer';

export class SlateToMd extends MdTransformer<NodeType[], string> {
    process(value: NodeType[]) {
        return value.map((node) => serialize(node, options(this.editor))).join('');
    }
}
