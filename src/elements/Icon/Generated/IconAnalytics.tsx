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

function IconAnalytics(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconAnalytics"
            {...props}
        >
            <path d="M20.535 11.277a8.134 8.134 0 00-.771-2.93 8.683 8.683 0 00-1.7-2.411 8.683 8.683 0 00-2.412-1.7 8.134 8.134 0 00-2.93-.771v7.812h7.813zm0 1.446h-9.258V3.465a8.424 8.424 0 00-3.076.85 8.416 8.416 0 00-2.49 1.865 8.906 8.906 0 00-1.67 2.646A8.253 8.253 0 003.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 001.836 2.724A8.663 8.663 0 008.66 19.9a8.343 8.343 0 003.34.674c1.12 0 2.178-.205 3.174-.615a8.906 8.906 0 002.646-1.67 8.416 8.416 0 001.866-2.49 8.424 8.424 0 00.85-3.076zM12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 014.92 19.08a10.035 10.035 0 01-2.139-3.184A9.801 9.801 0 012 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 014.92 4.92 10.035 10.035 0 018.104 2.78 9.801 9.801 0 0112 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0119.08 4.92a10.035 10.035 0 012.139 3.184A9.801 9.801 0 0122 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 01-2.139 3.184 10.035 10.035 0 01-3.184 2.139A9.801 9.801 0 0112 22z" />
        </svg>
    );
}

const MemoIconAnalytics = React.memo(IconAnalytics);
export default MemoIconAnalytics;
