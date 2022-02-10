import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImage32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconImage32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.568 4.879c-.6.586-.901 1.293-.901 2.121v18c0 .828.3 1.535.901 2.121A3.005 3.005 0 0 0 5.745 28h20.51c.85 0 1.576-.293 2.177-.879.6-.586.901-1.293.901-2.121V7c0-.828-.3-1.535-.901-2.121A3.004 3.004 0 0 0 26.256 4H5.745c-.85 0-1.575.293-2.177.879ZM27.29 17.547V7.984c0-.546-.2-1.015-.601-1.406a1.997 1.997 0 0 0-1.443-.586H6.755c-.561 0-1.042.196-1.443.586-.4.39-.601.86-.601 1.406V18.32l7.358-3.375 9.017 5.977 6.204-3.375Zm0 2.062-6.469 3.328-8.752-5.93-7.358 3.259v3.75c0 .547.2 1.015.6 1.406.402.39.883.586 1.444.586h18.49c.562 0 1.043-.195 1.444-.586.4-.39.6-.86.6-1.406v-4.407ZM21.134 16c-1.138 0-2.108-.39-2.91-1.172-.801-.781-1.202-1.726-1.202-2.836 0-1.094.4-2.031 1.202-2.812.802-.782 1.772-1.172 2.91-1.172 1.138 0 2.108.39 2.91 1.172.8.78 1.202 1.718 1.202 2.812 0 1.11-.401 2.055-1.203 2.836-.801.781-1.771 1.172-2.91 1.172Zm1.442-2.578c-.4.39-.881.586-1.442.586a1.993 1.993 0 0 1-1.443-.586 1.92 1.92 0 0 1-.601-1.43c0-.547.2-1.015.601-1.406.4-.39.882-.586 1.443-.586.56 0 1.042.195 1.442.586.401.39.602.86.602 1.406 0 .563-.2 1.04-.602 1.43Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconImage32);
export default Memo;
