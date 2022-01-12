import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconFiletype(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFiletype"
            {...props}
        >
            <path d="M4.343 18.208A2.731 2.731 0 0 1 2.5 15.636c0-1.187.77-2.197 1.843-2.572V5.645C4.343 3.632 5.995 2 8.033 2h6.119c.505 0 1.207.273 1.579.62l5.105 4.76c.367.343.664 1.024.664 1.528v9.45C21.5 20.37 19.855 22 17.82 22H8.023c-2.033 0-3.68-1.637-3.68-3.645v-.147Zm1.56.156v.286c0 .995.822 1.812 1.835 1.812h10.367a1.83 1.83 0 0 0 1.835-1.818v-8.182h-6.242a.77.77 0 0 1-.776-.77V3.538h-5.17c-1.026 0-1.849.811-1.849 1.812v7.56h6.735c1.527 0 2.765 1.22 2.765 2.726 0 1.507-1.238 2.728-2.765 2.728H5.903Zm14.037-9.44v-.178l-5.459-5.063v5.24h5.46ZM5.265 14.726a.915.915 0 0 0-.922.91c0 .501.413.908.922.908h7.373a.915.915 0 0 0 .922-.909.915.915 0 0 0-.922-.909H5.265Z" />
        </svg>
    );
}

const Memo = memo(IconFiletype);
export default Memo;
