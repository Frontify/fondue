import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFunnel32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFunnel32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26.793 4H5.51a2.667 2.667 0 0 0-2.228 4.131l7.76 11.809a4 4 0 0 1 .657 2.196v4.992a2.666 2.666 0 0 0 4.035 2.288l3.512-2.1a2.667 2.667 0 0 0 1.298-2.25l.043-2.961a4 4 0 0 1 .657-2.139l7.778-11.835A2.667 2.667 0 0 0 26.793 4ZM13.27 18.475 5.51 6.667h21.283l-7.777 11.835a6.666 6.666 0 0 0-1.095 3.564l-.043 2.961-3.512 2.1v-4.99a6.663 6.663 0 0 0-1.096-3.662Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFunnel32);
export default Memo;
