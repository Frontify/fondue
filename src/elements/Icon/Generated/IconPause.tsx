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

function IconPause(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={customClassName}
            {...props}
        >
            <g id="Group" transform="translate(5.000000, 4.000000)">
                <rect id="Rectangle" x={0} y={0} width={6} height={16} rx={1} />
                <rect id="Rectangle" x={8} y={0} width={6} height={16} rx={1} />
            </g>
        </svg>
    );
}

const MemoIconPause = React.memo(IconPause);
export default MemoIconPause;
