import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPin20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPin20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.915 1.97a1.675 1.675 0 0 0-1.97.68L8.268 6.862a5.892 5.892 0 0 0-3.896.724l-.002.001a1.675 1.675 0 0 0-.335 2.631l2.433 2.433-4.409 4.408a.625.625 0 0 0 .884.884l4.408-4.409 2.433 2.433a1.675 1.675 0 0 0 2.631-.335l.002-.002a5.891 5.891 0 0 0 .723-3.896l4.21-2.679a1.675 1.675 0 0 0 .286-2.598l-4.091-4.09a1.676 1.676 0 0 0-.63-.396Zm-.602 1.158a.425.425 0 0 1 .347.122l4.09 4.09a.426.426 0 0 1-.072.66l-4.571 2.909a.625.625 0 0 0-.272.673 4.641 4.641 0 0 1-.5 3.417.424.424 0 0 1-.667.084l-5.75-5.75-.001-.001A.425.425 0 0 1 5 8.665a4.641 4.641 0 0 1 3.417-.5c.26.063.53-.046.673-.272L12 3.322a.426.426 0 0 1 .312-.194Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPin20);
export default Memo;
