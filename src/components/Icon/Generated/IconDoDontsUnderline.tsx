import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDoDontsUnderline(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconDoDontsUnderline"
            {...props}
        >
            <path d="M7.26 12.722h1.242v1.428H4.589v-1.428H5.83V7.629H4.013v.931H2.584V6.2H10.506v2.36H9.078V7.63H7.26v5.093Zm-4.35 5.115a.91.91 0 1 1 0-1.818h18.18a.91.91 0 0 1 0 1.818H2.91Z" />
        </svg>
    );
}

const Memo = memo(IconDoDontsUnderline);
export default Memo;
