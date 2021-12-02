import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPublication(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconPublication"
            {...props}
        >
            <path d="M15.483 5.957 4.508 12.369l3.58 1.93 7.395-8.342Zm2.887.807-4.095 10.831 4.095 2.193V6.764ZM12.65 17.27l3.716-9.828-7.278 8.21.024 3.98 3.538-2.362Zm-5.19-1.426-5.025-2.708a.842.842 0 0 1-.024-1.461l16.37-9.564c.543-.317 1.219.084 1.219.723v18.331c0 .627-.65 1.03-1.193.739l-5.613-3.006-4.443 2.965c-.54.36-1.257-.033-1.26-.693l-.031-5.326Z" />
        </svg>
    );
}

const Memo = memo(IconPublication);
export default Memo;
