import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPaperplane12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPaperplane12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.73 7.922 1.217 6.568a.421.421 0 0 1-.012-.73L9.39 1.056a.408.408 0 0 1 .61.361v9.166a.408.408 0 0 1-.597.369L6.597 9.449l-2.222 1.483a.407.407 0 0 1-.63-.347L3.73 7.922Zm.314-.773-1.79-.964 5.488-3.207L4.044 7.15Zm5.141-3.767L7.137 8.798l2.048 1.096V3.382Zm-2.86 5.253-1.77 1.181-.01-1.99L8.182 3.72 6.325 8.635Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPaperplane12);
export default Memo;
