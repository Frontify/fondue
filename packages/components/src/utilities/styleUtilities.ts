/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendTailwindMerge } from 'tailwind-merge';
import { tv, type TV } from 'tailwind-variants';

type ClassNameValue = ClassNameArray | string | null | undefined | 0 | false;
type ClassNameArray = ClassNameValue[];

const customTwMerge = extendTailwindMerge({
    prefix: 'tw-',
    extend: {
        classGroups: {
            'font-size': [
                'text-xx-small',
                'text-x-small',
                'text-small',
                'text-medium',
                'text-large',
                'text-x-large',
                'text-xx-large',
            ],
        },
    },
});

export const cn = (...classLists: ClassNameValue[]): string => {
    return customTwMerge(...classLists);
};

export const sv: TV = (variants) => {
    return tv(variants);
};
