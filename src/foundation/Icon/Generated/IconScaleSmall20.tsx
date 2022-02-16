import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleSmall20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScaleSmall20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.051 6.5H2.95c-.708 0-1.282.574-1.282 1.282v4.487c0 .708.574 1.282 1.282 1.282h14.1c.708 0 1.282-.574 1.282-1.282V7.782c0-.708-.574-1.282-1.282-1.282ZM2.95 12.27V7.781h5.769v4.487h-5.77Zm7.051 0V7.781h3.846v4.487H10Zm5.128 0h1.923V7.781h-1.923v4.487Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleSmall20);
export default Memo;
