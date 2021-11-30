import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFont(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFont"
            {...props}
        >
            <path d="M12.77 15.273h1.337v1.539H9.893v-1.539h1.338V9.788H9.273v1.004H7.734V8.25h8.532v2.542h-1.539V9.788H12.77v5.485ZM4.307 3.3h15.384A2.308 2.308 0 0 1 22 5.608v13.846a2.308 2.308 0 0 1-2.308 2.308H4.308A2.308 2.308 0 0 1 2 19.454V5.608A2.308 2.308 0 0 1 4.308 3.3Zm0 1.538a.77.77 0 0 0-.77.77v13.846c0 .425.345.77.77.77h15.384a.77.77 0 0 0 .77-.77V5.608a.77.77 0 0 0-.77-.77H4.308Z" />
        </svg>
    );
}

const Memo = memo(IconFont);
export default Memo;
