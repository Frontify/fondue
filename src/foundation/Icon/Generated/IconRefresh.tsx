import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRefresh(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconRefresh"
            {...props}
        >
            <path d="m19.379 6.833-.015-4.095a.887.887 0 0 1 .895-.888c.48.021.865.414.868.895l.025 6.369a.82.82 0 0 1 0 .027.885.885 0 0 1-.861.86l-6.396-.024A.908.908 0 0 1 13 9.109L13 9.075a.885.885 0 0 1 .888-.861l4.259.015C16.829 5.332 14.346 3.85 11.5 3.85a7.65 7.65 0 1 0 0 15.3c4.057 0 7.376-3.158 7.634-6.15-.004-.47.383-1 .853-1s.85.53.85 1a.859.859 0 0 1-.006.1c-.31 3.884-4.369 7.75-9.331 7.75a9.35 9.35 0 0 1 0-18.7c3.31 0 6.217 1.66 7.879 4.683Z" />
        </svg>
    );
}

const Memo = memo(IconRefresh);
export default Memo;
