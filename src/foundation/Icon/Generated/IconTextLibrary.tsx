import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextLibrary(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTextLibrary"
            {...props}
        >
            <path d="M18.97 17.856a4.541 4.541 0 0 1-4.508 4.029H5.538C3.032 21.885 1 19.842 1 17.33v-6.278a4.546 4.546 0 0 1 4.03-4.525A4.541 4.541 0 0 1 9.538 2.5h8.924C20.968 2.5 23 4.543 23 7.053v6.278a4.546 4.546 0 0 1-4.03 4.525zm.03-1.522a2.727 2.727 0 0 0 2.462-2.72V6.77a2.727 2.727 0 0 0-2.72-2.732H9.258A2.724 2.724 0 0 0 6.552 6.5h7.91C16.968 6.5 19 8.543 19 11.053v5.281zm-4.257 4.012a2.725 2.725 0 0 0 2.719-2.731V10.77a2.727 2.727 0 0 0-2.72-2.732H5.258a2.725 2.725 0 0 0-2.719 2.732v6.845a2.727 2.727 0 0 0 2.72 2.731h9.485zM5.758 12A.754.754 0 0 1 5 11.25c0-.414.34-.75.758-.75h8.484c.419 0 .758.336.758.75s-.34.75-.758.75H5.758zm.075 3c-.46 0-.833-.336-.833-.75s.373-.75.833-.75h8.334c.46 0 .833.336.833.75s-.373.75-.833.75H5.833zm-.075 3A.754.754 0 0 1 5 17.25c0-.414.34-.75.758-.75h5.151c.418 0 .758.336.758.75s-.34.75-.758.75H5.758z" />
        </svg>
    );
}

const Memo = memo(IconTextLibrary);
export default Memo;
