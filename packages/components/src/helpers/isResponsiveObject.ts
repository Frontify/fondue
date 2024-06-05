/* (c) Copyright Frontify Ltd., all rights reserved. */

import tailwindConfig from '../../tailwind.config';

type Breakpoint = keyof typeof tailwindConfig.theme.screens;
const breakpoints = Object.keys(tailwindConfig.theme.screens);

export const isResponsiveObject = <TValue>(value: unknown): value is { [key in Breakpoint]?: TValue } => {
    return value !== null && typeof value === 'object' && Object.keys(value).some((key) => breakpoints.includes(key));
};
