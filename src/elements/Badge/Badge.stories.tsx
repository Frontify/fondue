import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconDocument } from "@elements/Icon/Svg/Document.svg";
import { Meta, Story } from "@storybook/react";
import { Style } from "@utilities/enum";
import BadgeComponent, { BadgeProps } from "./Badge";

export default {
    title: "Elements/Badge",
    component: BadgeComponent,
    argTypes: {
        status: {
            options: ["", Style.Success, Style.Progress, Style.Warning, Style.Danger],
            control: { type: "select" },
        },
        icon: {
            control: { type: "boolean" },
        },
    },
    args: {
        children: "Badge",
        status: Style.Success,
        icon: <IconDocument size={IconSize.Size16} />,
    },
} as Meta<BadgeProps>;

export const Badge: Story<BadgeProps> = (args) => {
    const icon = args.icon ? <IconDocument size={IconSize.Size12} /> : undefined;
    return <BadgeComponent {...args} icon={icon} />;
};
