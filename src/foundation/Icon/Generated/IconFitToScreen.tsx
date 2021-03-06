import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFitToScreen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFitToScreen"
            {...props}
        >
            <path d="M6 3.15h12A2.85 2.85 0 0 1 20.85 6v12A2.85 2.85 0 0 1 18 20.85H6A2.85 2.85 0 0 1 3.15 18V6A2.85 2.85 0 0 1 6 3.15Zm0 1.7A1.15 1.15 0 0 0 4.85 6v12c0 .635.515 1.15 1.15 1.15h12A1.15 1.15 0 0 0 19.15 18V6A1.15 1.15 0 0 0 18 4.85H6ZM10 6h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 1.7a.3.3 0 0 0-.3.3v8a.3.3 0 0 0 .3.3h4a.3.3 0 0 0 .3-.3V8a.3.3 0 0 0-.3-.3h-4Z" />
        </svg>
    );
}

const Memo = memo(IconFitToScreen);
export default Memo;
