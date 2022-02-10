import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlay12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.261 6.42a.49.49 0 0 0 0-.841L3.197 2.062A.457.457 0 0 0 2.967 2a.475.475 0 0 0-.467.482v7.035c0 .083.02.165.06.237a.46.46 0 0 0 .637.184L9.261 6.42ZM3.155 2.812 8.651 6 3.155 9.187V2.812Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPlay12);
export default Memo;
