/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable react/display-name */

import { ComponentType } from 'react';
import { Plugin } from '../../Plugin';

export const withTextStyles =
    <T extends Record<string, unknown>>(Component: ComponentType<T>, textStyles: Plugin[]) =>
    (props: T) => <Component {...props} textStyles={textStyles} />;
