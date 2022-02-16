import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlay16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.349 8.56a.654.654 0 0 0 0-1.121L4.263 2.75a.61.61 0 0 0-.306-.082.634.634 0 0 0-.623.643v9.38c0 .11.027.219.08.315.169.31.549.42.85.246l8.085-4.69ZM4.207 3.75 11.534 8l-7.327 4.25v-8.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPlay16);
export default Memo;
