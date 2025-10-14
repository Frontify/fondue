/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import fuzzysort from 'fuzzysort';
import { kebabCase } from 'lodash-es';
import { type FormEvent } from 'react';
import { useArgs } from 'storybook/preview-api';

import * as FondueIcons from './icons';

type Story = StoryObj<{ iconName: string }>;
const meta: Meta = {
    title: 'Icons',
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        iconName: '',
    },
};
export default meta;

const tooltipStyle =
    'before:tw-content-[attr(data-tooltip-text)] before:tw-absolute before:tw-opacity-0 before:tw-left-2/4 before:-tw-translate-x-2/4 before:tw-top-full before:-tw-mt-1 before:tw-px-2 before:tw-py-1 before:tw-whitespace-nowrap before:tw-text-xs before:tw-rounded before:tw-text-center hover:before:tw-block focus-within:before:tw-block before:tw-bg-box-neutral-inverse before:tw-z-10 before:tw-text-white hover:before:tw-opacity-100 focus-within:before:tw-opacity-100 before:tw-transition-opacity motion-reduce:before:tw-transition-none';

export const Default: Story = {
    name: 'Icons',
    render: () => {
        const [{ iconName }, updateArgs] = useArgs<{ iconName: string }>();

        const handleSearchInput = (event: FormEvent) => {
            updateArgs({ iconName: (event.target as HTMLInputElement).value });
        };

        const iconsListSource: string[] =
            iconName !== ''
                ? fuzzysort.go(iconName, Object.keys(FondueIcons)).map((elem) => elem.target)
                : Object.keys(FondueIcons).toSorted();

        return (
            <div className="tw-p-8">
                <div className="tw-flex tw-gap-6 tw-items-center">
                    <h1 className="tw-text-2xl tw-font-bold">Fondue Icons</h1>

                    <input
                        type="search"
                        placeholder="Search Icon"
                        className="tw-p-2 tw-rounded tw-border tw-border-box-neutral tw-w-96 tw-text-sm"
                        defaultValue={iconName}
                        onInput={handleSearchInput}
                    />
                </div>

                <div className="tw-mt-8 tw-gap-4 tw-grid tw-grid-cols-[repeat(auto-fill,minmax(56px,1fr))]">
                    {iconsListSource.map((icon) => {
                        const FondueIconComponent = FondueIcons[icon as keyof typeof FondueIcons];
                        const iconPath = kebabCase(icon).replace(/^icon-/, '');

                        return (
                            <button
                                type="button"
                                key={icon}
                                data-tooltip-text={iconPath}
                                onClick={() => updateArgs({ iconName: icon })}
                                className={[
                                    'tw-relative tw-inline-flex tw-items-center tw-justify-center tw-aspect-square tw-rounded tw-bg-box-neutral hover:tw-bg-box-neutral-hover active:tw-bg-box-neutral-pressed tw-transition-colors motion-reduce:tw-transition-none',
                                    tooltipStyle,
                                ].join(' ')}
                            >
                                <FondueIconComponent />
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    },
};
