import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStackVertical12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStackVertical12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.375 6.675a.575.575 0 0 1-.575.575H2.2a.575.575 0 0 1-.575-.575v-1.35c0-.318.257-.575.575-.575h7.6c.318 0 .575.257.575.575v1.35Zm-.75-.175v-1h-7.25v1h7.25Zm.75-3.07a.575.575 0 0 1-.575.575H2.2a.575.575 0 0 1-.575-.575V2.08c0-.318.257-.575.575-.575h7.6c.318 0 .575.257.575.575v1.35Zm-.75-.175v-1h-7.25v1h7.25Zm.75 6.665a.575.575 0 0 1-.575.575H2.2a.575.575 0 0 1-.575-.575V8.57c0-.317.257-.575.575-.575h7.6c.318 0 .575.258.575.575v1.35Zm-.75-.175v-1h-7.25v1h7.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical12);
export default Memo;
