/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Transformer } from './types';

export class transform {
    public static use(transformer: Transformer) {
        return transformer;
    }
}
