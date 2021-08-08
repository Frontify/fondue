import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTextAlignRight(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconTextAlignRight"
            {...props}
        >
            <path d="M7 7a1 1 0 110-2h14a1 1 0 010 2H7zm-4.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91zM7 15a1 1 0 110-2h14a1 1 0 010 2H7zm-4.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91z" />
        </svg>
    );
}

const MemoIconTextAlignRight = React.memo(IconTextAlignRight);
export default MemoIconTextAlignRight;
