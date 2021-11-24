import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

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
                d="M5.861 9.872a.95.95 0 011.475-.791l3.897 2.585a.95.95 0 01.01 1.576l-3.898 2.663a.95.95 0 01-1.486-.784l.002-5.249zm1.5 1.025L7.36 14.08l2.363-1.615-2.362-1.567zM22 6.25a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM22 12.25a.75.75 0 01-.75.75h-3.486a.75.75 0 010-1.5h3.486a.75.75 0 01.75.75zM20.575 9.25a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75zM20.575 15.25a.75.75 0 01-.75.75h-2.061a.75.75 0 010-1.5h2.061a.75.75 0 01.75.75z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6H4a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-12A.5.5 0 0013 6zM4 4.5a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2v-12a2 2 0 00-2-2H4z"
            />
        </svg>
    );
}

const MemoIconVideoAndText = React.memo(IconVideoAndText);
export default MemoIconVideoAndText;
