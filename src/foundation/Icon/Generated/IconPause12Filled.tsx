import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPause12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPause12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3 2a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 5 2H3Zm4 0a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 9 2H7Z"
            />
        </svg>
    );
}

const Memo = memo(IconPause12Filled);
export default Memo;
