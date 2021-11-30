import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListChecklist(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconListChecklist"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 6a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1ZM11 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1ZM19 10a1 1 0 0 1-1 1h-6a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1ZM21 14a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1Z"
            />
            <path d="M8.74 5.299c-.34-.408-.883-.397-1.213.023L5.13 8.382l-.63-.88c-.314-.438-.856-.479-1.21-.09-.355.387-.387 1.057-.074 1.495l1.244 1.736c.33.462.91.478 1.257.035l3.042-3.88c.33-.421.321-1.092-.019-1.5ZM8.74 13.299c-.34-.408-.883-.397-1.213.023l-2.398 3.06-.63-.88c-.314-.438-.856-.479-1.21-.09-.355.387-.387 1.057-.074 1.495l1.244 1.736c.33.462.91.478 1.257.035l3.042-3.88c.33-.421.321-1.092-.019-1.5Z" />
        </svg>
    );
}

const Memo = memo(IconListChecklist);
export default Memo;
