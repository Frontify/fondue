/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Token } from '../components/Tokens/types';

export const getColorTokenClassName = ({ name }: Token) => {
    return `*-${name.replace('color-', '').replace('-default', '')}`;
};

export const ColorTokenPreview = ({ value }: Token) => {
    return <div style={{ backgroundColor: value }} className=" tw-w-full tw-h-full"></div>;
};
