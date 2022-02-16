import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLockOpen32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLockOpen32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M14.934 21.258a2.221 2.221 0 0 1 1.11-4.147 2.222 2.222 0 0 1 1.112 4.147v1.409a1.111 1.111 0 1 1-2.222 0v-1.409Z" />
                <path
                    fillRule="evenodd"
                    d="M20.49 11.556V8.222a3.333 3.333 0 0 0-3.334-3.333h-2.222A3.333 3.333 0 0 0 11.6 8.222a1.111 1.111 0 1 1-2.222 0 5.556 5.556 0 0 1 5.556-5.555h2.222a5.556 5.556 0 0 1 5.555 5.555v3.334h1.112a3.333 3.333 0 0 1 3.333 3.333V26a3.333 3.333 0 0 1-3.333 3.333H8.267A3.333 3.333 0 0 1 4.934 26V14.889a3.333 3.333 0 0 1 3.333-3.333h12.222ZM8.266 13.777a1.11 1.11 0 0 0-1.111 1.11V26a1.11 1.11 0 0 0 1.11 1.111h15.557A1.11 1.11 0 0 0 24.932 26V14.889a1.11 1.11 0 0 0-1.11-1.111H8.267Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLockOpen32);
export default Memo;
