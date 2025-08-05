/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex } from '@frontify/fondue-components';

export const GroupLabel = ({ label, parentKeys }: { label: string; parentKeys: string[] }) => {
    return (
        <Flex direction="row">
            <span className="tw-heading-large tw-text-container-disabled-on-disabled-container">
                {parentKeys?.length ? `${parentKeys.join('/')}/` : ''}
            </span>
            <span className="tw-heading-large-strong tw-text-primary">{label}</span>
        </Flex>
    );
};
