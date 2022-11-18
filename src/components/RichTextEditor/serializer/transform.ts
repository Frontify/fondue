/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Transformer } from './types';

export class Transform {
    public static use<T = unknown, R = unknown>(transformer: Transformer<T, R>) {
        return transformer;
    }
}
