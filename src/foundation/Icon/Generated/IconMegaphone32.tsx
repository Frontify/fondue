import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMegaphone32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMegaphone32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="m21.434 3.036-6.545 4.316h-8.89c-1.84 0-3.332 1.476-3.332 3.297v5.496c0 1.156.601 2.173 1.512 2.762l2.312 9.582c.12.495.566.844 1.08.844h2.873c.614 0 1.111-.492 1.111-1.099v-8.792h3.334l6.545 4.316c.365.24.794.37 1.233.37a2.211 2.211 0 0 0 2.222-2.199V4.865c0-.434-.13-.858-.373-1.22a2.237 2.237 0 0 0-3.082-.609Zm-10.99 14.208H5.997a1.105 1.105 0 0 1-1.108-1.1V10.65c0-.607.497-1.099 1.11-1.099h4.445v7.694ZM8.45 27.135h.884v-7.693h-2.74l1.856 7.693ZM12.666 9.55v7.694h2.896l7.104 4.685V4.865L15.563 9.55h-2.896Z"
                    clipRule="evenodd"
                />
                <path d="M28.222 9.55c-.614 0-1.111.498-1.111 1.111v5.472a1.111 1.111 0 0 0 2.222 0V10.66a1.11 1.11 0 0 0-1.11-1.11Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMegaphone32);
export default Memo;
