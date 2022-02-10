import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyCase32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypographyCase32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M15.047 21.256v-6.734h-2.424v1.232h-1.905v-3.121h10.563v3.12h-1.904v-1.231h-2.425v6.734h1.656v1.889h-5.217v-1.889h1.656Z" />
                <path
                    fillRule="evenodd"
                    d="M13.143 4.667h5.714c1.052 0 1.905.843 1.905 1.884v1.894h6.666c1.052 0 1.905.845 1.905 1.888v15.112a1.897 1.897 0 0 1-1.905 1.888H4.571a1.897 1.897 0 0 1-1.904-1.888V10.333c0-1.043.852-1.888 1.904-1.888h6.667V6.55c0-1.04.853-1.884 1.905-1.884ZM4.57 25.445V10.333h22.857v15.112H4.571Zm8.572-17v-1.89h5.714v1.89h-5.714Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyCase32);
export default Memo;
