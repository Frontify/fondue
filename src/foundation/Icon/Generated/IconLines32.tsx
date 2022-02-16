import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLines32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLines32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4 10.667A1.333 1.333 0 0 1 4 8h24a1.333 1.333 0 1 1 0 2.667H4Zm0 6.666a1.333 1.333 0 1 1 0-2.666h24a1.333 1.333 0 1 1 0 2.666H4Zm-1.333 5.334C2.667 23.403 3.263 24 4 24h24a1.333 1.333 0 1 0 0-2.667H4c-.737 0-1.333.597-1.333 1.334Z"
            />
        </svg>
    );
}

const Memo = memo(IconLines32);
export default Memo;
