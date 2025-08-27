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
                <span className="tw-mr-1.5 tw-font-primary tw-text-large tw-text-primary tw-font-medium">
                    {title}
                </span>
                {icon}
            </div>
            {description && (
                <div className="tw-mt-3.5">
                    <span className="tw-font-primary tw-text-small tw-text-secondary">{description}</span>
                </div>
            )}
        </div>
    );
};
