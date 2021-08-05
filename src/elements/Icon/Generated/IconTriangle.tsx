import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTriangle(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconTriangle"
            {...props}
        >
            <path d="M5.772 19.287h12.456L12 6.83 5.772 19.287zM21 21H3l9-18 9 18z" />
        </svg>
    );
}

const MemoIconTriangle = React.memo(IconTriangle);
export default MemoIconTriangle;
