import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScaleLarge24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconScaleLarge24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.308 3.3A2.308 2.308 0 0 0 2 5.608v13.846a2.308 2.308 0 0 0 2.308 2.308h15.384A2.308 2.308 0 0 0 22 19.454V5.608A2.308 2.308 0 0 0 19.692 3.3H4.308Zm11.538 1.54H12.77v15.384h3.077V4.84Zm1.539 15.384h2.307a.77.77 0 0 0 .77-.77V5.609a.77.77 0 0 0-.77-.77h-2.307v15.385ZM8.923 4.84h2.308v15.384H8.923V4.84Zm-1.538 0H5.846v15.384h1.539V4.84Zm-3.077 0v15.384a.77.77 0 0 1-.77-.77V5.609a.77.77 0 0 1 .77-.77Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleLarge24);
export default Memo;
