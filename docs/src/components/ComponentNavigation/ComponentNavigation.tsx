/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Component, allComponents } from '#contentlayer/generated';

type ComponentTree = {
    [key: string]: Component[];
};

export const ComponentNavigation = () => {
    const componentTree = allComponents.reduce((accumulator: ComponentTree, current: Component) => {
        const key: string = current.parentFolder;
        if (!accumulator[key]) {
            accumulator[key] = [];
        }
        accumulator[key]!.push(current);
        return accumulator;
    }, {} as ComponentTree);

    return (
        <>
            <span className="tw-text-lg tw-font-bold">Components</span>
            <ul className="tw-mt-4">
                {Object.keys(componentTree)
                    .toSorted((a, b) => a.localeCompare(b))
                    .map((componentGroupKey) => {
                        const componentGroup = componentTree[componentGroupKey] || [];
                        if (componentGroup.length > 1) {
                            return (
                                <li className="tw-my-2" key={componentGroupKey}>
                                    <span className="tw-font-semibold tw-capitalize">{componentGroupKey}</span>
                                    <ul className="tw-ml-4 tw-my-1">
                                        {componentGroup
                                            .toSorted((a, b) => a.title.localeCompare(b.title))
                                            .map((component) => (
                                                <li className="tw-my-1" key={`${componentGroupKey}-${component.title}`}>
                                                    <a href={`/components/${component.route}`}>{component.title}</a>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            );
                        }
                        if (componentGroup[0]) {
                            return (
                                <li className="tw-my-2" key={componentGroupKey}>
                                    <a className="tw-font-semibold" href={`/components/${componentGroup[0].route}`}>
                                        {componentGroup[0].title}
                                    </a>
                                </li>
                            );
                        }
                        return null;
                    })}
            </ul>
        </>
    );
};
