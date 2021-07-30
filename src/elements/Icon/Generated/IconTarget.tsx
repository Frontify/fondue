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

function IconTarget(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M15.137 6.442l-.19-1.769L18.632 1l.62 3.884 3.748.47-3.713 3.702-1.7-.183a8.409 8.409 0 011.4 4.66c0 4.676-3.802 8.467-8.493 8.467C5.803 22 2 18.21 2 13.533c0-4.676 3.803-8.467 8.494-8.467 1.713 0 3.308.506 4.643 1.376zm-.314 1.672a6.934 6.934 0 00-4.33-1.509c-3.837 0-6.949 3.102-6.949 6.928s3.112 6.928 6.95 6.928 6.949-3.102 6.949-6.928c0-1.64-.571-3.146-1.526-4.332l-1.098 1.1c.678.9 1.08 2.02 1.08 3.232 0 2.976-2.42 5.388-5.405 5.388-2.985 0-5.405-2.412-5.405-5.388s2.42-5.388 5.405-5.388c1.211 0 2.33.397 3.231 1.069l1.098-1.1zM12.62 10.32a3.851 3.851 0 00-2.126-.636 3.855 3.855 0 00-3.861 3.849 3.855 3.855 0 003.86 3.849 3.855 3.855 0 003.861-3.85c0-.785-.236-1.515-.641-2.124l-1.128 1.13a2.313 2.313 0 01-2.09 3.304 2.313 2.313 0 01-2.318-2.31 2.313 2.313 0 012.317-2.308c.357 0 .696.08.999.225l1.127-1.129zm-2.126 3.983a.77.77 0 10-.773-.77c0 .425.346.77.773.77zm7.085-10.076l-1.023 1.02.222 1.974 1.941.23 1.048-1.044-1.94-.232-.248-1.948z" />
        </svg>
    );
}

const MemoIconTarget = React.memo(IconTarget);
export default MemoIconTarget;
