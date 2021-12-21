/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { LinkChooser as LinkChooserComponent } from "./LinkChooser";
import { EXAMPLE_DATA, EXAMPLE_TEMPLATES } from "./mock-data";
import { LinkChooserProps } from "./types";
import { getMockData } from "./utils/helpers";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Link Chooser",
    component: LinkChooserComponent,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
    },
    argTypes: {
        onLinkChange: { action: "onClick" },
    },
} as Meta<LinkChooserProps>;

export const LinkChooser: Story<LinkChooserProps> = (args: LinkChooserProps) => {
    const [openInNewTab, setOpenInNewTab] = useState<boolean>(false);

    return (
        <LinkChooserComponent
            {...args}
            getGlobalByQuery={(query) => getMockData(query, EXAMPLE_DATA)}
            getTemplatesByQuery={(query) => getMockData(query, EXAMPLE_TEMPLATES)}
            openInNewTab={openInNewTab}
            onOpenInNewTabChange={setOpenInNewTab}
        />
    );
};
