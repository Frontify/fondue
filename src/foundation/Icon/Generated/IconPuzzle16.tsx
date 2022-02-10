import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPuzzle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPuzzle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.666 9.6a2.4 2.4 0 0 0-3.2-2.263V5.6c0-.589-.477-1.067-1.066-1.067H8.663a2.4 2.4 0 1 0-4.527 0H2.4c-.59 0-1.067.478-1.067 1.067v8c0 .59.478 1.067 1.067 1.067h2.693c.478 0 .715-.58.374-.915a1.333 1.333 0 1 1 1.866 0 .533.533 0 0 0 .373.915H10.4c.589 0 1.066-.478 1.066-1.067v-1.737a2.4 2.4 0 0 0 3.2-2.263ZM10.4 10.906V13.6H8.663A2.4 2.4 0 0 0 6.4 10.4a2.4 2.4 0 0 0-2.264 3.2H2.4v-8h2.693c.478 0 .715-.58.374-.914a1.333 1.333 0 1 1 1.866 0 .533.533 0 0 0 .373.914H10.4v2.694c0 .477.58.714.914.373a1.333 1.333 0 1 1 0 1.866.533.533 0 0 0-.914.373Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPuzzle16);
export default Memo;
