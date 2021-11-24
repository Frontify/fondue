import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTypography"
            {...props}
        >
            <path d="M12.818 19.436h3.273V21H7.909v-1.564h3.273V4.564H4.636V6.92H3V3h18v3.92h-1.636V4.564h-6.546z" />
        </svg>
    );
}

const MemoIconTypography = React.memo(IconTypography);
export default MemoIconTypography;
