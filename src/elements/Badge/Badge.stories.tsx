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
        onClick: { table: { disable: true } },
        onDismiss: { table: { disable: true } },
    },
    args: {
        style: Style.Primary,
        children: "Text",
    },
} as Meta<BadgeProps>;

const BadgeTemplate: Story<BadgeProps> = (args) => <Badge {...args} />;

export const LabelOnly = BadgeTemplate.bind({});

export const WithOnClick = BadgeTemplate.bind({});

WithOnClick.argTypes = {
    onClick: { action: "Click" },
};

export const WithDismiss = BadgeTemplate.bind({});

WithDismiss.argTypes = {
    onDismiss: { action: "Dismiss" },
};

export const WithOnClickAndDismiss = BadgeTemplate.bind({});

WithOnClickAndDismiss.argTypes = {
    onDismiss: { action: "Dismiss" },
    onClick: { action: "Click" },
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
};

export const WithIcon = BadgeTemplate.bind({});

WithIcon.argTypes = {
    icon: { table: { disable: true } },
};

WithIcon.args = {
    icon: <IconIcons />,
};

export const WithOnClickAndIcon = BadgeTemplate.bind({});

WithOnClickAndIcon.argTypes = {
    onClick: { action: "Click" },
    icon: { table: { disable: true } },
};

WithOnClickAndIcon.args = {
    icon: <IconIcons />,
};

export const WithStatusAndIcon = BadgeTemplate.bind({});

WithStatusAndIcon.argTypes = {
    status: {
        options: Object.values(Status),
        control: { type: "select" },
    },
    icon: { table: { disable: true } },
};

WithStatusAndIcon.args = {
    status: Status.Positive,
    icon: <IconIcons />,
};

export const StatusOnly = BadgeTemplate.bind({});

StatusOnly.argTypes = {
    status: {
        options: Object.values(Status),
        control: { type: "select" },
    },
    children: { table: { disable: true } },
};

StatusOnly.args = {
    status: Status.Positive,
    children: "",
};

export const IconOnly = BadgeTemplate.bind({});

IconOnly.argTypes = {
    icon: { table: { disable: true } },
    children: { table: { disable: true } },
};

IconOnly.args = {
    icon: <IconIcons />,
    children: "",
};

export const BetweenElements: Story<BadgeProps> = (args) => (
    <div className="flex items-center gap-1">
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
    icon: { table: { disable: true } },
};

BetweenElements.args = {
    status: Status.Positive,
    icon: <IconIcons />,
};
