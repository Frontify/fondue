import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocument20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDocument20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.964 1.667a3.042 3.042 0 0 0-3.048 3.037v10.592a3.04 3.04 0 0 0 3.04 3.037h8.088c1.68 0 3.04-1.359 3.04-3.035V7.423c0-.42-.246-.988-.55-1.273L12.32 2.183c-.306-.289-.886-.516-1.303-.516H5.964Zm9.831 7.05h-5.154a.64.64 0 0 1-.641-.64V2.949H5.73c-.846 0-1.526.675-1.526 1.509v11.084c0 .829.679 1.51 1.516 1.51h8.56c.834 0 1.515-.68 1.515-1.516V8.718Zm0-1.281v-.148l-4.507-4.219v4.367h4.507Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocument20);
export default Memo;
