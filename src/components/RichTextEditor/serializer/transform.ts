/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Transformer } from './types';

export class Transform {
    public static use(transformer: Transformer) {
        return transformer;
    }
}
