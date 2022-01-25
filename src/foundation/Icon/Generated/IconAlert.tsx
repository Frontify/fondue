import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAlert(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 12 13"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAlert"
            {...props}
        >
            <mask
                id="prefix__a"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                width={12}
                height={13}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.704 9.147 7.4 3.311c-.355-.626-.852-.971-1.4-.971-.55 0-1.047.345-1.402.971L1.296 9.147c-.352.624-.392 1.231-.11 1.71.282.479.834.742 1.554.742h6.52c.72 0 1.272-.263 1.554-.742.282-.478.242-1.086-.11-1.71Zm-5.26-4.03a.556.556 0 0 1 1.112 0c0 .011-.002.022-.003.032l-.002.015h.003l-.222 2.691h-.001A.333.333 0 0 1 6 8.161a.333.333 0 0 1-.33-.306h-.002l-.222-2.69h.003l-.002-.018a.22.22 0 0 1-.003-.03Zm1.297 4.26a.74.74 0 1 1-1.482 0 .74.74 0 0 1 1.482 0Zm2.543 1.481c.433 0 .76-.133.897-.365.136-.233.093-.581-.119-.956L6.736 3.666c-.21-.372-.479-.585-.736-.585s-.525.213-.736.585L1.937 9.537c-.211.375-.255.723-.117.956.137.232.464.365.896.365h6.568Z"
                />
            </mask>
            <g mask="url(#prefix__a)">
                <path fill="currentColor" d="M0 .84h12v12H0z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconAlert);
export default Memo;
