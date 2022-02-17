import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRightCaret(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconRightCaret"
            {...props}
        >
            <path fill="currentColor" d="M7.69 4.22a.75.75 0 011.06 0L16 11.47l.53.53-.53.53-7.25 7.25a.75.75 0 01-1.06-1.06L14.41 12 7.69 5.28a.75.75 0 010-1.06Z" />
        </svg>
    );
}

const Memo = memo(IconRightCaret);
export default Memo;
