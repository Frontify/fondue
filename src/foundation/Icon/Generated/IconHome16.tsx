import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHome16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHome16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M10.541 9.463c.534-1.144.526-2.3-.272-2.837-.782-.527-1.6-.33-2.375.497C7.12 6.296 6.302 6.1 5.52 6.626c-.797.536-.805 1.693-.272 2.837.497 1.065 1.815 2.374 2.627 2.4h.035c.816-.026 2.134-1.335 2.631-2.4ZM9.61 7.52c.386.25.392.952.026 1.706-.355.732-1.371 1.704-1.798 1.717-.41-.014-1.426-.985-1.78-1.717-.366-.754-.36-1.456.026-1.706.456-.296.926-.139 1.51.583a.33.33 0 0 0 .505 0c.584-.722 1.055-.879 1.51-.583Z" />
                <path d="M1.428 7.123a.522.522 0 0 0 .727.128l.407-.285v5.44c0 .967.784 1.75 1.752 1.75h7.373a1.75 1.75 0 0 0 1.75-1.75v-5.44l.408.285a.522.522 0 0 0 .599-.856L8.3 2.095a.522.522 0 0 0-.6 0l-6.144 4.3a.522.522 0 0 0-.128.728Zm10.965-.888L8 3.16 3.607 6.235v6.17c0 .39.316.707.707.707h7.373c.39 0 .706-.316.706-.707v-6.17Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHome16);
export default Memo;
