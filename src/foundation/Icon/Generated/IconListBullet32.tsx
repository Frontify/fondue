import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListBullet32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconListBullet32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4 24.333a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0ZM4 13.19a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0Zm0 5.548a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0ZM4 7.667a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0Z" />
                <path
                    fillRule="evenodd"
                    d="M28 7.667a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h17a1 1 0 0 1 1 1ZM9 24.333a1 1 0 0 1 1-1h14.333a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1ZM25.333 13.19a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h14.333a1 1 0 0 1 1 1ZM28 18.738a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h17a1 1 0 0 1 1 1Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconListBullet32);
export default Memo;
