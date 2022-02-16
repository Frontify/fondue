import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMediaObjectTextTop12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMediaObjectTextTop12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 2.127c0 .207.168.375.375.375h5.25a.375.375 0 1 0 0-.75h-5.25A.375.375 0 0 0 3 2.127Zm.5 1.502c0-.207.168-.375.375-.375h4.25a.375.375 0 0 1 0 .75h-4.25a.375.375 0 0 1-.375-.375ZM2.25 9V6a.25.25 0 0 1 .25-.25h7a.25.25 0 0 1 .25.25v3a.25.25 0 0 1-.25.25h-7A.25.25 0 0 1 2.25 9ZM1.5 6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextTop12);
export default Memo;
