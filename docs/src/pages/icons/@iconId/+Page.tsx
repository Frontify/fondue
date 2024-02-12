/* (c) Copyright Frontify Ltd., all rights reserved. */

import { icons } from '@frontify/fondue-icons';
import kebabCase from 'lodash/fp/kebabCase';
import { type CSSProperties } from 'react';
import { useData } from 'vike-react/useData';

import transparent from '../../../assets/images/transparent.png';

import { type Data } from './+data';

export const Page = () => {
    const data = useData<Data>();

    if (!data?.iconName) {
        return null;
    }

    const IconComponent = data.iconName in icons ? icons[data.iconName as keyof typeof icons] : () => null;

    return (
        <div
            className="tw-p-8 tw-flex tw-flex-col lg:tw-flex-row tw-gap-8"
            style={{ '--transparent-background-url': `url(${transparent})` } as CSSProperties}
        >
            <div className="tw-flex lg:tw-flex-col tw-gap-8">
                <div className="tw-size-64 tw-flex tw-items-center tw-justify-center tw-bg-[image:var(--transparent-background-url)]">
                    <IconComponent className="tw-size-full" />
                </div>

                <div className="tw-grid tw-template tw-grid-cols-3 tw-gap-8">
                    <div className="tw-size-16 tw-inline-flex tw-items-center tw-justify-center tw-bg-[image:var(--transparent-background-url)]">
                        <IconComponent className="tw-size-full" />
                    </div>

                    <div className="tw-size-16 tw-inline-flex tw-items-center tw-justify-center tw-bg-[image:var(--transparent-background-url)]">
                        <IconComponent className="tw-size-12" />
                    </div>

                    <div className="tw-size-16 tw-inline-flex tw-items-center tw-justify-center tw-bg-[image:var(--transparent-background-url)]">
                        <IconComponent className="tw-size-8" />
                    </div>
                </div>
            </div>

            <div className="tw-flex">
                <h1 className="tw-text-2xl tw-font-bold tw-mb-8">{kebabCase(data.iconName).replace('icon-', '')}</h1>
            </div>
        </div>
    );
};
