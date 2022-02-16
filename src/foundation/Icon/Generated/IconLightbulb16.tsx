import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLightbulb16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLightbulb16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3.767 5.667a4.233 4.233 0 1 1 6.8 3.366V10a1.9 1.9 0 0 1-1.9 1.9H7.333a1.9 1.9 0 0 1-1.9-1.9v-.967a4.228 4.228 0 0 1-1.666-3.366ZM6.567 10c0 .423.343.767.766.767h1.334A.767.767 0 0 0 9.433 10V8.433l.257-.167a3.1 3.1 0 1 0-3.381 0l.258.167V10Z"
                    clipRule="evenodd"
                />
                <path d="M9.9 13.333a.567.567 0 0 1-.567.567H6.667a.567.567 0 0 1 0-1.133h2.666c.313 0 .567.253.567.566Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLightbulb16);
export default Memo;
