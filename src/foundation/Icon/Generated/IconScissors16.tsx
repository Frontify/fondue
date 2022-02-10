import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScissors16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconScissors16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.59 3.415 7.057 6.948l-.95-.884c.543-1.019.407-2.31-.408-3.125-.951-1.02-2.582-.951-3.601 0-1.02.951-1.02 2.582 0 3.737.883.883 2.174 1.019 3.125.407l.951.952-.95.95c-1.02-.543-2.31-.407-3.126.408-1.02.951-.951 2.582 0 3.601.951 1.02 2.582 1.02 3.6 0 .884-.883 1.02-2.174.408-3.125l5.436-5.435c.34-.34.815-.476 1.223-.34L7.532 9.325l2.921 2.922c.952 1.019 2.582 1.019 3.601 0l.476-.476L10.658 7.9l4.009-4.009-.476-.475c-.95-1.02-2.582-1.02-3.6 0Zm.748 7.88L9.3 9.259l.475-.408 2.786 2.785c-.408.136-.883 0-1.223-.34ZM4.815 5.59c.476-.476.476-1.291 0-1.835-.475-.475-1.29-.475-1.834 0-.476.476-.476 1.291 0 1.835.544.543 1.29.543 1.834 0Zm0 4.552c.476.543.476 1.358 0 1.834a1.358 1.358 0 0 1-1.834 0c-.476-.543-.476-1.359 0-1.834.544-.476 1.359-.476 1.834 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScissors16);
export default Memo;
