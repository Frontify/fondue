import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStar16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStar16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m4.667 9.426-.787 4.588L8 11.848l4.12 2.166-.786-4.588 3.333-3.25-4.607-.668L8 1.333 5.94 5.508l-4.607.669 3.334 3.25Zm5.585-.351.531 3.099L8 10.71l-2.783 1.463.531-3.1L3.497 6.88l3.112-.452L8 3.608l1.392 2.82 3.112.452-2.252 2.195Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStar16);
export default Memo;
