import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPerson20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPerson20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.301 10.831a6.958 6.958 0 0 1 3.624 6.824H3.075a6.958 6.958 0 0 1 3.672-6.85 4.86 4.86 0 0 1-1.575-3.589 4.87 4.87 0 0 1 4.867-4.871 4.87 4.87 0 0 1 4.867 4.871c0 1.434-.62 2.724-1.605 3.615Zm-1.408.89a4.849 4.849 0 0 1-1.854.367c-.67 0-1.309-.136-1.89-.381a5.574 5.574 0 0 0-3.673 4.556h11.049a5.573 5.573 0 0 0-3.632-4.541Zm1.622-4.505a3.478 3.478 0 0 1-3.476 3.48 3.478 3.478 0 0 1-3.477-3.48 3.478 3.478 0 0 1 3.477-3.48 3.478 3.478 0 0 1 3.476 3.48Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPerson20);
export default Memo;
