import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageWithText24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconImageWithText24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M11 7.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75Zm-2 6a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .75.75Zm2-3a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75Zm3.5-.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM16 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                <path d="M20 5.5H4a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5ZM4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Z" />
                <path d="m5.968 18.754 6.815-4.193a1.75 1.75 0 0 1 1.222-.233l6.864 1.215-.261 1.477-6.864-1.215a.25.25 0 0 0-.175.033l-6.815 4.194-.786-1.278Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconImageWithText24);
export default Memo;
