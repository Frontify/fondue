/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Card, CardProps } from "./Card";
import { Slider } from "@components/Slider/Slider";
import { Divider } from "@components/Divider/Divider";

export default {
    title: "Components/Card",
    component: Card,
} as Meta<CardProps>;

type Texts = {
    [key: string]: string;
};

const data = [
    {
        id: "1",
        title: "First",
        content:
            "Macaroon liquorice pie pastry topping muffin carrot cake donut. Cotton candy jujubes candy chocolate pie marshmallow toffee marzipan. Gingerbread tiramisu gingerbread danish jujubes. Tiramisu cupcake chocolate cake biscuit pastry candy canes. Bonbon biscuit liquorice danish pastry lollipop.",
    },
    {
        id: "2",
        title: "Second",
        content:
            "Danish bonbon cookie sweet lemon drops candy canes pastry. Cake ice cream soufflé ice cream gummi bears. Jelly shortbread cake croissant sweet roll tart biscuit wafer dessert. Jujubes tart gummi bears apple pie marshmallow candy. Pie tootsie roll pudding lollipop cake oat cake apple pie.",
    },
    {
        id: "3",
        title: "Third",
        content:
            "Sugar plum chocolate cake danish donut jelly beans pastry chocolate cake cookie chupa chups. Sweet roll sugar plum danish cake cotton candy sweet roll tootsie roll. Sweet roll cake chocolate cake muffin jujubes. Macaroon carrot cake marshmallow apple pie oat cake icing. Dragée candy canes biscuit pastry muffin.",
    },
];

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: "Children",
};

const ChildComponent = () => {
    const items = data.map((item) => ({ id: item.id, value: item.title }));
    const texts: Texts = data.reduce((previousValue, item) => {
        return {
            ...previousValue,
            [item.id]: item.content,
        };
    }, {});

    const [activeItemId, setActiveItemId] = useState(items[0].id);

    return (
        <>
            <div className="tw-px-4 tw-pt-4">
                <div className="tw-w-64">
                    <Slider activeItemId={activeItemId} items={items} onChange={setActiveItemId} />
                </div>
            </div>
            <Divider color="#EAEBEB" />
            <div className="tw-px-4 tw-pb-4 tw-text-s tw-text-black-80">{texts[activeItemId]}</div>
        </>
    );
};

export const WithSeparator = Template.bind({});

WithSeparator.args = {
    children: <ChildComponent />,
};

const childItems = data.map((item) => ({
    children: (
        <div className="tw-p-4">
            <div className="tw-text-l tw-pb-2">{item.title}</div>
            <div className="tw-text-s tw-text-black-80">{item.content}</div>
        </div>
    ),
}));

export const MultipleCards: Story<CardProps> = () => (
    <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        {childItems.map((item, id) => (
            <Card key={id} {...item} />
        ))}
    </div>
);
