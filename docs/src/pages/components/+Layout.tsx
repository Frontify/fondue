/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { allComponents } from '#contentlayer/generated';

import { Layout as RootLayout } from '../+Layout';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <RootLayout>
            <div className="tw-h-full tw-flex tw-w-full">
                <nav className="tw-p-8 lg:tw-flex tw-hidden tw-flex-col tw-w-72 tw-shrink-0">
                    <span className="tw-text-lg tw-font-bold">Components</span>
                    <ul className="tw-mt-4">
                        {allComponents.map((component) => (
                            <li key={component._id}>
                                <a href={`/components/${component.route}`}>{component.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="tw-p-8 tw-w-full tw-flex tw-justify-center">
                    <div className="tw-max-w-[856px] tw-w-full">{children}</div>
                </div>

                <aside className="tw-p-8 2xl:tw-flex tw-hidden tw-flex-col tw-w-72 tw-shrink-0">
                    <span className="tw-text-lg tw-font-bold">Table of content</span>
                </aside>
            </div>
        </RootLayout>
    );
};
