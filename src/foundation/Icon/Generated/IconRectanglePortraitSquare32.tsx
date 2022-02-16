import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconRectanglePortraitSquare32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconRectanglePortraitSquare32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M13.333 8h5.334a2.667 2.667 0 0 1 2.666 2.666v10.667A2.667 2.667 0 0 1 18.667 24h-5.334a2.667 2.667 0 0 1-2.666-2.667V10.667A2.667 2.667 0 0 1 13.333 8Zm0 2.267a.4.4 0 0 0-.4.4v10.666c0 .221.18.4.4.4h5.334a.4.4 0 0 0 .4-.4V10.667a.4.4 0 0 0-.4-.4h-5.334Z" />
                <path d="M8 4.2h16A3.8 3.8 0 0 1 27.8 8v16a3.8 3.8 0 0 1-3.8 3.8H8A3.8 3.8 0 0 1 4.2 24V8A3.8 3.8 0 0 1 8 4.2Zm0 2.266c-.847 0-1.533.687-1.533 1.534v16c0 .847.686 1.533 1.533 1.533h16c.847 0 1.533-.686 1.533-1.533V8c0-.847-.686-1.534-1.533-1.534H8Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRectanglePortraitSquare32);
export default Memo;
