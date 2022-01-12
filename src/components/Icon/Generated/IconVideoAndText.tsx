import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconVideoAndText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconVideoAndText"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.861 9.872a.95.95 0 0 1 1.475-.791l3.897 2.585a.95.95 0 0 1 .01 1.576l-3.898 2.663a.95.95 0 0 1-1.486-.784l.002-5.249Zm1.5 1.025L7.36 14.08l2.363-1.615-2.362-1.567ZM22 6.25a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM22 12.25a.75.75 0 0 1-.75.75h-3.486a.75.75 0 0 1 0-1.5h3.486a.75.75 0 0 1 .75.75ZM20.575 9.25a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75ZM20.575 15.25a.75.75 0 0 1-.75.75h-2.061a.75.75 0 0 1 0-1.5h2.061a.75.75 0 0 1 .75.75Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6H4a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 13 6ZM4 4.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2H4Z"
            />
        </svg>
    );
}

const Memo = memo(IconVideoAndText);
export default Memo;
