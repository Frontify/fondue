import { Meta, Story } from "@storybook/react";
import ImageComponent, { ImageProps } from "./Image";

export default {
    title: "Components/Image",
    component: ImageComponent,
    args: {
        src: "https://picsum.photos/seed/frontify/200/300",
        alt: "Your alt text.",
        roundedCorners: false,
        children: "Image children",
    } as ImageProps,
    argTypes: {
        onReplaceImage: {
            table: { disable: true },
            action: "onReplaceImage",
        },
        onOpenSettings: {
            table: { disable: true },
            action: "onOpenSettings",
        },
        onDeleteImage: {
            table: { disable: true },
            action: "onDeleteImage",
        },
    },
} as Meta;

export const Image: Story<ImageProps> = (args) => <ImageComponent {...args} />;
