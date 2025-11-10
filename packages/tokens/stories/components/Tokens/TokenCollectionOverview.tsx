/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex, Grid } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { GroupLabel } from '../GroupLabel';

import { TokenPreviewCard } from './TokenPreviewCard';
import { type Token, type Tokens } from './types';

type TokenCollectionOverviewProps = {
    tokens: unknown;
    parentKeys?: string[];
    tokenPreview: (props: Token) => ReactNode;
    getClassName: (props: Token) => string;
};

const order = [
    'default',
    'hover',
    'active',
    'dim',
    'on-',
    'xx-small',
    'x-small',
    'small',
    'mid',
    'regular',
    'tight',
    'medium',
    'large',
    'x-large',
    'xx-large',
    'primary',
    'monospace',
    'medium',
    'bold',
    'wide',
    'loose',
    'extra-loose',
];

export const TokenCollectionOverview = ({
    tokens,
    parentKeys = [],
    tokenPreview,
    getClassName,
}: TokenCollectionOverviewProps) => {
    const tokenObject = tokens as Tokens;
    return Object.entries(tokenObject)
        .sort((a, b) => {
            const keyA = a[0];
            const keyB = b[0];

            let indexA = order.findIndex((orderKey) => keyA.includes(orderKey));
            if (indexA === -1) {
                indexA = Infinity;
            }

            let indexB = order.findIndex((orderKey) => keyB.includes(orderKey));
            if (indexB === -1) {
                indexB = Infinity;
            }

            if (indexA !== indexB) {
                return indexA - indexB;
            }

            return keyA.localeCompare(keyB);
        })
        .map(([key, value]) => {
            if (typeof value === 'object') {
                if (typeof value.value === 'string' && typeof value.name === 'string' && Array.isArray(value.path)) {
                    return (
                        <TokenPreviewCard
                            key={key}
                            identifier={key}
                            value={value.value}
                            name={value.name}
                            path={value.path}
                            tokenPreview={tokenPreview}
                            getClassName={getClassName}
                        />
                    );
                } else {
                    const hasDirectTokens = Object.values(value).some((v) => typeof v === 'object' && 'value' in v);

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
                                            lg: 4,
                                        }}
                                        gap={4}
                                    >
                                        <TokenCollectionOverview
                                            tokens={value}
                                            parentKeys={[...parentKeys, key]}
                                            tokenPreview={tokenPreview}
                                            getClassName={getClassName}
                                        />
                                    </Grid>
                                ) : (
                                    <Flex direction="column" gap={8}>
                                        <TokenCollectionOverview
                                            tokens={value as Tokens}
                                            parentKeys={[...parentKeys, key]}
                                            tokenPreview={tokenPreview}
                                            getClassName={getClassName}
                                        />
                                    </Flex>
                                )}
                            </div>
                        </Flex>
                    );
                }
            }
            return false;
        });
};
