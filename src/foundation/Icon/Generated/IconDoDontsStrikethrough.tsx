import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoDontsStrikethrough(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const { size } = props;
    const style =
        typeof size === "string"
            ? {
                  width: size,
                  height: size,
              }
            : {
                  width: IconSizeMap[size || IconSize.Size16],
                  height: IconSizeMap[size || IconSize.Size16],
              };
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconDoDontsStrikethrough"
            {...props}
        >
            <path d="M20.167 5.117L4.333 18.79V6.95c0-1.013.821-1.833 1.834-1.833h14zm-2.334 13.666h-14L19.667 5.11V16.95c0 1.013-.821 1.833-1.834 1.833zm1.192-12.887l-.465-.259a1.489 1.489 0 00-.727-.187H6.167a1.5 1.5 0 00-1.5 1.5v10c0 .197.037.386.109.563l.199.491.465.259c.22.122.467.187.727.187h11.666a1.5 1.5 0 001.5-1.5v-10c0-.197-.037-.386-.109-.563l-.199-.491z" />
        </svg>
    );
}

const MemoIconDoDontsStrikethrough = React.memo(IconDoDontsStrikethrough);
export default MemoIconDoDontsStrikethrough;
