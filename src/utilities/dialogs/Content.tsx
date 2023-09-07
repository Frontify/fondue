/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';

// eslint-disable-next-line react/jsx-no-useless-fragment
export const Content = ({ children }: { children?: ReactNode }): ReactElement => <>{children}</>;
Content.displayName = 'FondueDialogContent';
