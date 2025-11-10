/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flex } from '@frontify/fondue-components';
import { IconClipboard } from '@frontify/fondue-icons';
import { Fragment } from 'react/jsx-runtime';

import { usePreviewConfig } from '../PreviewConfigContext';
import { VariableValue } from '../VariableValue';

import { type UtilityPreview, type UtilityProperty } from './types';

const UtilityPropertyList = ({ properties }: { properties: [string, UtilityProperty][] }) => {
    return (
        <div className="tw-grid tw-grid-cols-[fit-content(1px)_1fr] tw-gap-1 tw-text-primary">
            {properties
                .filter(([_key, value]) => value.type !== 'rawValue')
                .map(([key, value]) => (
                    <Fragment key={key}>
                        <span className="tw-whitespace-nowrap tw-body-x-small-x-strong ">{key}:</span>
                        <VariableValue
                            variableName={value.name}
                            variableValue={value.value}
                            className="tw-min-w-0 tw-line-clamp-1 tw-body-x-small"
                        />
                    </Fragment>
                ))}
        </div>
    );
};

export const UtilityPreviewCard = ({ properties, path, getUtilityPreview, getClassName }: UtilityPreview) => {
    const className = getClassName({ properties, path });
    const { tailwindPrefix } = usePreviewConfig();

    return (
        <div className="tw-min-w-full tw-max-w-[300px] tw-min-h-32 tw-p-2 tw-rounded-large tw-border-line-mid tw-border tw-border-solid tw-bg-surface tw-shadow tw-flex tw-flex-col tw-justify-between tw-gap-2">
            <div className="tw-w-full tw-min-h-16 tw-rounded-medium tw-border-line-subtle tw-border tw-overflow-hidden tw-text-primary">
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
                        <span className="tw-body-medium-x-strong tw-text-primary">{className}</span>
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
