import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSymbols(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconSymbols"
            {...props}
        >
            <path d="M6.027 3h12.145a3 3 0 0 1 3 3v12.145a3 3 0 0 1-3 3H6.027a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 1.5a1.5 1.5 0 0 0-1.5 1.5v12.145a1.5 1.5 0 0 0 1.5 1.5h12.145a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H6.027zm2.003 7.97L10 14.44l5.97-5.97a.75.75 0 0 1 1.06 1.06L10 16.56l-3.03-3.03a.75.75 0 0 1 1.06-1.06z" />
        </svg>
    );
}

const Memo = memo(IconSymbols);
export default Memo;
