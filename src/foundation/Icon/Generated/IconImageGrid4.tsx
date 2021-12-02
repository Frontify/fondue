import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageGrid4(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconImageGrid4"
            {...props}
        >
            <path d="M4.472 11.231a.74.74 0 1 0 0 1.482.74.74 0 0 0 0-1.482Zm0-1.481a2.222 2.222 0 1 1 0 4.444 2.222 2.222 0 0 1 0-4.444Zm5.185 1.481a.74.74 0 1 0 0 1.482.74.74 0 0 0 0-1.482Zm0-1.481a2.222 2.222 0 1 1 0 4.444 2.222 2.222 0 0 1 0-4.444Zm5.186 1.481a.74.74 0 1 0 0 1.482.74.74 0 0 0 0-1.482Zm0-1.481a2.222 2.222 0 1 1 0 4.444 2.222 2.222 0 0 1 0-4.444Zm5.185 1.481a.74.74 0 1 0 0 1.482.74.74 0 0 0 0-1.482Zm0-1.481a2.222 2.222 0 1 1 0 4.444 2.222 2.222 0 0 1 0-4.444Z" />
        </svg>
    );
}

const Memo = memo(IconImageGrid4);
export default Memo;
