/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex, Grid } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { GroupLabel } from '../GroupLabel';

import { UtilityPreviewCard } from './UtilityPreviewCard';
import { type Utility, type UtilityCollection, type UtilityProperty } from './types';

const isUtilityPropertyGroup = (value: object): value is { [key: string]: UtilityProperty } => {
    return Object.values(value).every(
        (property) =>
            typeof property === 'object' &&
            property !== null &&
            'name' in property &&
            'value' in property &&
            'type' in property,
    );
};

type UtilityListProps = {
    utilities: UtilityCollection;
    parentKeys?: string[];
    getUtilityPreview: (props: Utility) => ReactNode;
    getClassName: (props: Utility) => string;
};

export const UtilityCollectionOverview = ({
    utilities,
    parentKeys = [],
    getUtilityPreview,
    getClassName,
}: UtilityListProps) => {
    return Object.entries(utilities)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            if (typeof value === 'object' && value !== null && !('value' in value)) {
                if (isUtilityPropertyGroup(value)) {
                    return (
                        <UtilityPreviewCard
                            key={key}
                            properties={value}
                            path={[...parentKeys, key]}
                            getUtilityPreview={getUtilityPreview}
                            getClassName={getClassName}
                        />
                    );
                }

                const hasUtilities = Object.values(value).some(isUtilityPropertyGroup);

                return (
                    <Flex direction="column" gap={4} key={key}>
                        <GroupLabel label={key} parentKeys={parentKeys} />
                        <div className="tw-border-l-line-mid tw-border-l-large tw-pl-4">
                            {hasUtilities ? (
                                <Grid
                                    columns={{
                                        xs: 1,
                                        sm: 2,
                                        md: 3,
                                    }}
                                    gap={4}
                                    key={key}
                                >
                                    <UtilityCollectionOverview
                                        utilities={value}
                                        parentKeys={[...parentKeys, key]}
                                        getUtilityPreview={getUtilityPreview}
                                        getClassName={getClassName}
                                    />
                                </Grid>
                            ) : (
                                <Flex direction="column" gap={8} key={key}>
                                    <UtilityCollectionOverview
                                        utilities={value}
                                        parentKeys={[...parentKeys, key]}
                                        getUtilityPreview={getUtilityPreview}
                                        getClassName={getClassName}
                                    />
                                </Flex>
                            )}
                        </div>
                    </Flex>
                );
            }
            return null;
        });
};
