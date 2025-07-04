/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard, IconCode } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Flyout } from '../Flyout/Flyout';
import { Grid } from '../Grid/Grid';

export type Tokens = {
    [key: string]: Token | Tokens;
};

export type Token = {
    value: string;
    name: string;
    path: string[];
    identifier: string;
};

type TokenPreview = Token & {
    getTokenPreview: (props: Token) => ReactNode;
};

const GroupLabel = ({ label, parentKeys }: { label: string; parentKeys: string[] }) => {
    return (
        <Flex direction="row">
            <span className="tw-heading-large tw-text-container-disabled-on-disabled-container">
                {parentKeys?.length ? `${parentKeys.join('/')}/` : ''}
            </span>
            <span className="tw-heading-large-strong tw-text-surface-on-surface">{label}</span>
        </Flex>
    );
};

const PreviewCard = ({ identifier, value, name, path, getTokenPreview }: TokenPreview) => {
    const codeIdentifier = `tw-*-${name.replace('color-', '').replace('-default', '')}`;
    return (
        <div
            className="tw-w-full tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2"
            key={identifier}
        >
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-p-2">
                {getTokenPreview({ identifier, value, name, path })}
            </div>
            <Flex direction="row" justify="space-between" align="flex-end" gap={1}>
                <Flex direction="column">
                    <span className="tw-body-medium-x-strong tw-text-surface-on-surface">{identifier}</span>
                    <span className="tw-body-x-small tw-text-surface-on-surface-variant">
                        {name.replace('color-', '')}
                    </span>
                </Flex>
                <Flyout.Root>
                    <Flyout.Trigger>
                        <Button emphasis="weak" size="small" aspect="square">
                            <IconCode size={16} />
                        </Button>
                    </Flyout.Trigger>
                    <Flyout.Content padding="compact">
                        <Flyout.Body>
                            <Flex direction="column" gap={4} my={2}>
                                <Flex direction="column" gap={2}>
                                    <span className="tw-body-small-x-strong tw-text-surface-on-surface">Tailwind</span>
                                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-bg-container-secondary tw-p-2 tw-rounded-medium">
                                        <span className="tw-text-xx-small tw-font-monospace tw-text-surface-on-surface">
                                            {codeIdentifier}
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            aspect="square"
                                            onPress={() => navigator.clipboard.writeText(codeIdentifier)}
                                        >
                                            <IconClipboard size={16} />
                                        </Button>
                                    </div>
                                </Flex>
                                <Flex direction="column" gap={2}>
                                    <span className="tw-body-small-x-strong tw-text-surface-on-surface">CSS</span>
                                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-bg-container-secondary tw-p-2 tw-rounded-medium">
                                        <span className="tw-text-xx-small tw-font-monospace tw-text-surface-on-surface">
                                            {value}
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            aspect="square"
                                            onPress={() => navigator.clipboard.writeText(value)}
                                        >
                                            <IconClipboard size={16} />
                                        </Button>
                                    </div>
                                </Flex>
                            </Flex>
                        </Flyout.Body>
                    </Flyout.Content>
                </Flyout.Root>
            </Flex>
        </div>
    );
};

export const TokenList = ({
    tokens,
    parentKeys = [],
    getTokenPreview,
}: {
    tokens: unknown;
    parentKeys?: string[];
    getTokenPreview: (props: Token) => ReactNode;
}) => {
    const tokenObject = tokens as Tokens;
    return Object.entries(tokenObject).map(([key, value]) => {
        if (typeof value === 'object') {
            if (typeof value.value === 'string' && typeof value.name === 'string' && Array.isArray(value.path)) {
                return (
                    <PreviewCard
                        key={key}
                        identifier={key}
                        value={value.value}
                        name={value.name}
                        path={value.path}
                        getTokenPreview={getTokenPreview}
                    />
                );
            } else {
                const hasDirectTokens = Object.values(value).some((v) => typeof v === 'object' && 'value' in v);

                return (
                    <Flex direction="column" gap={4} key={key}>
                        <GroupLabel label={key} parentKeys={parentKeys} />
                        <div className="tw-border-l-line-mid tw-border-l-large tw-pl-4">
                            {hasDirectTokens ? (
                                <Grid columns={4} gap={4}>
                                    <TokenList
                                        tokens={value}
                                        parentKeys={[...parentKeys, key]}
                                        getTokenPreview={getTokenPreview}
                                    />
                                </Grid>
                            ) : (
                                <Flex direction="column" gap={8}>
                                    <TokenList
                                        tokens={value as Tokens}
                                        parentKeys={[...parentKeys, key]}
                                        getTokenPreview={getTokenPreview}
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
