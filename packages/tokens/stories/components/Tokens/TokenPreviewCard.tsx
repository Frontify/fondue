/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flex, Flyout } from '@frontify/fondue-components';
import { IconClipboard, IconCode } from '@frontify/fondue-icons';

import { usePreviewConfig } from '../PreviewConfigContext';
import { VariableValue } from '../VariableValue';

import { type TokenPreview } from './types';

export const TokenPreviewCard = ({ identifier, value, name, path, tokenPreview, getClassName }: TokenPreview) => {
    const { tailwindPrefix } = usePreviewConfig();
    const tailwindIdentifier = getClassName?.({ identifier, value, name, path });
    return (
        <div
            id={name}
            className="tw-min-w-full tw-max-w-[300px] tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2"
            key={identifier}
        >
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-overflow-hidden tw-text-primary">
                {tokenPreview({ identifier, value, name, path })}
            </div>
            <Flex direction="row" justify="space-between" align="flex-end" gap={1} maxWidth="100%">
                <Flex direction="column" gap={1} minWidth="0">
                    <span className="tw-body-medium-x-strong tw-text-primary">{identifier}</span>
                    <VariableValue
                        variableName={name}
                        variableValue={value}
                        className="tw-body-x-small tw-text-primary tw-line-clamp-1"
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
                                    <span className="tw-body-small-x-strong tw-text-primary">Tailwind</span>
                                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-bg-container-secondary tw-p-2 tw-rounded-medium">
                                        <span className="tw-text-xx-small tw-font-monospace tw-text-primary">
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
                                    <span className="tw-body-small-x-strong tw-text-primary">CSS</span>
                                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-bg-container-secondary tw-p-2 tw-rounded-medium">
                                        <span className="tw-text-xx-small tw-font-monospace tw-text-primary">
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
