import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconSpeaker24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSpeaker24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M14 4.227a1 1 0 0 0-1.664-.748L7.249 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.25l5.086 4.52A1 1 0 0 0 14 19.773V4.227ZM5 9.5h2.82l4.68-4.16v13.32L7.82 14.5H5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Z"
                    clipRule="evenodd"
                />
                <path d="M16.538 6.59c1.82 1.424 2.712 3.207 2.712 5.41 0 2.203-.892 3.986-2.712 5.41a.75.75 0 1 0 .924 1.18c2.18-1.703 3.288-3.92 3.288-6.59s-1.108-4.887-3.288-6.59a.75.75 0 0 0-.924 1.18Z" />
                <path d="M16.25 12c0-1.03-.277-1.859-.827-2.52a.75.75 0 1 1 1.154-.96c.783.943 1.173 2.113 1.173 3.48s-.39 2.537-1.173 3.48a.75.75 0 1 1-1.154-.96c.55-.661.827-1.49.827-2.52Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeaker24);
export default Memo;
