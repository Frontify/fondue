import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageFigure(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconImageFigure"
            {...props}
        >
            <path d="M5.195 5.6c-.882 0-1.598.716-1.598 1.6v9.6c0 .884.716 1.6 1.598 1.6h6.39c.881 0 1.597-.716 1.597-1.6V7.2c0-.884-.716-1.6-1.598-1.6h-6.39Zm0-1.6h6.39a3.197 3.197 0 0 1 3.194 3.2v9.6c0 1.767-1.43 3.2-3.195 3.2h-6.39A3.197 3.197 0 0 1 2 16.8V7.2C2 5.433 3.43 4 5.195 4Zm11.58 4a.8.8 0 0 1 0-1.6h4.426a.8.8 0 0 1 0 1.6h-4.425Zm0 3.2a.8.8 0 0 1 0-1.6h2.829a.8.8 0 0 1 0 1.6h-2.828Z" />
        </svg>
    );
}

const Memo = memo(IconImageFigure);
export default Memo;
