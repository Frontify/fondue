import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconImageAndText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconImageAndText"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 6.354a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM22 12.354a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM20.575 9.354a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75ZM20.575 15.354a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75ZM13 6H4a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 13 6ZM4 4.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2H4Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.012 15.5a.25.25 0 0 0 .287-.029l2.221-1.936a.75.75 0 0 1 .986 1.13l-2.222 1.937a1.75 1.75 0 0 1-2.006.207l-4.216-2.367a.25.25 0 0 0-.254.006l-2.414 1.49a.75.75 0 0 1-.788-1.276l2.414-1.49a1.75 1.75 0 0 1 1.776-.038l4.216 2.367ZM9.2 9.5a.8.8 0 1 0 1.6 0 .8.8 0 0 0-1.6 0Zm.8-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
            />
        </svg>
    );
}

const Memo = memo(IconImageAndText);
export default Memo;
