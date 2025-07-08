/* (c) Copyright Frontify Ltd., all rights reserved. */

import utilities from '@frontify/fondue-tokens/json/utilities';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { UtilityList, type Utility } from './UtilityList';

export default {
    title: 'Tokens/Utilities',
} as Meta;

const getUtilityPreview = ({ value }: Utility) => {
    return <div style={{ backgroundColor: value }} className=" tw-w-full tw-h-full"></div>;
};

const getTailwindIdentifier = ({ name }: Utility) => {
    return `tw-*-${name.replace('utility-', '').replace('-default', '')}`;
};

export const Default: StoryFn = () => {
    return (
        <Flex direction="column" gap={8}>
            <h1 className="tw-heading-xx-large tw-text-surface-on-surface">Colors</h1>
            <Flex direction="column" gap={8}>
                <UtilityList
                    utilities={utilities}
                    getUtilityPreview={getUtilityPreview}
                    getTailwindIdentifier={getTailwindIdentifier}
                />
            </Flex>
        </Flex>
    );
};
