/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';

import { kebabCase } from '../../../utilities/kebabCase';

export const Page = () => {
    return (
        <div className="tw-p-8">
            <h1 className="tw-text-3xl tw-font-bold">Icons</h1>

            <div className="tw-mt-8 tw-gap-8 tw-grid tw-grid-cols-[repeat(auto-fill,minmax(56px,1fr))]">
                {Object.keys(icons).map((icon) => {
                    const IconComponent = icons[icon];

                    const iconPath = kebabCase(icon).replace(/^icon-/, '');

                    return (
                        <a
                            href={`/icons/${iconPath}`}
                            key={icon}
                            className="tw-inline-flex tw-items-center tw-justify-center tw-aspect-square tw-rounded tw-bg-box-neutral hover:tw-bg-box-neutral-hover active:tw-bg-box-neutral-pressed"
                        >
                            <IconComponent />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
