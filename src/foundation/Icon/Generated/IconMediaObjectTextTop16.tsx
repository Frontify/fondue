import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMediaObjectTextTop16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMediaObjectTextTop16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 2.836a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm.667 2.002a.5.5 0 0 1 .5-.5h5.666a.5.5 0 1 1 0 1H5.167a.5.5 0 0 1-.5-.5ZM3 12V8c0-.184.15-.333.333-.333h9.334c.184 0 .333.149.333.333v4c0 .184-.15.333-.333.333H3.333A.333.333 0 0 1 3 12ZM2 8c0-.736.597-1.333 1.333-1.333h9.334C13.403 6.667 14 7.264 14 8v4c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 0 1 2 12V8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextTop16);
export default Memo;
