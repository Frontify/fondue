import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlayFrame16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlayFrame16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M5.948 7.41v3.512c.027.41.222.74.562.901.146.071.297.102.455.102a.933.933 0 0 0 .6-.209l2.569-1.752c.27-.19.43-.501.43-.824a.99.99 0 0 0-.457-.833l-2.6-1.725a1.011 1.011 0 0 0-1.002-.064c-.356.205-.557.527-.557.892Zm3.566 1.735-2.54-1.686-.001 3.422 2.541-1.736Z" />
                <path d="M2.871 1.8h10.257c.85 0 1.538.689 1.538 1.538v9.231c0 .85-.688 1.539-1.538 1.539H2.87c-.85 0-1.538-.69-1.538-1.539V3.34c0-.85.689-1.539 1.538-1.539ZM2.36 5.39v7.18c0 .282.23.512.512.512h10.257c.283 0 .513-.23.513-.513V5.39H2.359Zm11.28-1.026H2.359V3.338c0-.283.23-.512.512-.512h10.257c.283 0 .513.23.513.512v1.026Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlayFrame16);
export default Memo;
