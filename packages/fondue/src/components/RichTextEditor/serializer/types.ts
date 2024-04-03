/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

export interface Transformer<T = unknown, R = unknown> {
    process(value: T): R;
}

export type CSSPropertiesHover = CSSProperties & { hover?: CSSProperties };
