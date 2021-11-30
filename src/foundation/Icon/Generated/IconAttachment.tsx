import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAttachment(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAttachment"
            {...props}
        >
            <path d="M3.5 5.5v8.25a2.5 2.5 0 1 0 5 0V4.5a4.25 4.25 0 1 0-8.5 0v9.25a6 6 0 1 0 12 0V5.5a.75.75 0 1 0-1.5 0v8.25a4.5 4.5 0 1 1-9 0V4.5a2.75 2.75 0 0 1 5.5 0v9.25a1 1 0 0 1-2 0V5.5a.75.75 0 0 0-1.5 0Z" />
        </svg>
    );
}

const Memo = memo(IconAttachment);
export default Memo;
