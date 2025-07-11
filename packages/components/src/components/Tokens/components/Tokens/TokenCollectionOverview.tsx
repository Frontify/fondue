/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Flex } from '../../../Flex/Flex';
import { Grid } from '../../../Grid/Grid';
import { GroupLabel } from '../GroupLabel';

import { TokenPreviewCard } from './TokenPreviewCard';
import { type Token, type Tokens } from './types';

type TokenCollectionOverviewProps = {
    tokens: unknown;
    parentKeys?: string[];
    tokenPreview: (props: Token) => ReactNode;
    getClassName: (props: Token) => string;
};

export const TokenCollectionOverview = ({
    tokens,
    parentKeys = [],
    tokenPreview,
    getClassName,
}: TokenCollectionOverviewProps) => {
    const tokenObject = tokens as Tokens;
    return Object.entries(tokenObject)
        .sort((a, b) => a[0].localeCompare(b[0]))
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
