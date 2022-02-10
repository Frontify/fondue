import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEraser32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEraser32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M4.942 18.022a2.667 2.667 0 0 0 0 3.771l5.352 5.352a2.667 2.667 0 0 0 3.771 0l13.862-13.861-9.123-9.123L4.941 18.02Zm3.783-.955 6.295 6.295-2.369 2.369a.667.667 0 0 1-.942 0l-5.352-5.352a.667.667 0 0 1 0-.943l2.368-2.369Zm1.414-1.414 2.44 2.44 8.665-8.664-2.44-2.44-8.665 8.664Zm3.855 3.855 2.44 2.44 8.664-8.664-2.44-2.44-8.664 8.664Z"
                    clipRule="evenodd"
                />
                <path d="M18.092 25.932a1 1 0 1 0 0 2h6.795a1 1 0 1 0 0-2h-6.795Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEraser32);
export default Memo;
