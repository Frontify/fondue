import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextBrackets32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextBrackets32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10 8.333H7.333c-.92 0-1.667.746-1.667 1.667v12c0 .92.747 1.667 1.667 1.667H10a1 1 0 0 1 0 2H7.333A3.667 3.667 0 0 1 3.666 22V10a3.667 3.667 0 0 1 3.667-3.667H10a1 1 0 0 1 0 2Z" />
                <path d="M10.343 13c-.558 0-1.01-.448-1.01-1s.452-1 1.01-1h11.313c.558 0 1.01.448 1.01 1s-.452 1-1.01 1H10.343Zm.101 4c-.613 0-1.11-.448-1.11-1s.497-1 1.11-1h11.111c.614 0 1.111.448 1.111 1s-.497 1-1.11 1H10.443Zm-1.111 3c0 .552.452 1 1.01 1h6.869c.558 0 1.01-.448 1.01-1s-.452-1-1.01-1h-6.869c-.558 0-1.01.448-1.01 1Z" />
                <path d="M24.666 8.333H22a1 1 0 0 1 0-2h2.666A3.667 3.667 0 0 1 28.334 10v12a3.667 3.667 0 0 1-3.666 3.667H22a1 1 0 0 1 0-2h2.666c.921 0 1.667-.747 1.667-1.667V10c0-.92-.746-1.667-1.666-1.667Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextBrackets32);
export default Memo;
