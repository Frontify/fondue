/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import kebabCase from 'lodash/fp/kebabCase';

import { tooltipStyle } from './tooltipStyle';

export const Page = () => {
    return (
        <div className="tw-p-8">
            <h1 className="tw-text-2xl tw-font-bold">Icons</h1>

            <div className="tw-mt-8 tw-gap-4 tw-grid tw-grid-cols-[repeat(auto-fill,minmax(56px,1fr))]">
                {Object.keys(icons)
                    .toSorted()
                    .map((icon) => {
                        const IconComponent = icons[icon as keyof typeof icons];
                        const iconPath = kebabCase(icon).replace(/^icon-/, '');

                        return (
                            <a
                                href={`/icons/${iconPath}`}
                                key={icon}
                                data-tooltip-text={iconPath}
                                className={[
                                    'tw-relative tw-inline-flex tw-items-center tw-justify-center tw-aspect-square tw-rounded tw-bg-box-neutral hover:tw-bg-box-neutral-hover active:tw-bg-box-neutral-pressed tw-transition-colors motion-reduce:tw-transition-none',
                                    tooltipStyle,
                                ].join(' ')}
                            >
                                <IconComponent />
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};
