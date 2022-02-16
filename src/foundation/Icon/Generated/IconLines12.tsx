import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLines12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLines12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M1.5 4a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1h-9Zm0 2.5a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1h-9Zm-.5 2a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 0-1h-9a.5.5 0 0 0-.5.5Z"
            />
        </svg>
    );
}

const Memo = memo(IconLines12);
export default Memo;
