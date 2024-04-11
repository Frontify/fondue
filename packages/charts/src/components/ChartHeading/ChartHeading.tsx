/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type ChartHeadingProps = {
    title: ReactNode | string;
    description?: string;
    icon?: ReactNode;
};
export const ChartHeading = ({ title, description, icon }: ChartHeadingProps) => {
    return (
        <div className="tw-mb-5 tw-mt-2">
            <div className="tw-flex tw-items-center">
                <span className="tw-mr-1.5 tw-font-heading tw-text-heading-large tw-text-text tw-font-medium">
                    {title}
                </span>
                {icon}
            </div>
            {description && (
                <div className="tw-mt-3.5">
                    <span className="tw-font-body tw-text-body-small tw-text-text-weak">{description}</span>
                </div>
            )}
        </div>
    );
};
