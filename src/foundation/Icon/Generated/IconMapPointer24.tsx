import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMapPointer24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMapPointer24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M15.5 9.454a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                <path d="M20.5 8.7c0 6.495-5.11 11.515-7.406 13.442a1.684 1.684 0 0 1-2.188 0C8.61 20.215 3.5 15.195 3.5 8.7 3.5 4.447 7.306 1 12 1s8.5 3.447 8.5 7.7Zm-1.5 0c0 2.849-1.122 5.437-2.584 7.592-1.46 2.154-3.2 3.79-4.286 4.702a.199.199 0 0 1-.13.052.199.199 0 0 1-.13-.052c-1.086-.912-2.827-2.548-4.287-4.702C6.123 14.137 5 11.55 5 8.7c0-3.288 2.991-6.2 7-6.2s7 2.912 7 6.2Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMapPointer24);
export default Memo;
