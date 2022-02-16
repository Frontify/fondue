import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPin20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPin20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12.915 1.97a1.675 1.675 0 0 0-1.97.68L8.268 6.862a5.892 5.892 0 0 0-3.896.724l-.002.001a1.675 1.675 0 0 0-.335 2.631l2.433 2.433-4.409 4.408a.625.625 0 0 0 .884.884l4.408-4.409 2.433 2.433a1.675 1.675 0 0 0 2.631-.335l.002-.002a5.891 5.891 0 0 0 .723-3.896l4.21-2.679a1.675 1.675 0 0 0 .286-2.598l-4.091-4.09a1.676 1.676 0 0 0-.63-.396Z"
            />
        </svg>
    );
}

const Memo = memo(IconPin20Filled);
export default Memo;
