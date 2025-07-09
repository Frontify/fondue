/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';

import { GroupLabel } from './components/GroupLabel';
import { useTokenPreview } from './components/PreviewWrapper';
import { VariableValue } from './components/VariableValue';

export type Utilities = {
    [key: string]: Utilities | Utility;
};

export type Utility = {
    properties: {
        [key: string]: UtilityProperty;
    };
    path: string[];
};

type UtilityProperty = {
    name: string;
    value: string;
    type: string;
};

type UtilityPreview = Utility & {
    getUtilityPreview: (props: Utility) => ReactNode;
    getClassName: (props: Utility) => string;
};

const UtilityPropertyList = ({ properties }: { properties: [string, UtilityProperty][] }) => {
    return (
        <div className="tw-grid tw-grid-cols-[fit-content(1px)_1fr] tw-gap-1 tw-text-surface-on-surface-variant">
            {properties.map(([key, value]) => (
                <>
                    <span key={key} className="tw-whitespace-nowrap tw-body-x-small-x-strong ">
                        {key}:
                    </span>
                    <VariableValue variableName={value.name} className="tw-min-w-0 tw-line-clamp-1 tw-body-x-small" />
                </>
            ))}
        </div>
    );
};

const PreviewCard = ({ properties, path, getUtilityPreview, getClassName }: UtilityPreview) => {
    const className = getClassName({ properties, path });
    const { tailwindPrefix } = useTokenPreview();

    return (
        <div className="tw-min-w-full tw-max-w-[300px] tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2">
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-overflow-hidden tw-text-surface-on-surface">
                {getUtilityPreview({ properties, path })}
            </div>
            <Flex direction="row" justify="space-between" align="flex-end" gap={1} maxWidth="100%">
                <Flex direction="column" gap={4} minWidth="0">
                    <Flex direction="row" gap={0}>
                        {tailwindPrefix && (
                            <span className="tw-body-medium-x-strong tw-text-container-disabled-on-disabled-container">
                                {tailwindPrefix}
                            </span>
                        )}
                        <span className="tw-body-medium-x-strong tw-text-surface-on-surface">{className}</span>
                    </Flex>
                    <UtilityPropertyList properties={Object.entries(properties)} />
                </Flex>
                <Button
                    emphasis="weak"
                    size="small"
                    aspect="square"
                    onPress={() => navigator.clipboard.writeText(`${tailwindPrefix}${className}`)}
                >
                    <IconClipboard size={16} />
                </Button>
            </Flex>
        </div>
    );
};

export const UtilityList = ({
    utilities,
    parentKeys = [],
    getUtilityPreview,
    getClassName,
}: {
    utilities: unknown;
    parentKeys?: string[];
    getUtilityPreview: (props: Utility) => ReactNode;
    getClassName: (props: Utility) => string;
}) => {
    const utilitiesObject = utilities as Utilities;

    return Object.entries(utilitiesObject)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            if (typeof value === 'object') {
                const hasDirectTokens = Object.values(Object.values(value)[0] as Utilities).some(
                    (v) => typeof v === 'object' && 'value' in v,
                );
                const hasTokenProperties = Object.values(value).some((v) => typeof v === 'object' && 'value' in v);

                if (hasTokenProperties) {
                    return (
                        <PreviewCard
                            key={key}
                            properties={value}
                            path={[...parentKeys, key]}
                            getUtilityPreview={getUtilityPreview}
                            getClassName={getClassName}
                        />
                    );
                }

                return (
                    <Flex direction="column" gap={4} key={key}>
                        <GroupLabel label={key} parentKeys={parentKeys} />
                        <div className="tw-border-l-line-mid tw-border-l-large tw-pl-4">
                            {hasDirectTokens ? (
                                <Grid
                                    columns={{
                                        xs: 1,
                                        sm: 2,
                                        md: 3,
                                    }}
                                    gap={4}
                                    key={key}
                                >
                                    <UtilityList
                                        utilities={value}
                                        parentKeys={[...parentKeys, key]}
                                        getUtilityPreview={getUtilityPreview}
                                        getClassName={getClassName}
                                    />
                                </Grid>
                            ) : (
                                <Flex direction="column" gap={8} key={key}>
                                    <UtilityList
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
            return false;
        });
};
