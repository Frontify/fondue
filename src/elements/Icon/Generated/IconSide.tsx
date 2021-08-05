import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconSide(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
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
            name="IconSide"
            {...props}
        >
            <path d="M9.65 4.85H6A1.15 1.15 0 004.85 6v12c0 .635.515 1.15 1.15 1.15h3.65V4.85zm1.7 0v14.3H18A1.15 1.15 0 0019.15 18V6A1.15 1.15 0 0018 4.85h-6.65zM6 3.15h12A2.85 2.85 0 0120.85 6v12A2.85 2.85 0 0118 20.85H6A2.85 2.85 0 013.15 18V6A2.85 2.85 0 016 3.15z" />
        </svg>
    );
}

const MemoIconSide = React.memo(IconSide);
export default MemoIconSide;
