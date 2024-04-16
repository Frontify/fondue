/* (c) Copyright Frontify Ltd., all rights reserved. */

import chroma from 'chroma-js';

type Token = {
    value: string;
    modify?: { type: string; amount: number }[];
};

export const transformColor = (token: Token) => {
    const { value, modify = [] } = token;
    let color = chroma(value);

    // iterate over the modify array (see tokens/color.json)
    // and apply each modification in order
    for (const { type, amount } of modify) {
        // modifier type must match a method name in chromajs
        // https://gka.github.io/chroma.js/
        // chroma methods can be chained, so each time we override the color variable
        // we can still call other chroma methods, similar to
        // chroma(value).brighten(1).darken(1).hex();

        // @ts-expect-error Old untyped code
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        color = color[type](amount);
    }

    return color.hex();
};
