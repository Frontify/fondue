import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStar32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStar32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.333 18.852 7.76 28.028 16 23.696l8.241 4.332-1.573-9.176 6.666-6.498-9.213-1.339L16 2.667l-4.12 8.348-9.214 1.339 6.667 6.498Zm11.17-.703 1.063 6.199L16 21.42l-5.567 2.927 1.063-6.198-4.503-4.39 6.224-.905L16 7.216l2.783 5.64 6.223.904-4.503 4.39Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStar32);
export default Memo;
