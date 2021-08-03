import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconVolumeOn(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconVolumeOn"
            {...props}
        >
            <path d="M13.747 3.562a1 1 0 01.253.665v15.546a1 1 0 01-1.664.748L7.25 16H5a2 2 0 01-2-2v-4a2 2 0 012-2h2.249l5.087-4.52a1 1 0 011.411.082zm2.662 1.976a.75.75 0 011.053-.129C19.642 7.113 20.75 9.33 20.75 12c0 2.67-1.108 4.887-3.288 6.59a.75.75 0 11-.924-1.18c1.82-1.424 2.712-3.207 2.712-5.41 0-2.203-.892-3.986-2.712-5.41a.75.75 0 01-.129-1.052zM12.5 5.34L7.82 9.5H5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h2.82l4.68 4.16V5.34zm3.02 3.083a.75.75 0 011.057.098c.783.942 1.173 2.112 1.173 3.479s-.39 2.537-1.173 3.48a.75.75 0 11-1.154-.96c.55-.661.827-1.49.827-2.52s-.277-1.859-.827-2.52a.75.75 0 01.098-1.057z" />
        </svg>
    );
}

const MemoIconVolumeOn = React.memo(IconVolumeOn);
export default MemoIconVolumeOn;
