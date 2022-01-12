import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

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
                d="M9.4 15H4.6a.1.1 0 0 0-.1.1v4.8a.1.1 0 0 0 .1.1h4.8a.1.1 0 0 0 .1-.1v-4.8a.1.1 0 0 0-.1-.1Zm-4.8-1.5A1.6 1.6 0 0 0 3 15.1v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8a1.6 1.6 0 0 0 1.6-1.6v-4.8a1.6 1.6 0 0 0-1.6-1.6H4.6ZM19.4 15h-4.8a.1.1 0 0 0-.1.1v4.8a.1.1 0 0 0 .1.1h4.8a.1.1 0 0 0 .1-.1v-4.8a.1.1 0 0 0-.1-.1Zm-4.8-1.5a1.6 1.6 0 0 0-1.6 1.6v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8a1.6 1.6 0 0 0 1.6-1.6v-4.8a1.6 1.6 0 0 0-1.6-1.6h-4.8ZM19.4 5h-4.8a.1.1 0 0 0-.1.1v4.8a.1.1 0 0 0 .1.1h4.8a.1.1 0 0 0 .1-.1V5.1a.1.1 0 0 0-.1-.1Zm-4.8-1.5A1.6 1.6 0 0 0 13 5.1v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8A1.6 1.6 0 0 0 21 9.9V5.1a1.6 1.6 0 0 0-1.6-1.6h-4.8ZM9.4 5H4.6a.1.1 0 0 0-.1.1v4.8a.1.1 0 0 0 .1.1h4.8a.1.1 0 0 0 .1-.1V5.1a.1.1 0 0 0-.1-.1ZM4.6 3.5A1.6 1.6 0 0 0 3 5.1v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8A1.6 1.6 0 0 0 11 9.9V5.1a1.6 1.6 0 0 0-1.6-1.6H4.6Z"
            />
        </svg>
    );
}

const Memo = memo(IconLayoutGrid);
export default Memo;
