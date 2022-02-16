import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStrikethroughBox32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStrikethroughBox32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M29.063 4.651a1.111 1.111 0 0 0-1.567-.114L25.395 6.35a3.319 3.319 0 0 0-1.617-.418H8.222a3.333 3.333 0 0 0-3.333 3.334V22.6c0 .442.086.865.243 1.251l-2.08 1.797a1.111 1.111 0 0 0 1.452 1.682l2.1-1.815c.48.267 1.031.418 1.618.418h15.556A3.333 3.333 0 0 0 27.11 22.6V9.267a3.32 3.32 0 0 0-.243-1.252l2.08-1.796a1.111 1.111 0 0 0 .115-1.568Zm-5.757 3.505H8.222a1.11 1.11 0 0 0-1.111 1.11v12.876L23.306 8.156ZM8.694 23.71 24.889 9.725V22.6c0 .614-.498 1.111-1.111 1.111H8.694Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStrikethroughBox32);
export default Memo;
