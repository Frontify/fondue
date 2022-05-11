import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatStrikethrough(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTextFormatStrikethrough"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 4H20v3.75a.75.75 0 0 1-1.5 0V5.5H13V9a.75.75 0 0 1-1.5 0V5.5H6v2.25a.75.75 0 0 1-1.5 0V4ZM13 16.5a.75.75 0 0 0-1.5 0v2H9.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H13v-2ZM5.25 12a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5h-14Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough);
export default Memo;
