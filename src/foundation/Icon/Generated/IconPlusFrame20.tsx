import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlusFrame20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlusFrame20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.757 13.697a.758.758 0 1 1-1.515 0v-1.515H7.727a.758.758 0 0 1 0-1.515h1.515V9.15a.758.758 0 0 1 1.515 0v1.516h1.516a.758.758 0 0 1 0 1.515h-1.516v1.515Z" />
                <path
                    fillRule="evenodd"
                    d="M3.59 2.333h12.82c1.062 0 1.923.861 1.923 1.923v11.539a1.923 1.923 0 0 1-1.923 1.923H3.59a1.923 1.923 0 0 1-1.923-1.923V4.256c0-1.062.86-1.923 1.923-1.923ZM2.949 6.82v8.975c0 .354.287.64.64.64H16.41a.641.641 0 0 0 .641-.64V6.82H2.95ZM17.05 5.538H2.95V4.256a.64.64 0 0 1 .64-.64h12.82a.64.64 0 0 1 .641.64v1.282Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusFrame20);
export default Memo;
