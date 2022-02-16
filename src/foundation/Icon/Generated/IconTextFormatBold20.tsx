import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatBold20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextFormatBold20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M14.574 6.952c0-2.247-1.667-3.619-4.729-3.619H5v13.334h4.922c3.392 0 5.078-1.353 5.078-3.905 0-1.448-.892-2.743-2.83-2.934 1.57-.228 2.404-1.485 2.404-2.876Zm-6.512-.895h1.492c1.376 0 1.86.59 1.86 1.295 0 .781-.484 1.296-1.53 1.296H8.062v-2.59Zm3.799 6.495c0 .915-.698 1.41-1.977 1.41H8.062v-2.8h1.802c1.376 0 1.996.438 1.996 1.39Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatBold20);
export default Memo;
