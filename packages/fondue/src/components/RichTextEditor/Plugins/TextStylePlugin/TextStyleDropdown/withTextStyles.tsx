/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type Plugin } from '../../Plugin';

export const withTextStyles =
    <T extends Record<string, unknown>>(Component: ComponentType<T>, textStyles: Plugin[]) =>
    (props: T) => <Component {...props} textStyles={textStyles} />;
