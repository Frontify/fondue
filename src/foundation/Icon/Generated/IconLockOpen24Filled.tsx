import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLockOpen24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLockOpen24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.367 8.667v-2.5a2.5 2.5 0 0 0-2.5-2.5H11.2a2.5 2.5 0 0 0-2.5 2.5.833.833 0 0 1-1.666 0A4.167 4.167 0 0 1 11.2 2h1.667a4.167 4.167 0 0 1 4.166 4.167v2.5h.834a2.5 2.5 0 0 1 2.5 2.5V19.5a2.5 2.5 0 0 1-2.5 2.5H6.2a2.5 2.5 0 0 1-2.5-2.5v-8.333a2.5 2.5 0 0 1 2.5-2.5h9.167ZM11.2 15.944a1.666 1.666 0 1 1 1.667 0V17a.833.833 0 0 1-1.667 0v-1.056Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockOpen24Filled);
export default Memo;
