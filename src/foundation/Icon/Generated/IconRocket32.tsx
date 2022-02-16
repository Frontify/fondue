import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRocket32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconRocket32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M18.257 13.854c-1.356-1.355-1.356-3.447 0-4.678 1.355-1.231 3.45-1.354 4.683 0 1.232 1.354 1.355 3.447 0 4.678-1.356 1.23-3.45 1.354-4.683 0Zm3.327-1.355c-.493.616-1.355.616-1.972 0-.616-.615-.493-1.354 0-1.97.493-.615 1.356-.492 1.972 0 .617.493.617 1.355 0 1.97Z" />
                <path d="m5.193 21.978 2.529-3.752 6.108 6.1L10 26.903l.862.862c2.342 2.093 6.655 2.093 9.86 0 3.154-2.182 4.517-5.914 2.794-8.614 4.536-5.004 7.427-12.936 4.846-15.514-2.586-2.583-10.555.322-15.563 4.87-2.689-1.575-6.326-.21-8.469 2.762-2.218 3.201-2.218 7.51 0 9.848l.863.862Zm5.915-12.064-1.543 2.297a21.97 21.97 0 0 0-.316.47l-4.18 6.22c-.739-1.724-.492-4.432.863-6.402 1.356-2.092 3.574-3.077 5.176-2.585Zm8.504 16.25c-2.095 1.354-4.683 1.6-6.408.861l8.996-6.032c.493 1.6-.493 3.816-2.588 5.17Zm7.395-21.05c1.725 1.723-1.233 9.232-5.546 13.54-1.849 1.847-4.067 3.324-6.162 4.432l-6.04-6.032c.864-2.339 2.342-4.555 4.191-6.401 4.19-4.309 11.831-7.263 13.557-5.54Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket32);
export default Memo;
