/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type GetClassNameProps, type Token } from '../components/Tokens/types';

export const getColorTokenClassName = ({ token }: GetClassNameProps) => {
    return `*-${token.name.replace('color-', '').replace('-default', '')}`;
};

export const ColorTokenPreview = ({ value }: Token) => {
    return <div style={{ backgroundColor: value }} className=" tw-w-full tw-h-full"></div>;
};
