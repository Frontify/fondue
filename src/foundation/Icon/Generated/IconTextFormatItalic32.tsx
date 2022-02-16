import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatItalic32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextFormatItalic32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.711 5.52a1 1 0 0 0 1 1h1.77l-2.923 18.712h-1.736a1 1 0 0 0 0 2h7.403a1 1 0 1 0 0-2h-1.667L19.48 6.521h1.634a1 1 0 0 0 0-2H13.71a1 1 0 0 0-1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic32);
export default Memo;
