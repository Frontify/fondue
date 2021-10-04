import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconIframe(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconIframe"
            {...props}
        >
            <path d="M11.534 15.452a.77.77 0 01-1.376-.688l2.308-4.616a.77.77 0 011.376.688l-2.308 4.616zm3.483-.856a.678.678 0 00.889 1.023l3.077-2.672a.678.678 0 00.004-1.02L15.91 9.215a.678.678 0 00-.897 1.016l2.496 2.2-2.492 2.165zm-6.034 0a.678.678 0 11-.889 1.023l-3.077-2.672a.678.678 0 01-.004-1.02L8.09 9.215a.678.678 0 01.897 1.016l-2.496 2.2 2.492 2.165zM4.308 4.338a.77.77 0 00-.77.77v13.846c0 .425.345.77.77.77h15.384a.77.77 0 00.77-.77V5.108a.77.77 0 00-.77-.77H4.308zm0-1.538h15.384A2.308 2.308 0 0122 5.108v13.846a2.308 2.308 0 01-2.308 2.308H4.308A2.308 2.308 0 012 18.954V5.108A2.308 2.308 0 014.308 2.8z" />
        </svg>
    );
}

const MemoIconIframe = React.memo(IconIframe);
export default MemoIconIframe;
