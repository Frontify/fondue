import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEyeOff16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconEyeOff16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M2.815 13.185a.5.5 0 0 1 0-.707l9.664-9.664a.5.5 0 1 1 .707.708l-.802.801a7.95 7.95 0 0 1 2.767 3.192c.146.307.146.663 0 .97A7.917 7.917 0 0 1 8 13a7.885 7.885 0 0 1-3.487-.807l-.992.992a.5.5 0 0 1-.707 0Zm7.391-6.684 1.455-1.454a6.95 6.95 0 0 1 2.326 2.402 1.1 1.1 0 0 1 0 1.101A6.914 6.914 0 0 1 8 12c-.97 0-1.894-.2-2.732-.56L6.5 10.205A2.667 2.667 0 0 0 10.206 6.5Zm-.728.728L7.23 9.478a1.667 1.667 0 0 0 2.249-2.249Z"
                    clipRule="evenodd"
                />
                <path d="M9.676 4.204A6.932 6.932 0 0 0 2.014 7.45c-.198.34-.198.76 0 1.101.397.686.91 1.296 1.51 1.806l-.71.71A7.944 7.944 0 0 1 .85 8.484a1.127 1.127 0 0 1 0-.97A7.917 7.917 0 0 1 8 3c.867 0 1.702.14 2.483.397l-.807.807Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEyeOff16);
export default Memo;
