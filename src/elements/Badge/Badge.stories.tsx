import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import Badge, { BadgeProps, Status, Style } from "./Badge";

export default {
    title: "Elements/Badge",
    component: Badge,
    argTypes: {
        style: {
            options: Object.values(Style),
            control: { type: "select" },
        },
    },
} as Meta<BadgeProps>;

const BadgeTemplate: Story<BadgeProps> = (args) => <Badge {...args} />;

export const LabelOnly = BadgeTemplate.bind({});

LabelOnly.args = {
    children: "Label",
};

export const WithOnClick = BadgeTemplate.bind({});

WithOnClick.argTypes = {
    onClick: {
        action: "Click",
    },
};

WithOnClick.args = {
    children: "Label",
};

export const WithOnDismiss = BadgeTemplate.bind({});

WithOnDismiss.argTypes = {
    onDismiss: {
        action: "Dismiss",
    },
};

WithOnDismiss.args = {
    children: "Label",
};

export const WithOnClickAndDismiss = BadgeTemplate.bind({});

WithOnClickAndDismiss.argTypes = {
    onDismiss: {
        action: "Dismiss",
    },
    onClick: {
        action: "Click",
    },
};

WithOnClickAndDismiss.args = {
    children: "Label",
};

export const WithStatus = BadgeTemplate.bind({});

WithStatus.argTypes = {
    status: {
        options: Object.values(Status),
        control: { type: "select" },
    },
};

WithStatus.args = {
    status: Status.Positive,
    children: "Label",
};

export const WithIcon = BadgeTemplate.bind({});

WithIcon.argTypes = {
    icon: {
        table: { disable: true },
    },
};

WithIcon.args = {
    icon: <IconIcons />,
    children: "Label",
};

export const WithOnClickAndIcon = BadgeTemplate.bind({});

WithOnClickAndIcon.argTypes = {
    onClick: {
        action: "Click",
    },
    icon: {
        table: { disable: true },
    },
};

WithOnClickAndIcon.args = {
    icon: <IconIcons />,
    children: "Label",
};

export const WithStatusAndIcon = BadgeTemplate.bind({});

WithStatusAndIcon.argTypes = {
    status: {
        options: Object.values(Status),
        control: { type: "select" },
    },
    icon: {
        table: { disable: true },
    },
};

WithStatusAndIcon.args = {
    status: Status.Positive,
    icon: <IconIcons />,
    children: "Label",
};

export const StatusOnly = BadgeTemplate.bind({});

StatusOnly.argTypes = {
    status: {
        options: Object.values(Status),
        control: { type: "select" },
    },
};

StatusOnly.args = {
    status: Status.Positive,
};

export const IconOnly = BadgeTemplate.bind({});

IconOnly.argTypes = {
    icon: {
        table: { disable: true },
    },
};

IconOnly.args = {
    icon: <IconIcons />,
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
        options: Object.values(Status),
        control: { type: "select" },
    },
    icon: {
        table: { disable: true },
    },
};

BetweenElements.args = {
    status: Status.Positive,
    icon: <IconIcons />,
    children: "Label",
};
