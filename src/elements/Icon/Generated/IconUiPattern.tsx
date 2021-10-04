import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconUiPattern(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconUiPattern"
            {...props}
        >
            <path d="M20.462 6.546V5.008a.77.77 0 00-.77-.77H4.308a.77.77 0 00-.77.77v1.538h16.924zm0 1.539H3.538v10.769c0 .425.345.77.77.77h15.384a.77.77 0 00.77-.77V8.084zM4.308 2.7h15.384A2.308 2.308 0 0122 5.008v13.846a2.308 2.308 0 01-2.308 2.308H4.308A2.308 2.308 0 012 18.854V5.008A2.308 2.308 0 014.308 2.7zm7.226 14.19a.77.77 0 01-1.376-.688l2.308-4.615a.77.77 0 011.376.688l-2.308 4.615zm3.483-.856l2.492-2.164-2.496-2.2a.678.678 0 11.897-1.017l3.077 2.712a.678.678 0 01-.004 1.02l-3.077 2.673a.678.678 0 01-.889-1.024zm-6.034 0a.678.678 0 01-.889 1.024l-3.077-2.673a.678.678 0 01-.004-1.02l3.077-2.712a.678.678 0 01.897 1.017l-2.496 2.2 2.492 2.164z" />
        </svg>
    );
}

const MemoIconUiPattern = React.memo(IconUiPattern);
export default MemoIconUiPattern;
