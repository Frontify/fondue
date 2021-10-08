import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconViewSlash(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconViewSlash"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.222 19.778a.75.75 0 010-1.06L18.717 4.221a.75.75 0 011.061 1.06l-1.203 1.203a11.926 11.926 0 014.151 4.788c.22.46.22.994 0 1.454A11.876 11.876 0 0112 19.5c-1.877 0-3.651-.435-5.23-1.21l-1.488 1.488a.75.75 0 01-1.06 0zM15.309 9.752L17.49 7.57a10.427 10.427 0 013.489 3.604c.296.51.296 1.14 0 1.652A10.372 10.372 0 0112 18c-1.455 0-2.841-.3-4.098-.841l1.85-1.85a4 4 0 005.557-5.557zm-1.092 1.091l-3.373 3.374a2.5 2.5 0 003.373-3.373zm.296-4.537C13.71 6.106 12.867 6 12 6a10.372 10.372 0 00-8.98 5.174 1.644 1.644 0 000 1.652 10.423 10.423 0 002.265 2.708l-1.063 1.064a11.916 11.916 0 01-2.948-3.871 1.69 1.69 0 010-1.454A11.876 11.876 0 0112 4.5c1.3 0 2.553.209 3.724.596l-1.21 1.21z"
            />
        </svg>
    );
}

const MemoIconViewSlash = React.memo(IconViewSlash);
export default MemoIconViewSlash;
