import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlay32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlay32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M25.808 14.676a1.333 1.333 0 0 1 0 2.315l-16.98 9.702a1.333 1.333 0 0 1-1.994-1.157V6.13a1.333 1.333 0 0 1 1.994-1.158l16.98 9.703Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay32Filled);
export default Memo;
