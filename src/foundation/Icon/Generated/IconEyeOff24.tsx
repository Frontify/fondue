import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEyeOff24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconEyeOff24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M4.222 19.778a.75.75 0 0 1 0-1.06L18.717 4.221a.75.75 0 0 1 1.061 1.06l-1.203 1.203a11.926 11.926 0 0 1 4.151 4.788c.22.46.22.994 0 1.454A11.876 11.876 0 0 1 12 19.5c-1.877 0-3.651-.435-5.23-1.21l-1.488 1.488a.75.75 0 0 1-1.06 0ZM15.309 9.752 17.49 7.57a10.426 10.426 0 0 1 3.49 3.604c.296.51.296 1.14 0 1.652A10.372 10.372 0 0 1 12 18c-1.455 0-2.841-.3-4.099-.841l1.85-1.85a4 4 0 0 0 5.557-5.557Zm-1.092 1.091-3.373 3.374a2.5 2.5 0 0 0 3.373-3.373Z"
                    clipRule="evenodd"
                />
                <path d="M14.513 6.306C13.71 6.106 12.867 6 12 6a10.372 10.372 0 0 0-8.98 5.174 1.644 1.644 0 0 0 0 1.652 10.423 10.423 0 0 0 2.265 2.708l-1.063 1.064a11.916 11.916 0 0 1-2.948-3.871 1.69 1.69 0 0 1 0-1.454A11.876 11.876 0 0 1 12 4.5c1.3 0 2.553.209 3.724.596l-1.21 1.21Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEyeOff24);
export default Memo;
