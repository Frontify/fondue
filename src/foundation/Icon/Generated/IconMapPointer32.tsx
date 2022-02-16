import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMapPointer32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMapPointer32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M20.667 12.605a4.667 4.667 0 1 1-9.333 0 4.667 4.667 0 0 1 9.333 0Zm-2 0a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0Z" />
                <path d="M27.333 11.6c0 8.66-6.813 15.353-9.874 17.923a2.246 2.246 0 0 1-2.918 0C11.48 26.953 4.667 20.26 4.667 11.6 4.667 5.93 9.74 1.333 16 1.333S27.333 5.93 27.333 11.6Zm-2 0c0 3.799-1.496 7.249-3.444 10.123-1.947 2.871-4.267 5.052-5.716 6.269a.265.265 0 0 1-.173.07.266.266 0 0 1-.173-.07c-1.448-1.217-3.77-3.398-5.716-6.269-1.948-2.874-3.444-6.324-3.444-10.123 0-4.384 3.988-8.267 9.333-8.267 5.345 0 9.333 3.883 9.333 8.267Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMapPointer32);
export default Memo;
