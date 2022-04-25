import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMapPointer(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconMapPointer"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                fill="#000"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 13c0 6.5-7 16-10 16S6 19.5 6 13C6 7.477 10.477 3 16 3s10 4.477 10 10Zm-2 0c0 2.667-1.498 6.267-3.54 9.328-.997 1.496-2.053 2.756-2.986 3.614-.468.43-.865.724-1.173.9a1.933 1.933 0 0 1-.301.144 1.933 1.933 0 0 1-.301-.145c-.308-.175-.705-.468-1.173-.899-.933-.858-1.99-2.118-2.987-3.614C9.5 19.267 8 15.667 8 13a8 8 0 1 1 16 0Z"
                fill="#000"
            />
        </svg>
    );
}

const Memo = memo(IconMapPointer);
export default Memo;
