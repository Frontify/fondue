/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard, IconCode } from '@frontify/fondue-icons';
import { useCallback, useState, type ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Flyout } from '../Flyout/Flyout';
import { Grid } from '../Grid/Grid';
import { useFondueTheme } from '../ThemeProvider/ThemeProvider';

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
    getTailwindIdentifier: (props: Utility) => string;
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

const PreviewCard = ({ properties, path, getUtilityPreview, getTailwindIdentifier }: UtilityPreview) => {
    console.log(properties, path);
    const identifier = path.join('/');
    const theme = useFondueTheme();
    const [variableValue, setVariableValue] = useState<string | null>(null);
    const cardRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                const themeProvider = node.closest('.fondue-theme-provider') as HTMLElement;
                const value = window.getComputedStyle(themeProvider).getPropertyValue(`--${identifier}`);
                setVariableValue(value);
            }
        },
        [identifier, theme],
    );

    const tailwindIdentifier = 'test';
    return (
        <div
            className="tw-min-w-full tw-max-w-full tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2"
            key={identifier}
            ref={cardRef}
        >
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-overflow-hidden tw-text-surface-on-surface">
                {getUtilityPreview({ properties, path })}
            </div>
            <Flex direction="row" justify="space-between" align="flex-end" gap={1} maxWidth="100%">
                <Flex direction="column" gap={1} minWidth="0">
                    <span className="tw-body-medium-x-strong tw-text-surface-on-surface">{identifier}</span>
                    <span className="tw-body-x-small tw-text-surface-on-surface-variant tw-line-clamp-1">
                        {variableValue}
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
                                            {tailwindIdentifier}
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            aspect="square"
                                            onPress={() => navigator.clipboard.writeText(tailwindIdentifier)}
                                        >
                                            <IconClipboard size={16} />
                                        </Button>
                                    </div>
                                </Flex>
                                <Flex direction="column" gap={2}>
                                    <span className="tw-body-small-x-strong tw-text-surface-on-surface">CSS</span>
                                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-bg-container-secondary tw-p-2 tw-rounded-medium">
                                        <span className="tw-text-xx-small tw-font-monospace tw-text-surface-on-surface">
                                            {identifier}
                                        </span>
                                        <Button
                                            emphasis="default"
                                            size="small"
                                            aspect="square"
                                            onPress={() => navigator.clipboard.writeText(identifier)}
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

export const UtilityList = ({
    utilities,
    parentKeys = [],
    getUtilityPreview,
    getTailwindIdentifier,
}: {
    utilities: unknown;
    parentKeys?: string[];
    getUtilityPreview: (props: Utility) => ReactNode;
    getTailwindIdentifier: (props: Utility) => string;
}) => {
    const utilitiesObject = utilities as Utilities;

    return Object.entries(utilitiesObject).map(([key, value]) => {
        if (typeof value === 'object') {
            const firstEntry = Object.values(value)[0] as Utilities;
            const hasDirectTokens = Object.values(firstEntry).some((v) => typeof v === 'object' && 'value' in v);
            // if (hasDirectTokens) {
            //     console.log(key, value);
            // }

            return (
                <Flex direction="column" gap={4} key={key}>
                    <GroupLabel label={key} parentKeys={parentKeys} />
                    <div className="tw-border-l-line-mid tw-border-l-large tw-pl-4">
                        {hasDirectTokens ? (
                            <Grid columns={4} gap={4} key={key}>
                                <PreviewCard
                                    key={key}
                                    properties={value}
                                    path={[...parentKeys, key]}
                                    getUtilityPreview={getUtilityPreview}
                                    getTailwindIdentifier={getTailwindIdentifier}
                                />
                            </Grid>
                        ) : (
                            <Flex direction="column" gap={8} key={key}>
                                <UtilityList
                                    utilities={value}
                                    parentKeys={[...parentKeys, key]}
                                    getUtilityPreview={getUtilityPreview}
                                    getTailwindIdentifier={getTailwindIdentifier}
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
