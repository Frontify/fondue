/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Layout as RootLayout } from '../+Layout';

import { allComponents } from '#contentlayer/generated';

export const Layout = ({ children }: { children: ReactNode }) => {
    const componentTree = allComponents.reduce((accumulator, current) => {
        if (!accumulator[current.parentFolder]) {
            accumulator[current.parentFolder] = [];
        }
        accumulator[current.parentFolder].push(current);
        return accumulator;
    }, {});

    console.log(componentTree);

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

                {children}
            </div>
        </RootLayout>
    );
};
