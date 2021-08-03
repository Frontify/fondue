import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconExpand(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18.478 4.514h-2.653a.753.753 0 01-.75-.757c0-.406.336-.757.75-.757h4.425c.209 0 .398.086.534.225a.79.79 0 01.216.542v4.521a.754.754 0 01-.74.767c-.398 0-.741-.343-.741-.767V5.591l-5.024 5.134c-.3.306-.761.3-1.05.003a.78.78 0 01.003-1.074l5.03-5.14zM5.522 19.486h2.653c.415 0 .75.34.75.757a.762.762 0 01-.75.757H3.75a.753.753 0 01-.75-.767v-4.521c0-.424.332-.767.74-.767.398 0 .741.343.741.767v2.697l5.024-5.134c.3-.306.761-.3 1.05-.003a.78.78 0 01-.003 1.074l-5.03 5.14z" />
        </svg>
    );
}

const MemoIconExpand = React.memo(IconExpand);
export default MemoIconExpand;
