import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSuitcaseTag20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSuitcaseTag20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.842 5.291h2.566c.532 0 .986.188 1.362.564.375.375.563.824.563 1.346v8.982c0 .532-.188.986-.563 1.362-.376.375-.83.563-1.362.563H3.591c-.532 0-.986-.188-1.361-.563a1.855 1.855 0 0 1-.563-1.362V7.201c0-.522.187-.97.563-1.346.375-.376.83-.564 1.361-.564h2.567V3.367c0-.355.125-.658.375-.908s.553-.376.908-.376h5.118c.354 0 .657.125.907.376.25.25.376.553.376.908V5.29Zm-1.284 0V4.008a.618.618 0 0 0-.187-.454.618.618 0 0 0-.454-.188h-3.85a.6.6 0 0 0-.438.188.618.618 0 0 0-.188.454v1.283h5.118ZM2.95 15.541V7.843c0-.344.125-.641.375-.892.25-.25.548-.375.892-.375h1.825v1.769a2.084 2.084 0 0 0 0 4.146v4.335H4.216c-.344 0-.641-.125-.892-.375a1.237 1.237 0 0 1-.375-.908ZM7.29 12.5v4.325h5.417V6.575H7.291v1.758h.625a2.083 2.083 0 1 1 0 4.167h-.625Zm6.667 4.325V6.575h1.809c.354 0 .657.125.907.375s.376.548.376.892v7.7c0 .354-.125.657-.376.908-.25.25-.553.375-.907.375h-1.809ZM6.25 9.583a.833.833 0 0 0 0 1.667h1.667a.833.833 0 1 0 0-1.667H6.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconSuitcaseTag20);
export default Memo;
