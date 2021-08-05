import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconColumnBreak(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconColumnBreak"
            {...props}
        >
            <path d="M16 8.25a.75.75 0 110-1.5h5a.75.75 0 110 1.5h-5zm0 3a.75.75 0 110-1.5h4a.75.75 0 110 1.5h-4zm-13-3a.75.75 0 010-1.5h5a.75.75 0 010 1.5H3zm13 6a.75.75 0 110-1.5h5a.75.75 0 110 1.5h-5zm-13 0a.75.75 0 110-1.5h5a.75.75 0 110 1.5H3zm0-3a.75.75 0 110-1.5h4a.75.75 0 110 1.5H3zm0 6a.75.75 0 110-1.5h4a.75.75 0 110 1.5H3zm13 0a.75.75 0 110-1.5h4a.75.75 0 110 1.5h-4zm-3.75-10V17.5a.75.75 0 01-.75.75h-2a.75.75 0 110-1.5h1.25V6.5a.75.75 0 01.75-.75h2a.75.75 0 110 1.5h-1.25z" />
        </svg>
    );
}

const MemoIconColumnBreak = React.memo(IconColumnBreak);
export default MemoIconColumnBreak;
