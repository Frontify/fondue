import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconColorSwatch(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconColorSwatch"
            {...props}
        >
            <path d="M15.846 4.838H12.77v15.385h3.077V4.838Zm1.539 0v15.385h2.307a.77.77 0 0 0 .77-.77V5.609a.77.77 0 0 0-.77-.77h-2.307Zm-6.154 0H8.923v15.385h2.308V4.838Zm-3.846 0H5.846v15.385h1.539V4.838ZM4.308 20.223V4.838a.77.77 0 0 0-.77.77v13.846c0 .425.345.77.77.77Zm0-16.923h15.384A2.308 2.308 0 0 1 22 5.608v13.846a2.308 2.308 0 0 1-2.308 2.308H4.308A2.308 2.308 0 0 1 2 19.454V5.608A2.308 2.308 0 0 1 4.308 3.3Z" />
        </svg>
    );
}

const Memo = memo(IconColorSwatch);
export default Memo;
