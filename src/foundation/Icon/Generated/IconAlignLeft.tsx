import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAlignLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAlignLeft"
            {...props}
        >
            <path d="M1.98 3.885c0-.478.39-.865.87-.865s.87.387.87.865v16.27c0 .477-.39.865-.87.865a.867.867 0 0 1-.87-.865V3.885Zm6.04 7.32h13.13c.522 0 .87.345.87.864 0 .52-.348.865-.87.865H8.02l4.608 4.585a.833.833 0 0 1 0 1.21.844.844 0 0 1-1.217 0l-6.087-6.054a.833.833 0 0 1 0-1.211l6.087-6.055a.844.844 0 0 1 1.217 0 .833.833 0 0 1 0 1.211L8.02 11.204Z" />
        </svg>
    );
}

const Memo = memo(IconAlignLeft);
export default Memo;
