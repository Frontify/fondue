import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTemplates(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTemplates"
            {...props}
        >
            <path d="m5.407 8.398 6.612 3.389L18.6 8.4l-6.597-3.502-6.596 3.5ZM12 19.108l8.74-4.515a.859.859 0 0 1 1.167.397.905.905 0 0 1-.386 1.2L12.4 20.9a.848.848 0 0 1-.8 0l-9.12-4.71a.905.905 0 0 1-.387-1.2.859.859 0 0 1 1.167-.397L12 19.107Zm0-3.573 8.74-4.514a.859.859 0 0 1 1.167.397.905.905 0 0 1-.386 1.199l-9.121 4.71a.848.848 0 0 1-.8 0l-9.12-4.71a.905.905 0 0 1-.387-1.2.859.859 0 0 1 1.167-.396L12 15.535ZM12.403 3.1l8.514 4.52a.905.905 0 0 1-.01 1.591l-8.498 4.373a.85.85 0 0 1-.778 0L3.098 9.21a.904.904 0 0 1-.01-1.592L11.603 3.1a.85.85 0 0 1 .799 0Z" />
        </svg>
    );
}

const Memo = memo(IconTemplates);
export default Memo;
