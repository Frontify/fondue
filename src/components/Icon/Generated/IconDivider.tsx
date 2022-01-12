import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDivider(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconDivider"
            {...props}
        >
            <path d="M5.818 3.545a.773.773 0 0 0-.773.773v15.455c0 .426.346.772.773.772h12.364a.773.773 0 0 0 .773-.772V4.318a.773.773 0 0 0-.773-.773H5.818Zm0-1.545h12.364A2.318 2.318 0 0 1 20.5 4.318v15.455a2.318 2.318 0 0 1-2.318 2.318H5.818A2.318 2.318 0 0 1 3.5 19.773V4.318A2.318 2.318 0 0 1 5.818 2Zm1.546 10.818a.773.773 0 0 1 0-1.545h9.272a.773.773 0 1 1 0 1.545H7.364Z" />
        </svg>
    );
}

const Memo = memo(IconDivider);
export default Memo;
