/* (c) Copyright Frontify Ltd., all rights reserved. */

import utilities from '@frontify/fondue-tokens/json/utilities';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { UtilityList, type Utility } from './UtilityList';
import { PreviewWrapper, useTokenPreview } from './components/PreviewWrapper';

export default {
    title: 'Tokens/Utilities',
} as Meta;

const getUtilityPreview = ({ properties }: Utility) => {
    const { textContent } = useTokenPreview();

    const style = Object.entries(properties).reduce(
        (acc, [key, value]) => {
            acc[key.replaceAll(/-./g, (match) => match.slice(-1).toUpperCase())] = `var(--${value.name})`;
            return acc;
        },
        {} as Record<string, string>,
    );
    return (
        <div style={style} className="tw-text-surface-on-surface tw-flex tw-items-center tw-justify-center tw-h-full">
            {textContent}
        </div>
    );
};

const getClassName = ({ path }: Utility) => {
    return `${path.join('-')}`;
};

export const Default: StoryFn = () => {
    return (
        <PreviewWrapper header="Utilities">
            <Flex direction="column" gap={8}>
                <h2 className="tw-heading-x-large tw-text-surface-on-surface">Text</h2>
                <Flex direction="column" gap={8}>
                    <UtilityList
                        utilities={utilities.text}
                        getUtilityPreview={getUtilityPreview}
                        getClassName={getClassName}
                    />
                </Flex>
            </Flex>
        </PreviewWrapper>
    );
};
