import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconText(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconText"
            {...props}
        >
            <path d="M3 7a1 1 0 110-2h14a1 1 0 010 2H3zm-.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91zM3 15a1 1 0 010-2h14a1 1 0 010 2H3zm-.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91z" />
        </svg>
    );
}

const MemoIconText = React.memo(IconText);
export default MemoIconText;
