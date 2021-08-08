import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconMinus(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconMinus"
            {...props}
        >
            <path d="M4.126 8.708a.707.707 0 01-.708-.71.713.713 0 01.712-.71l7.744.003c.392 0 .709.318.707.71a.713.713 0 01-.712.71l-7.743-.003z" />
        </svg>
    );
}

const MemoIconMinus = React.memo(IconMinus);
export default MemoIconMinus;
