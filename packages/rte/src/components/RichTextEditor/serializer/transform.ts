/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Transformer } from './types';

export class Transform {
    // eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
    public static use<T = unknown, R = unknown>(transformer: Transformer<T, R>) {
        return transformer;
    }
}
