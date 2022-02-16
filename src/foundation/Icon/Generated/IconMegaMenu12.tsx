import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMegaMenu12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMegaMenu12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.375 2.625h-6.75c-.621 0-1.125.504-1.125 1.125v4.875c0 .621.504 1.125 1.125 1.125h6.75c.621 0 1.125-.504 1.125-1.125V3.75c0-.621-.504-1.125-1.125-1.125ZM2.25 3.75c0-.207.168-.375.375-.375h6.75c.207 0 .375.168.375.375v4.875A.375.375 0 0 1 9.375 9h-6.75a.375.375 0 0 1-.375-.375V3.75Zm1.125 1.313a.375.375 0 1 1 0-.75H5.25a.375.375 0 1 1 0 .75H3.375Zm3-.375c0 .207.168.375.375.375h1.746a.375.375 0 1 0 0-.75H6.75a.375.375 0 0 0-.375.375Zm-3 1.875a.375.375 0 1 1 0-.75h.75a.375.375 0 1 1 0 .75h-.75Zm3-.375c0 .207.168.375.375.375h.75a.375.375 0 1 0 0-.75h-.75a.375.375 0 0 0-.375.375Zm-3 1.875a.375.375 0 1 1 0-.75h.75a.375.375 0 1 1 0 .75h-.75Zm3-.376c0 .208.168.375.375.375h.75a.375.375 0 1 0 0-.75h-.75a.375.375 0 0 0-.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMegaMenu12);
export default Memo;
