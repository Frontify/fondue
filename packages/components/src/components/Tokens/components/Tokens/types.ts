/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type Tokens = {
    [key: string]: Token | Tokens;
};

export type Token = {
    value: string;
    name: string;
    path: string[];
    identifier: string;
};

export type TokenPreview = Token & {
    tokenPreview: (props: Token) => ReactNode;
    getClassName: (props: Token) => string;
};
