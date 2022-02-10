import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPeople32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPeople32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M22.754 22.897h6.028a9.194 9.194 0 0 0-4.788-9.017 6.423 6.423 0 0 0 2.12-4.777 6.434 6.434 0 0 0-6.431-6.436 6.434 6.434 0 0 0-6.167 4.604 7.865 7.865 0 0 1 1.837.293 4.596 4.596 0 0 1 4.33-3.058 4.6 4.6 0 0 1 1.437 8.966c.166.584.277 1.195.325 1.824.235-.067.464-.147.688-.24a7.365 7.365 0 0 1 4.799 6.002H21.42c.505.563.952 1.18 1.334 1.839Z" />
                <path
                    fillRule="evenodd"
                    d="M4 28.414c0 .31.015.617.045.92h18.3a9.193 9.193 0 0 0-4.789-9.017 6.423 6.423 0 0 0 2.12-4.777 6.434 6.434 0 0 0-6.43-6.437 6.434 6.434 0 0 0-6.43 6.437c0 1.877.801 3.566 2.082 4.742A9.194 9.194 0 0 0 4 28.414Zm9.246-6.437a6.42 6.42 0 0 1-2.497-.503 7.365 7.365 0 0 0-4.853 6.02h14.599a7.364 7.364 0 0 0-4.8-6 6.406 6.406 0 0 1-2.45.483Zm4.593-6.437a4.596 4.596 0 0 1-4.593 4.598 4.596 4.596 0 0 1-4.593-4.598 4.596 4.596 0 0 1 4.593-4.597 4.596 4.596 0 0 1 4.593 4.597Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPeople32);
export default Memo;
