import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconGridRegular16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconGridRegular16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.067 8.667C2.477 8.667 2 9.144 2 9.733v3.2C2 13.523 2.478 14 3.067 14h3.2c.589 0 1.066-.478 1.066-1.067v-3.2c0-.589-.477-1.066-1.066-1.066h-3.2Zm6.666 0c-.589 0-1.066.477-1.066 1.066v3.2c0 .59.477 1.067 1.066 1.067h3.2c.59 0 1.067-.478 1.067-1.067v-3.2c0-.589-.478-1.066-1.067-1.066h-3.2Zm0-6.667c-.589 0-1.066.478-1.066 1.067v3.2c0 .589.477 1.066 1.066 1.066h3.2c.59 0 1.067-.477 1.067-1.066v-3.2C14 2.477 13.522 2 12.933 2h-3.2ZM3.067 2C2.477 2 2 2.478 2 3.067v3.2c0 .589.478 1.066 1.067 1.066h3.2c.589 0 1.066-.477 1.066-1.066v-3.2C7.333 2.477 6.856 2 6.267 2h-3.2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconGridRegular16Filled);
export default Memo;
