import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPeople12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPeople12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.533 8.586h2.26a3.448 3.448 0 0 0-1.796-3.381 2.413 2.413 0 1 0-3.929-2.478c.238.01.469.047.69.11A1.723 1.723 0 1 1 7.92 5.052c.062.22.104.448.122.684.088-.025.174-.055.258-.09a2.762 2.762 0 0 1 1.8 2.25H8.032a4.2 4.2 0 0 1 .5.69Z" />
                <path
                    fillRule="evenodd"
                    d="M1.5 10.655c0 .117.006.232.017.345H8.38a3.448 3.448 0 0 0-1.796-3.38 2.413 2.413 0 1 0-3.247-.013 3.448 3.448 0 0 0-1.837 3.05Zm3.467-2.414a2.41 2.41 0 0 1-.936-.188 2.762 2.762 0 0 0-1.82 2.257h5.475a2.762 2.762 0 0 0-1.8-2.25 2.403 2.403 0 0 1-.919.181ZM6.69 5.828a1.723 1.723 0 1 1-3.447.001 1.723 1.723 0 0 1 3.447-.001Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPeople12);
export default Memo;
