/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import CardComponent, { CardProps } from "./Card";

export default {
    title: "Components/Card",
    component: CardComponent,
    args: {
        children: "Children",
        cover: "https://picsum.photos/seed/frontify/600/200",
        dropdown: "dropdown",
        icon: "https://dev.frontify.test/img/authorize/companion.svg",
        link: "link",
    },
} as Meta<CardProps>;

export const Card: Story<CardProps> = (args) => <CardComponent {...args} />;
