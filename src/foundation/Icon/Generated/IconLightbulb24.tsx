import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLightbulb24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLightbulb24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M5.65 8.5a6.35 6.35 0 1 1 10.2 5.05V15A2.85 2.85 0 0 1 13 17.85h-2A2.85 2.85 0 0 1 8.15 15v-1.45a6.342 6.342 0 0 1-2.5-5.05Zm4.2 6.5c0 .635.515 1.15 1.15 1.15h2A1.15 1.15 0 0 0 14.15 15v-2.35l.386-.252a4.65 4.65 0 1 0-5.072 0l.386.252V15Z"
                    clipRule="evenodd"
                />
                <path d="M14.85 20c0 .47-.38.85-.85.85h-4a.85.85 0 0 1 0-1.7h4c.47 0 .85.38.85.85Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLightbulb24);
export default Memo;
