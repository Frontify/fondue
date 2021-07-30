import { CheckboxSelectionState } from "@elements/Checkbox/Checkbox";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SidebarComponent, { SidebarItemType, SidebarProps } from "./Sidebar";

export default {
    title: "Components/Sidebar",
    component: SidebarComponent,
    args: {
        items: [
            {
                id: "group",
                group: "Group Title",
            },
            {
                id: "Default",
                label: "Default Label",
                type: SidebarItemType.Default,
                selected: false,
                onClick: action("onClick"),
            },
            {
                id: "Checkbox",
                label: "Checkbox Label",
                type: SidebarItemType.Checkbox,
                value: CheckboxSelectionState.Selected,
                onChange: action("onChange"),
            },
            {
                id: "Link",
                label: "Link Label",
                type: SidebarItemType.Link,
                link: "string",
            },
            {
                id: "Search",
                type: SidebarItemType.Search,
                value: "Search Value",
                onInput: action("onInput"),
            },
        ],
    } as SidebarProps,
    argTypes: {
        onClick: {
            table: { disable: true },
            action: "onClick",
        },
        onChange: {
            table: { disable: true },
            action: "onClick",
        },
        onInput: {
            table: { disable: true },
            action: "onClick",
        },
    },
} as Meta;

export const Sidebar: Story<SidebarProps> = (args) => <SidebarComponent {...args} />;
