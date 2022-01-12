import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDoDontsStrikethrough(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDoDontsStrikethrough"
            {...props}
        >
            <path d="M20.167 5.117 4.333 18.79V6.95c0-1.013.821-1.833 1.834-1.833h14Zm-2.334 13.666h-14L19.667 5.11V16.95c0 1.013-.821 1.833-1.834 1.833Zm1.192-12.887-.465-.259a1.489 1.489 0 0 0-.727-.187H6.167a1.5 1.5 0 0 0-1.5 1.5v10c0 .197.037.386.109.563l.199.491.465.259c.22.122.467.187.727.187h11.666a1.5 1.5 0 0 0 1.5-1.5v-10c0-.197-.037-.386-.109-.563l-.199-.491Z" />
        </svg>
    );
}

const Memo = memo(IconDoDontsStrikethrough);
export default Memo;
