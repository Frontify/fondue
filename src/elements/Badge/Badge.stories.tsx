import { ReactComponent as Icons } from "@elements/Icon/Svg/Icons.svg";
import { Meta, Story } from "@storybook/react";
import Badge, { BadgeProps, BadgeStatus } from "./Badge";

export default {
    title: "Elements/Badge",
    component: Badge,
} as Meta<BadgeProps>;

const BadgeTemplate: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = BadgeTemplate.bind({});
Default.args = {
    children: "Label",
};

Default.storyName = "Text Label Only";

export const WithStatus = BadgeTemplate.bind({});

WithStatus.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: "select" },
    },
};

WithStatus.args = {
    status: BadgeStatus.Positive,
    children: "Label",
};

WithStatus.storyName = "Status and Text Label";

export const WithIcon = BadgeTemplate.bind({});

WithIcon.argTypes = {
    icon: {
        table: { disable: true },
    },
};

WithIcon.args = {
    icon: <Icons />,
    children: "Label",
};

WithIcon.storyName = "Icon and Text Label";

export const WithStatusAndIcon = BadgeTemplate.bind({});

WithStatusAndIcon.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: "select" },
    },
    icon: {
        table: { disable: true },
    },
};

WithStatusAndIcon.args = {
    status: BadgeStatus.Positive,
    icon: <Icons />,
    children: "Label",
};

WithStatusAndIcon.storyName = "Staus, Icon and Text Label";

export const StatusOnly = BadgeTemplate.bind({});

StatusOnly.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: "select" },
    },
};

StatusOnly.args = {
    status: BadgeStatus.Positive,
};

export const IconOnly = BadgeTemplate.bind({});

IconOnly.argTypes = {
    icon: {
        table: { disable: true },
    },
};

IconOnly.args = {
    icon: <Icons />,
};

export const BetweenElements: Story<BadgeProps> = (args) => (
    <div>
        <span>before </span>
        <Badge {...args} />
        <span> after</span>
    </div>
);

BetweenElements.argTypes = {
    status: {
        options: Object.values(BadgeStatus),
        control: { type: "select" },
    },
    icon: {
        table: { disable: true },
    },
};

BetweenElements.args = {
    status: BadgeStatus.Positive,
    icon: <Icons />,
    children: "Label",
};
