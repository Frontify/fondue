import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTemplate(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTemplate"
            {...props}
        >
            <path d="m12.4 6.76 8.515 4.52a.905.905 0 0 1-.01 1.592l-8.498 4.372a.85.85 0 0 1-.777.001l-8.534-4.374a.904.904 0 0 1-.01-1.592l8.517-4.519a.85.85 0 0 1 .798 0Zm-.398 1.8-6.597 3.499 6.612 3.388 6.581-3.386-6.596-3.502Z" />
        </svg>
    );
}

const Memo = memo(IconTemplate);
export default Memo;
