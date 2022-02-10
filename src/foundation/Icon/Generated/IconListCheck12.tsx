import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListCheck12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconListCheck12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 2.875a.375.375 0 0 1-.375.375h-4.25a.375.375 0 1 1 0-.75h4.25c.207 0 .375.168.375.375Zm-5 6.25c0-.207.168-.375.375-.375h3.25a.375.375 0 1 1 0 .75h-3.25a.375.375 0 0 1-.375-.375Zm4-4.179a.375.375 0 0 1-.375.375h-3.25a.375.375 0 0 1 0-.75h3.25c.207 0 .375.168.375.375Zm1 2.081a.375.375 0 0 1-.375.375h-4.25a.375.375 0 0 1 0-.75h4.25c.207 0 .375.167.375.375ZM2.82 4.53l-.483-.568a.375.375 0 1 0-.571.486l.743.874c.216.254.62.212.78-.082l1.163-2.15a.375.375 0 0 0-.66-.357L2.82 4.53Zm-.57 2.72v1.5h1.5v-1.5h-1.5ZM2 6.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListCheck12);
export default Memo;
