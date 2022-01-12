import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconAddSimple(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAddSimple"
            {...props}
        >
            <path d="m13.065 13.065.002 4.739c0 .588-.476 1.067-1.064 1.069a1.061 1.061 0 0 1-1.066-1.062l-.002-4.746-4.746-.002a1.061 1.061 0 0 1-1.062-1.066 1.069 1.069 0 0 1 1.069-1.064l4.739.002-.002-4.739c0-.588.476-1.067 1.064-1.069a1.061 1.061 0 0 1 1.066 1.062l.002 4.746 4.746.002c.588 0 1.063.477 1.062 1.066a1.069 1.069 0 0 1-1.069 1.064l-4.739-.002Z" />
        </svg>
    );
}

const Memo = memo(IconAddSimple);
export default Memo;
