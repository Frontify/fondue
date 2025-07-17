/* (c) Copyright Frontify Ltd., all rights reserved. */

export const UsageInfo = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-2 tw-mb-4 tw-bg-surface-active tw-text-primary tw-p-4 tw-rounded-medium">
            <span className="tw-heading-x-large tw-text-primary">Usage</span>
            <p className="tw-body-medium tw-text-primary">{children}</p>
        </div>
    );
};
