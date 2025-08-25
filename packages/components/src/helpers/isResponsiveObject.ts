/* (c) Copyright Frontify Ltd., all rights reserved. */

import { screens } from '../../tailwind.config';

type Breakpoint = keyof typeof screens | 'base';
const breakpoints = Object.keys(screens);

export const isResponsiveObject = <TValue>(value: unknown): value is { [key in Breakpoint]?: TValue } => {
    return value !== null && typeof value === 'object' && Object.keys(value).some((key) => breakpoints.includes(key));
};
