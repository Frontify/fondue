/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { PatternDesign, PatternScale } from "@foundation/Pattern";
import { FrontifyPatternProps, FrontifyPattern } from "./FrontifyPattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/FrontifyPattern",
    component: FrontifyPattern,
    argTypes: {
        pattern: {
            options: Object.keys(PatternDesign),
            control: { type: "select" },
        },
        scale: {
            options: Object.keys(PatternScale),
            control: { type: "select" },
        },
    },
    decorators: [
        (Story) => (
            <div className="tw-flex tw-justify-center tw-items-center tw-p-10">
                <div className="tw-w-80 tw-h-80 tw-overflow-hidden">
                    <Story />
                </div>
            </div>
        ),
    ],
} as Meta<FrontifyPatternProps>;

export const Default: Story<FrontifyPatternProps> = (args, argTypes) => <FrontifyPattern {...args} {...argTypes} />;
