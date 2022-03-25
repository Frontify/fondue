/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItem } from "@components/MenuItem/MenuItem";
import IconAudio from "@foundation/Icon/Generated/IconAudio";
import { Item, Section } from "@react-stately/collections";
import { Meta, Story } from "@storybook/react";
import React, { Key, useState } from "react";
import { ComboBoxProps, SearchResult } from "../types";
import { ComboBox as ComboBoxComponent } from "./ComboBox";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Link Chooser/Combobox",
    component: ComboBoxComponent,
} as Meta<ComboBoxProps>;

const EXAMPLE_ITEMS = [
    {
        id: "block1",
        name: "First section",
        items: [
            {
                id: 1,
                title: "Item 1",
                decorator: <IconAudio />,
            },
            {
                id: 2,
                title: "Item 2",
                decorator: <IconAudio />,
            },
        ],
    },
    {
        id: "block2",
        name: "Second section",
        items: [
            {
                id: 3,
                title: "Item 3",
                decorator: <IconAudio />,
            },
            {
                id: 4,
                title: "Item 4",
                decorator: <IconAudio />,
            },
        ],
    },
];

const findItemByKey = (key: Key) =>
    EXAMPLE_ITEMS.flatMap(({ items }) => items).find(({ id }) => id.toString() === key.toString());

export const Combobox: Story<ComboBoxProps> = () => {
    const [majorId, setMajorId] = useState<Key | undefined>(undefined);
    const [inputValue, setInputValue] = useState("");

    const onInputChange = (value: string) => setInputValue(value);
    const onClear = () => {
        setMajorId(undefined);
        setInputValue("");
    };
    const onSelectionChange = (key: Key | undefined) => {
        if (key) {
            setMajorId(key);
            setInputValue(findItemByKey(key)?.title || "");
        }
    };

    return (
        <ComboBoxComponent
            inputValue={inputValue}
            onInputChange={onInputChange}
            selectedKey={majorId}
            onSelectionChange={onSelectionChange}
            defaultItems={EXAMPLE_ITEMS}
            aria-label="Link Chooser Combobox"
            onClear={onClear}
        >
            {({ name, items }) => (
                <Section key={name} title={name} items={items}>
                    {(item: SearchResult) => (
                        <Item key={item.id} textValue={item.title}>
                            <MenuItem {...item} />
                        </Item>
                    )}
                </Section>
            )}
        </ComboBoxComponent>
    );
};
