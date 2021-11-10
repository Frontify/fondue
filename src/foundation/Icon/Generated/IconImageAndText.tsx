import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

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
                d="M22 6.354a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM22 12.354a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM20.575 9.354a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75zM20.575 15.354a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75zM13 6H4a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-12A.5.5 0 0013 6zM4 4.5a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2v-12a2 2 0 00-2-2H4z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.012 15.5a.25.25 0 00.287-.029l2.221-1.936a.75.75 0 01.986 1.13l-2.222 1.937a1.75 1.75 0 01-2.006.207l-4.216-2.367a.25.25 0 00-.254.006l-2.414 1.49a.75.75 0 01-.788-1.276l2.414-1.49a1.75 1.75 0 011.776-.038l4.216 2.367zM9.2 9.5a.8.8 0 101.6 0 .8.8 0 00-1.6 0zm.8-2a2 2 0 100 4 2 2 0 000-4z"
            />
        </svg>
    );
}

const MemoIconImageAndText = React.memo(IconImageAndText);
export default MemoIconImageAndText;
