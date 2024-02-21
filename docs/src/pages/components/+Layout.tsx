/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Layout as RootLayout } from '../+Layout';
import { ComponentNavigation } from '../../components/ComponentNavigation/ComponentNavigation';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <RootLayout>
            <div className="tw-h-full tw-flex tw-w-full">
                <nav className="tw-p-8 lg:tw-flex tw-hidden tw-flex-col tw-w-72 tw-shrink-0">
                    <ComponentNavigation />
                </nav>
                {children}
            </div>
        </RootLayout>
    );
};
