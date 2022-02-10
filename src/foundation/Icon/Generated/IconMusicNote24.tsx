import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMusicNote24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMusicNote24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.5 7.457v9.913a.825.825 0 0 1-.01.132c.006.092.01.186.01.28 0 2.054-1.679 3.718-3.75 3.718C3.679 21.5 2 19.836 2 17.783c0-2.054 1.679-3.718 3.75-3.718.77 0 1.487.23 2.083.626V3.326a.83.83 0 0 1 .834-.826h12.5c.46 0 .833.37.833.826V17.37a.821.821 0 0 1-.01.132c.006.092.01.186.01.28 0 2.054-1.679 3.718-3.75 3.718-2.071 0-3.75-1.664-3.75-3.717 0-2.054 1.679-3.718 3.75-3.718.77 0 1.488.23 2.083.626V7.457H9.5Zm0-1.653h10.833V4.152H9.5v1.652ZM7.833 17.783c0 1.14-.932 2.065-2.083 2.065a2.074 2.074 0 0 1-2.083-2.065c0-1.141.932-2.066 2.083-2.066 1.15 0 2.083.925 2.083 2.066Zm12.5 0c0 1.14-.932 2.065-2.083 2.065a2.074 2.074 0 0 1-2.083-2.065c0-1.141.932-2.066 2.083-2.066 1.15 0 2.083.925 2.083 2.066Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMusicNote24);
export default Memo;
