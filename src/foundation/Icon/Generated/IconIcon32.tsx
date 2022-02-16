import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconIcon32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconIcon32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24.727 4H7.273A3.273 3.273 0 0 0 4 7.273v17.454A3.273 3.273 0 0 0 7.273 28h17.454A3.273 3.273 0 0 0 28 24.727V7.273A3.273 3.273 0 0 0 24.727 4ZM6.182 7.725v16.55l3.702-3.702A7.602 7.602 0 0 1 8.364 16c0-1.715.565-3.299 1.52-4.573L6.182 7.725Zm5.267 5.267A5.429 5.429 0 0 0 10.545 16c0 1.112.333 2.146.904 3.008L14.457 16l-3.008-3.008ZM16 14.457l-3.008-3.008A5.429 5.429 0 0 1 16 10.546a5.43 5.43 0 0 1 3.008.903L16 14.457Zm0 3.086-3.008 3.008a5.429 5.429 0 0 0 3.008.904 5.43 5.43 0 0 0 3.008-.904L16 17.543Zm4.55 1.465L17.544 16l3.008-3.008A5.43 5.43 0 0 1 21.455 16a5.43 5.43 0 0 1-.904 3.008Zm.023 3.108A7.602 7.602 0 0 1 16 23.636a7.602 7.602 0 0 1-4.573-1.52l-3.702 3.702h16.55l-3.702-3.702Zm5.245 2.16-3.702-3.703A7.603 7.603 0 0 0 23.636 16a7.603 7.603 0 0 0-1.52-4.573l3.702-3.702v16.55ZM11.427 9.883 7.725 6.182h16.55l-3.702 3.702A7.602 7.602 0 0 0 16 8.364a7.603 7.603 0 0 0-4.573 1.52Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconIcon32);
export default Memo;
