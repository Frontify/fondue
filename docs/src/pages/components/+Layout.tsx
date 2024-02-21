/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Layout as RootLayout } from '../+Layout';

import { type Component, allComponents } from '#contentlayer/generated';

export const Layout = ({ children }: { children: ReactNode }) => {
    type ComponentTree = {
        [key: string]: Component[];
    };

    const componentTree = allComponents.reduce((accumulator: ComponentTree, current) => {
        if (!accumulator[current.parentFolder]) {
            accumulator[current.parentFolder] = [];
        }
        accumulator[current.parentFolder]!.push(current);
        return accumulator;
    }, {});

    return (
        <RootLayout>
            <div className="tw-h-full tw-flex tw-w-full">
                <nav className="tw-p-8 lg:tw-flex tw-hidden tw-flex-col tw-w-72 tw-shrink-0">
                    <span className="tw-text-lg tw-font-bold">Components</span>
                    <ul className="tw-mt-4">
                        {Object.keys(componentTree).map((componentGroupKey) => {
                            const componentGroup = componentTree[componentGroupKey] || [];
                            if (componentGroup.length > 1) {
                                return (
                                    <li className="tw-my-2" key={componentGroupKey}>
                                        <span className="tw-font-semibold tw-capitalize">{componentGroupKey}</span>
                                        <ul className="tw-ml-4 tw-my-1">
                                            {componentGroup.map((component) => (
                                                <li className="tw-my-1" key={componentGroupKey}>
                                                    <a href={`/components/${component.route}`}>{component.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }
                            if (componentGroup[0]) {
                                return (
                                    <li key={componentGroupKey}>
                                        <a className="tw-font-semibold" href={`/components/${componentGroup[0].route}`}>
                                            {componentGroup[0].title}
                                        </a>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </nav>

                {children}
            </div>
        </RootLayout>
    );
};
