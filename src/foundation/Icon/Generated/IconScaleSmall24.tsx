import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScaleSmall24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconScaleSmall24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.462 7.8H3.538C2.688 7.8 2 8.489 2 9.34v5.384c0 .85.689 1.539 1.538 1.539h16.924c.85 0 1.538-.69 1.538-1.539V9.34c0-.85-.689-1.539-1.538-1.539ZM3.538 14.723V9.34h6.923v5.384H3.538Zm8.462 0V9.34h4.615v5.384H12Zm6.154 0h2.308V9.34h-2.308v5.384Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleSmall24);
export default Memo;
