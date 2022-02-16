import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListBullet12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconListBullet12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M1.5 9.125a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm0-4.179a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm0 2.081a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm0-4.152a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z" />
                <path
                    fillRule="evenodd"
                    d="M10.5 2.875a.375.375 0 0 1-.375.375H3.75a.375.375 0 1 1 0-.75h6.375c.207 0 .375.168.375.375Zm-7.125 6.25c0-.207.168-.375.375-.375h5.375a.375.375 0 1 1 0 .75H3.75a.375.375 0 0 1-.375-.375ZM9.5 4.946a.375.375 0 0 1-.375.375H3.75a.375.375 0 0 1 0-.75h5.375c.207 0 .375.168.375.375Zm1 2.081a.375.375 0 0 1-.375.375H3.75a.375.375 0 0 1 0-.75h6.375c.207 0 .375.167.375.375Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconListBullet12);
export default Memo;
