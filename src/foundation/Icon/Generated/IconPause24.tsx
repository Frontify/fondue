import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPause24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPause24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.143 4c.473 0 .857.398.857.889V19.11c0 .491-.384.889-.857.889H5.857C5.384 20 5 19.602 5 19.111V4.89c0-.492.384-.89.857-.89h4.286ZM9.8 5.244H6.2v13.512h3.6V5.244ZM18.143 4c.473 0 .857.398.857.889V19.11c0 .491-.384.889-.857.889h-4.286c-.473 0-.857-.398-.857-.889V4.89c0-.491.384-.889.857-.889h4.286ZM17.8 5.244h-3.6v13.512h3.6V5.244Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPause24);
export default Memo;
