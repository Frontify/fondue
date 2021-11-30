import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSearch(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSearch"
            {...props}
        >
            <path d="M18.246 17.017c.06.036.118.08.172.13l3.26 3.078c.41.386.431 1.035.049 1.45a1.007 1.007 0 0 1-1.434.049l-3.26-3.077a1.024 1.024 0 0 1-.179-.223 9.032 9.032 0 0 1-5.723 2.038C6.088 20.462 2 16.329 2 11.23S6.088 2 11.13 2c5.044 0 9.132 4.133 9.132 9.23 0 2.191-.755 4.204-2.016 5.787ZM11.13 18.41c3.922 0 7.102-3.214 7.102-7.18 0-3.964-3.18-7.179-7.102-7.179s-7.102 3.215-7.102 7.18 3.18 7.18 7.102 7.18Z" />
        </svg>
    );
}

const Memo = memo(IconSearch);
export default Memo;
