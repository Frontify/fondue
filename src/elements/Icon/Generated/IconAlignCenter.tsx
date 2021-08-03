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

function IconAlignCenter(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconAlignCenter"
            {...props}
        >
            <path d="M11.223 5.047c0-.408.344-.74.77-.74.424 0 .769.332.769.74v13.906c0 .408-.345.74-.77.74-.425 0-.769-.332-.769-.74V5.047zm-3.136 7.722H2.762a.77.77 0 010-1.538h5.322L6.007 8.634a.77.77 0 111.201-.96l3.006 3.756c.295.27.334.727.08 1.044L7.217 16.31a.77.77 0 01-1.081.12.766.766 0 01-.12-1.079l2.07-2.582zm5.543-1.148a.775.775 0 01.07-.102l3.076-3.846a.77.77 0 111.202.961L15.9 11.231h5.323a.77.77 0 010 1.538h-5.332l2.083 2.604a.77.77 0 01-1.202.96l-3.077-3.846a.77.77 0 01-.065-.866z" />
        </svg>
    );
}

const MemoIconAlignCenter = React.memo(IconAlignCenter);
export default MemoIconAlignCenter;
