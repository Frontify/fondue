import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconColorScale(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconColorScale"
            {...props}
        >
            <path d="M16.615 9.338H12v5.385h4.615V9.338zm1.539 0v5.385h2.308V9.338h-2.308zm-7.692 0H3.538v5.385h6.924V9.338zM3.538 7.8h16.924c.85 0 1.538.689 1.538 1.538v5.385c0 .85-.689 1.539-1.538 1.539H3.538c-.85 0-1.538-.69-1.538-1.539V9.338c0-.85.689-1.538 1.538-1.538z" />
        </svg>
    );
}

const MemoIconColorScale = React.memo(IconColorScale);
export default MemoIconColorScale;
