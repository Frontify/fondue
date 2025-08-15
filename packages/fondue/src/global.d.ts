/* (c) Copyright Frontify Ltd., all rights reserved. */

type Nullable<T> = T | null;
type Nullish<T> = T | null | undefined;

type TokensType = {
    [key: string]: {
        [key: string]: {
            value?: string;
            attributes?: {
                category?: string;
                type?: string;
                'tailwind-name'?: string;
            };
            filePath?: string;
            isSource?: boolean;
            original?: {
                value?: string;
                attributes?: {
                    category?: string;
                };
            };
            name?: string;
            path?: string[];
        };
    };
};

declare module '@frontify/fondue-tokens' {
    const tokens: TokensType;
    export = tokens;
}
