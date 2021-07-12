/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as Audio } from "@components/Icon/Svg/Audio.svg";
import { Meta, Story } from "@storybook/react";
import Dropdown, { DropdownProps } from "./Dropdown";

export default {
    title: "Dropdown",
    component: Dropdown,
} as Meta;

const DropdownTemplate: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = DropdownTemplate.bind({});

Default.args = {
    placeholder: "select item",
    menuItems: [
        [
            {
                id: "b",
                title: "Small icon",
                icon: <Audio size={IconSize.Size16} />,
            },
            {
                id: "b",
                title: "Small icon warning",
                icon: <Audio size={IconSize.Size16} />,
                warning: true,
            },
            {
                id: "b",
                title: "Small icon disabled",
                icon: <Audio size={IconSize.Size16} />,
                disabled: true,
            },
            {
                id: "b",
                title: "Small icon warning disabled",
                icon: <Audio size={IconSize.Size16} />,
                warning: true,
                disabled: true,
            },
        ],
        [
            {
                id: "b",
                title: "Large icon",
                subtitle: "Subtitle",
                icon: <Audio size={IconSize.Size16} />,
            },
            {
                id: "b",
                title: "Large icon warning",
                subtitle: "Subtitle",
                icon: <Audio size={IconSize.Size16} />,
                warning: true,
            },
            {
                id: "b",
                title: "Large icon disabled",
                subtitle: "Subtitle",
                icon: <Audio size={IconSize.Size16} />,
                disabled: true,
            },
            {
                id: "b",
                title: "Large icon warning disabled",
                subtitle: "Subtitle",
                icon: <Audio size={IconSize.Size16} />,
                warning: true,
                disabled: true,
            },
        ],
        [
            {
                id: "b",
                title: "Small",
            },
            {
                id: "b",
                title: "Small warning",
                warning: true,
            },
            {
                id: "b",
                title: "Small disabled",
                disabled: true,
            },
            {
                id: "b",
                title: "Small warning disabled",
                warning: true,
                disabled: true,
            },
        ],
        [
            {
                id: "a",
                title: "Large",
                subtitle: "Subtitle",
            },
            {
                id: "a",
                title: "Large warning",
                subtitle: "Subtitle",
                warning: true,
            },
            {
                id: "a",
                title: "Large disabled",
                subtitle: "Subtitle",
                disabled: true,
            },
            {
                id: "a",
                title: "Large warning disabled",
                subtitle: "Subtitle",
                warning: true,
                disabled: true,
            },
        ],
    ],
};
