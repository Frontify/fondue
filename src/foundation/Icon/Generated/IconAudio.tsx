import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAudio(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAudio"
            {...props}
        >
            <path d="M9.5 7.457v9.913a.825.825 0 0 1-.01.131c.006.093.01.187.01.282 0 2.053-1.679 3.717-3.75 3.717C3.679 21.5 2 19.836 2 17.783s1.679-3.718 3.75-3.718c.77 0 1.487.23 2.083.626V3.326a.83.83 0 0 1 .834-.826h12.5c.46 0 .833.37.833.826V17.37a.825.825 0 0 1-.01.131c.006.093.01.187.01.282 0 2.053-1.679 3.717-3.75 3.717-2.071 0-3.75-1.664-3.75-3.717s1.679-3.718 3.75-3.718c.77 0 1.487.23 2.083.626V7.457H9.5Zm0-1.653h10.833V4.152H9.5v1.652ZM5.75 19.848c1.15 0 2.083-.925 2.083-2.065 0-1.141-.932-2.066-2.083-2.066-1.15 0-2.083.925-2.083 2.066 0 1.14.932 2.065 2.083 2.065Zm12.5 0c1.15 0 2.083-.925 2.083-2.065 0-1.141-.932-2.066-2.083-2.066-1.15 0-2.083.925-2.083 2.066 0 1.14.932 2.065 2.083 2.065Z" />
        </svg>
    );
}

const Memo = memo(IconAudio);
export default Memo;
