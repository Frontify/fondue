import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextMultiColumn(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTextMultiColumn"
            {...props}
        >
            <path d="M15 8.25a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5h-5Zm0 3a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5h-4Zm-11-3a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5H4Zm11 6a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5h-5Zm-11 0a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5H4Zm0-3a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5H4Zm0 6a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5H4Zm11 0a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5h-4Z" />
        </svg>
    );
}

const Memo = memo(IconTextMultiColumn);
export default Memo;
