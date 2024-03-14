/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Layout as RootLayout } from '../+Layout';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <RootLayout>
            <div className="tw-h-full tw-flex tw-w-full">
                <div className="tw-p-8 tw-w-full tw-flex tw-justify-center">
                    <div className="tw-max-w-[856px] tw-w-full">{children}</div>
                </div>
            </div>
        </RootLayout>
    );
};
