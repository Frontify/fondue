import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDoubleQuotesUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDoubleQuotesUp"
            {...props}
        >
            <path d="M14.85 0v2.439h-1.414c-1.171 0-1.756.585-1.756 1.756v1.561h.683c.943 0 1.723.293 2.341.878.65.586.976 1.317.976 2.195 0 .943-.326 1.708-.976 2.293-.618.585-1.398.878-2.341.878-.944 0-1.724-.309-2.342-.927-.618-.618-.927-1.398-.927-2.341V4.195C9.094 1.398 10.493 0 13.29 0h1.561ZM6.363 0v2.439H4.948c-1.17 0-1.756.585-1.756 1.756v1.561h.683c.943 0 1.723.293 2.341.878.65.586.976 1.317.976 2.195 0 .943-.325 1.708-.976 2.293-.618.585-1.398.878-2.341.878-.943 0-1.724-.309-2.342-.927-.618-.618-.927-1.398-.927-2.341V4.195C.606 1.398 2.005 0 4.802 0h1.56Z" />
        </svg>
    );
}

const Memo = memo(IconDoubleQuotesUp);
export default Memo;
