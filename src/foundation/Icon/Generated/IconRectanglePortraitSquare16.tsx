import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRectanglePortraitSquare16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconRectanglePortraitSquare16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M6.667 4h2.666c.737 0 1.333.597 1.333 1.333v5.333c0 .737-.596 1.334-1.333 1.334H6.666a1.333 1.333 0 0 1-1.333-1.334V5.333C5.333 4.597 5.93 4 6.666 4Zm0 1.133a.2.2 0 0 0-.2.2v5.333c0 .111.09.2.2.2h2.666a.2.2 0 0 0 .2-.2V5.333a.2.2 0 0 0-.2-.2H6.667Z" />
                <path d="M4 2.1h8c1.05 0 1.9.85 1.9 1.9v8a1.9 1.9 0 0 1-1.9 1.9H4A1.9 1.9 0 0 1 2.1 12V4c0-1.05.85-1.9 1.9-1.9Zm0 1.133A.767.767 0 0 0 3.233 4v8c0 .423.343.767.767.767h8a.767.767 0 0 0 .767-.767V4A.767.767 0 0 0 12 3.233H4Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRectanglePortraitSquare16);
export default Memo;
