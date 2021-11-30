import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSingleQuoteUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 8 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSingleQuoteUp"
            {...props}
        >
            <path d="M6.606 0v2.439H5.19c-1.17 0-1.756.585-1.756 1.756v1.561h.683c.943 0 1.723.293 2.341.878.65.586.976 1.317.976 2.195 0 .943-.325 1.708-.976 2.293-.618.585-1.398.878-2.341.878-.943 0-1.724-.309-2.342-.927C1.16 10.455.85 9.675.85 8.732V4.195C.85 1.398 2.248 0 5.045 0h1.56Z" />
        </svg>
    );
}

const Memo = memo(IconSingleQuoteUp);
export default Memo;
