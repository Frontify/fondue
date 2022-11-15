/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@frontify/fondue-tokens';

import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Tokens',
} as Meta;

function getPalette(color: any) {
    return !!color.value ? [color] : [...Object.values(color)];
}

export const AliasTokens: Story = () => {
    const categories = Object.keys(tokens).filter((category) => category !== 'color');

    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-16">
            <div className="">
                <p>
                    The name of the colors are targetted for the use as tailwind classes and are not a one-to-one match
                    to the Fondue Tokens.
                </p>
            </div>
            {categories.map((category: string) => {
                const palette = getPalette(tokens[category]);

                return (
                    <div key={category}>
                        <div className="tw-flex tw-flex-col tw-space-y-3 sm:tw-flex-row tw-text-xs sm:tw-space-y-0 sm:tw-space-x-4">
                            <div className="tw-w-32 tw-shrink-0">
                                <div className="tw-h-10 tw-flex tw-flex-col tw-justify-center">
                                    <div className="tw-text-sm tw-font-semibold tw-text-text">{category}</div>
                                </div>
                            </div>

                            <div className="tw-min-w-0 tw-flex-1 tw-grid tw-grid-cols-12 tw-gap-x-4 tw-gap-y-3 2xl:tw-gap-x-2">
                                {palette.map(({ name, value, attributes }: any) => {
                                    return (
                                        <div className="tw-space-y-1.5" key={name}>
                                            <div
                                                className={
                                                    'tw-h-10 tw-w-full tw-rounded tw-ring-1 tw-ring-inset tw-ring-black tw-ring-opacity-0 tw-border-line tw-border'
                                                }
                                                style={{ backgroundColor: value }}
                                            />
                                            <div className="tw-block">
                                                <div className="tw-font-medium tw-font-sans tw-text-text">
                                                    {attributes['tailwind-name']}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const BrandTokens: Story = () => {
    const categories = Object.keys(tokens.color);

    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-16">
            {categories.map((category: string) => {
                const palette = getPalette(tokens.color[category]);

                return (
                    <div key={category}>
                        <div className="tw-flex tw-flex-col tw-space-y-3 sm:tw-flex-row tw-text-xs sm:tw-space-y-0 sm:tw-space-x-4">
                            <div className="tw-w-32 tw-shrink-0">
                                <div className="tw-h-10 tw-flex tw-flex-col tw-justify-center">
                                    <div className="tw-text-sm tw-font-semibold tw-text-text">{category}</div>
                                </div>
                            </div>

                            <div className="tw-min-w-0 tw-flex-1 tw-grid tw-grid-cols-10  tw-gap-x-4 tw-gap-y-3 2xl:tw-gap-x-2">
                                {palette.map(({ name, value, attributes }: any) => {
                                    return (
                                        <div className="tw-space-y-1.5" key={name}>
                                            <div
                                                className={
                                                    'tw-h-10 tw-w-full tw-rounded tw-ring-1 tw-ring-inset tw-ring-black tw-ring-opacity-0 tw-border-line tw-border'
                                                }
                                                style={{ backgroundColor: value }}
                                            />
                                            <div className="tw-block">
                                                <div className="tw-font-medium tw-font-sans tw-text-text">
                                                    {attributes.item}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
