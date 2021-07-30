import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconAudio(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M9.5 7.457v9.913a.825.825 0 01-.01.131c.006.093.01.187.01.282 0 2.053-1.679 3.717-3.75 3.717C3.679 21.5 2 19.836 2 17.783s1.679-3.718 3.75-3.718c.77 0 1.487.23 2.083.626V3.326a.83.83 0 01.834-.826h12.5c.46 0 .833.37.833.826V17.37a.825.825 0 01-.01.131c.006.093.01.187.01.282 0 2.053-1.679 3.717-3.75 3.717-2.071 0-3.75-1.664-3.75-3.717s1.679-3.718 3.75-3.718c.77 0 1.487.23 2.083.626V7.457H9.5zm0-1.653h10.833V4.152H9.5v1.652zM5.75 19.848c1.15 0 2.083-.925 2.083-2.065 0-1.141-.932-2.066-2.083-2.066-1.15 0-2.083.925-2.083 2.066 0 1.14.932 2.065 2.083 2.065zm12.5 0c1.15 0 2.083-.925 2.083-2.065 0-1.141-.932-2.066-2.083-2.066-1.15 0-2.083.925-2.083 2.066 0 1.14.932 2.065 2.083 2.065z" />
        </svg>
    );
}

const MemoIconAudio = React.memo(IconAudio);
export default MemoIconAudio;
