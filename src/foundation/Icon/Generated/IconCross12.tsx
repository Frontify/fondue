import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconCross12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCross12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3.171 2.464a.5.5 0 1 0-.707.708L5.293 6 2.464 8.828a.5.5 0 1 0 .707.708L6 6.707l2.828 2.829a.5.5 0 1 0 .707-.708L6.707 6l2.828-2.828a.5.5 0 0 0-.707-.708L6 5.293 3.17 2.464Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconCross12);
export default Memo;
