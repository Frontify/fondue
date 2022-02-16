import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPointout16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPointout16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M9.666 9.333a2.333 2.333 0 1 1 0-4.666 2.333 2.333 0 0 1 0 4.666Zm0-1.333a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                <path d="M12.666 2H3.333a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.333a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-10 2c0-.368.299-.667.667-.667h9.333c.368 0 .667.299.667.667v8a.667.667 0 0 1-.667.667H3.333A.667.667 0 0 1 2.666 12V4Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPointout16);
export default Memo;
