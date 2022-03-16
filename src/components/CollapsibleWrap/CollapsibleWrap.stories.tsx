/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from "@components/Button/Button";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { CollapsibleWrapProps } from "./types";
import { CollapsibleWrap as CollapsibleWrapComponent } from "./CollapsibleWrap";
import { Text } from "@typography/Text";
import { Heading } from "@typography/Heading";
import { Card } from "@components/Card";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Collapsible Wrap",
    component: CollapsibleWrapComponent,
} as Meta<CollapsibleWrapProps>;

export const CollapsibleWrap: Story<CollapsibleWrapProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card>
            <div className="tw-divide-y tw-divide-black-10">
                <div className="tw-p-3">
                    <Heading>Collapsible Wrap</Heading>
                </div>
                <CollapsibleWrapComponent isOpen={isOpen}>
                    <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                        <Text>I am the child content of the Collapsible Wrap Component.</Text>
                        <Text>Click the button below to hide me.</Text>
                    </div>
                </CollapsibleWrapComponent>
                <div className="tw-p-3">
                    <Button onClick={() => setIsOpen((open) => !open)}>Click To Toggle Open</Button>
                </div>
            </div>
        </Card>
    );
};
