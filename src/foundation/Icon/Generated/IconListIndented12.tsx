import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListIndented12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconListIndented12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.894 9.5a.375.375 0 0 1-.375-.375v-6.25a.375.375 0 0 1 .75 0v6.25a.375.375 0 0 1-.375.375ZM10.5 2.875a.375.375 0 0 1-.375.375H3.75a.375.375 0 1 1 0-.75h6.375c.207 0 .375.168.375.375Zm-7.125 6.25c0-.207.168-.375.375-.375h5.5a.375.375 0 1 1 0 .75h-5.5a.375.375 0 0 1-.375-.375Zm6.25-4.179a.375.375 0 0 1-.375.375h-5.5a.375.375 0 0 1 0-.75h5.5c.207 0 .375.168.375.375Zm.875 2.081a.375.375 0 0 1-.375.375H3.75a.375.375 0 0 1 0-.75h6.375c.207 0 .375.167.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListIndented12);
export default Memo;
