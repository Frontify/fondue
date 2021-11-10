import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayoutGrid(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLayoutGrid"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.4 15H4.6a.1.1 0 00-.1.1v4.8a.1.1 0 00.1.1h4.8a.1.1 0 00.1-.1v-4.8a.1.1 0 00-.1-.1zm-4.8-1.5A1.6 1.6 0 003 15.1v4.8a1.6 1.6 0 001.6 1.6h4.8a1.6 1.6 0 001.6-1.6v-4.8a1.6 1.6 0 00-1.6-1.6H4.6zM19.4 15h-4.8a.1.1 0 00-.1.1v4.8a.1.1 0 00.1.1h4.8a.1.1 0 00.1-.1v-4.8a.1.1 0 00-.1-.1zm-4.8-1.5a1.6 1.6 0 00-1.6 1.6v4.8a1.6 1.6 0 001.6 1.6h4.8a1.6 1.6 0 001.6-1.6v-4.8a1.6 1.6 0 00-1.6-1.6h-4.8zM19.4 5h-4.8a.1.1 0 00-.1.1v4.8a.1.1 0 00.1.1h4.8a.1.1 0 00.1-.1V5.1a.1.1 0 00-.1-.1zm-4.8-1.5A1.6 1.6 0 0013 5.1v4.8a1.6 1.6 0 001.6 1.6h4.8A1.6 1.6 0 0021 9.9V5.1a1.6 1.6 0 00-1.6-1.6h-4.8zM9.4 5H4.6a.1.1 0 00-.1.1v4.8a.1.1 0 00.1.1h4.8a.1.1 0 00.1-.1V5.1a.1.1 0 00-.1-.1zM4.6 3.5A1.6 1.6 0 003 5.1v4.8a1.6 1.6 0 001.6 1.6h4.8A1.6 1.6 0 0011 9.9V5.1a1.6 1.6 0 00-1.6-1.6H4.6z"
            />
        </svg>
    );
}

const MemoIconLayoutGrid = React.memo(IconLayoutGrid);
export default MemoIconLayoutGrid;
