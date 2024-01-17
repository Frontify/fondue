/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { withProps, withVariants } from '@udecode/cn';
import { cva } from 'class-variance-authority';

const separatorVariants = cva('tw-shrink-0 tw-bg-slate-200 dark:tw-bg-slate-800', {
    variants: {
        orientation: {
            horizontal: 'tw-h-[1px] tw-w-full',
            vertical: 'tw-h-full tw-w-[1px]',
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
    },
});

export const Separator = withVariants(
    withProps(SeparatorPrimitive.Root, {
        orientation: 'horizontal',
        decorative: true,
    }),
    separatorVariants,
);
