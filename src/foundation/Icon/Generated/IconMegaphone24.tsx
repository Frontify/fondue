import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMegaphone24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMegaphone24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="m16.076 2.277-4.91 3.237H4.5C3.12 5.514 2 6.621 2 7.987v4.121c0 .868.451 1.63 1.134 2.072l1.734 7.187c.09.371.425.633.81.633h2.155a.83.83 0 0 0 .834-.824V14.58h2.5l4.909 3.237c.273.181.595.277.924.277.92 0 1.667-.738 1.667-1.648V3.649a1.64 1.64 0 0 0-.28-.915 1.678 1.678 0 0 0-2.311-.457ZM7.833 12.933H4.498a.829.829 0 0 1-.831-.825V7.987c0-.455.373-.824.833-.824h3.333v5.77ZM6.337 20.35H7v-5.77H4.945l1.392 5.77ZM9.5 7.163v5.77h2.171L17 16.447V3.649l-5.329 3.514H9.5Z"
                    clipRule="evenodd"
                />
                <path d="M21.167 7.163a.833.833 0 0 0-.834.833v4.103a.833.833 0 1 0 1.667 0V7.996a.833.833 0 0 0-.833-.833Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMegaphone24);
export default Memo;
