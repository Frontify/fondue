import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMusicNote32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMusicNote32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.667 9.942v13.217a1.1 1.1 0 0 1-.014.177c.01.123.014.248.014.374 0 2.738-2.239 4.957-5 4.957s-5-2.22-5-4.957c0-2.737 2.239-4.956 5-4.956a5.01 5.01 0 0 1 2.778.834V4.435c0-.609.497-1.102 1.11-1.102h16.668c.613 0 1.11.493 1.11 1.102v18.724a1.1 1.1 0 0 1-.013.177c.009.123.014.248.014.374 0 2.738-2.239 4.957-5 4.957-2.762 0-5-2.22-5-4.957 0-2.737 2.238-4.956 5-4.956 1.027 0 1.983.307 2.777.834V9.942H12.667Zm0-2.203h14.444V5.536H12.667V7.74ZM10.445 23.71c0 1.52-1.244 2.754-2.778 2.754S4.889 25.23 4.889 23.71s1.244-2.754 2.778-2.754 2.778 1.233 2.778 2.754Zm16.666 0c0 1.52-1.243 2.754-2.777 2.754-1.535 0-2.778-1.233-2.778-2.754 0-1.52 1.243-2.754 2.778-2.754 1.534 0 2.777 1.233 2.777 2.754Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMusicNote32);
export default Memo;
