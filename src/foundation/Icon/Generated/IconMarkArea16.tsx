import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMarkArea16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMarkArea16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M6 4.667h4a2 2 0 0 1 2 2v.666a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.666a2 2 0 0 1 2-2ZM6 6a.667.667 0 0 0-.667.667v.666c0 .369.299.667.667.667h4a.667.667 0 0 0 .667-.667v-.666A.667.667 0 0 0 10 6H6Z" />
                <path d="M12.667 2H3.333a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.334a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-10 2c0-.368.298-.667.667-.667h9.333c.368 0 .667.299.667.667v8a.667.667 0 0 1-.667.667H3.333A.667.667 0 0 1 2.667 12V4Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMarkArea16);
export default Memo;
