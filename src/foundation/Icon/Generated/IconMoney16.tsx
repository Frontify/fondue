import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoney16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMoney16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8.65 14.667V13.13c1.605-.25 2.684-1.447 2.684-3.071 0-3.81-4.69-2.244-4.69-4.43 0-.782.499-1.196 1.315-1.196.844 0 1.424.487 1.563 1.211l1.66-.517c-.263-1.21-1.19-2.052-2.532-2.259V1.333H7.198V2.9c-1.452.295-2.393 1.388-2.393 2.938 0 3.81 4.717 2.23 4.717 4.415 0 .827-.54 1.329-1.425 1.329-.927 0-1.715-.517-1.812-1.33l-1.618.444c.277 1.344 1.203 2.17 2.531 2.407v1.565H8.65Z"
            />
        </svg>
    );
}

const Memo = memo(IconMoney16);
export default Memo;
