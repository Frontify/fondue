import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFigureTextBottom(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFigureTextBottom"
            {...props}
        >
            <path d="M6.796 4.503c-.69 0-1.25.56-1.25 1.25v6.494c0 .69.56 1.25 1.25 1.25h10.463c.69 0 1.25-.56 1.25-1.25V5.753c0-.69-.56-1.25-1.25-1.25H6.796Zm0-1.5h10.463a2.75 2.75 0 0 1 2.75 2.75v6.494a2.75 2.75 0 0 1-2.75 2.75H6.796a2.75 2.75 0 0 1-2.75-2.75V5.753a2.75 2.75 0 0 1 2.75-2.75Zm1.96 15.206a.75.75 0 0 1 0-1.5h6.5a.75.75 0 1 1 0 1.5h-6.5Zm.946 2.757a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 0 1.5h-4.5Z" />
        </svg>
    );
}

const Memo = memo(IconFigureTextBottom);
export default Memo;
