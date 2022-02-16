import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPills20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPills20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 8.333H2.5c-.69 0-1.25.56-1.25 1.25v1.25c0 .69.56 1.25 1.25 1.25H5c.69 0 1.25-.56 1.25-1.25v-1.25c0-.69-.56-1.25-1.25-1.25Zm-2.5 2.5v-1.25H5v1.25H2.5Zm6.25-1.25v1.25h2.5v-1.25h-2.5Zm2.5-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v1.25c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25v-1.25c0-.69-.56-1.25-1.25-1.25ZM15 9.583v1.25h2.5v-1.25H15Zm2.5-1.25H15c-.69 0-1.25.56-1.25 1.25v1.25c0 .69.56 1.25 1.25 1.25h2.5c.69 0 1.25-.56 1.25-1.25v-1.25c0-.69-.56-1.25-1.25-1.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPills20);
export default Memo;
