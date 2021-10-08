import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconAttachment(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M3.5 5.5v8.25a2.5 2.5 0 105 0V4.5a4.25 4.25 0 10-8.5 0v9.25a6 6 0 1012 0V5.5a.75.75 0 10-1.5 0v8.25a4.5 4.5 0 11-9 0V4.5a2.75 2.75 0 015.5 0v9.25a1 1 0 01-2 0V5.5a.75.75 0 00-1.5 0z" />
        </svg>
    );
}

const MemoIconAttachment = React.memo(IconAttachment);
export default MemoIconAttachment;
