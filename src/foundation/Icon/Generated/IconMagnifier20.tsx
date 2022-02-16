import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifier20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMagnifier20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.276 17.051c-4.203 0-7.61-3.444-7.61-7.692s3.407-7.692 7.61-7.692c4.202 0 7.609 3.444 7.609 7.692 0 1.826-.63 3.503-1.68 4.822a.85.85 0 0 1 .143.109l2.717 2.564a.86.86 0 0 1 .04 1.208.839.839 0 0 1-1.194.041l-2.717-2.564a.852.852 0 0 1-.149-.186 7.527 7.527 0 0 1-4.77 1.698Zm0-1.709c3.268 0 5.918-2.679 5.918-5.983s-2.65-5.983-5.918-5.983c-3.269 0-5.918 2.679-5.918 5.983s2.65 5.983 5.918 5.983Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMagnifier20);
export default Memo;
