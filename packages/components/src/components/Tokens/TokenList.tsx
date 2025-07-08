/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard, IconCode } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Flyout } from '../Flyout/Flyout';
import { Grid } from '../Grid/Grid';

import { GroupLabel } from './components/GroupLabel';
import { useTokenPreview } from './components/PreviewWrapper';
import { VariableValue } from './components/VariableValue';

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
    getClassName: (props: Token) => string;
};

const PreviewCard = ({ identifier, value, name, path, getTokenPreview, getClassName }: TokenPreview) => {
    const { tailwindPrefix } = useTokenPreview();
    const tailwindIdentifier = getClassName?.({ identifier, value, name, path });
    return (
        <div
            className="tw-w-[250px] tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2"
            key={identifier}
        >
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-overflow-hidden tw-text-surface-on-surface">
                {getTokenPreview({ identifier, value, name, path })}
            </div>
            <Flex direction="row" justify="space-between" align="flex-end" gap={1} maxWidth="100%">
                <Flex direction="column" gap={1} minWidth="0">
                    <span className="tw-body-medium-x-strong tw-text-surface-on-surface">{identifier}</span>
                    <VariableValue
                        variableName={name}
                        className="tw-body-x-small tw-text-surface-on-surface-variant tw-line-clamp-1"
                    />
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
                                            {tailwindPrefix}
                                            {tailwindIdentifier}
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            aspect="square"
                                            onPress={() =>
                                                navigator.clipboard.writeText(`${tailwindPrefix}${tailwindIdentifier}`)
                                            }
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
    getClassName,
}: {
    tokens: unknown;
    parentKeys?: string[];
    getTokenPreview: (props: Token) => ReactNode;
    getClassName: (props: Token) => string;
}) => {
    const tokenObject = tokens as Tokens;
    return Object.entries(tokenObject)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
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
                                        <TokenList
                                            tokens={value}
                                            parentKeys={[...parentKeys, key]}
                                            getTokenPreview={getTokenPreview}
                                            getClassName={getClassName}
                                        />
                                    </Grid>
                                ) : (
                                    <Flex direction="column" gap={8}>
                                        <TokenList
                                            tokens={value as Tokens}
                                            parentKeys={[...parentKeys, key]}
                                            getTokenPreview={getTokenPreview}
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
