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

function IconAlignRight(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M22 3.865v16.27c0 .478-.39.865-.87.865a.867.867 0 01-.87-.865V3.865c0-.478.39-.865.87-.865s.87.387.87.865zm-6 7.222l-4.609-4.609a.84.84 0 010-1.217.84.84 0 011.218 0l6.087 6.087a.84.84 0 010 1.217l-6.087 6.087a.84.84 0 01-1.218 0 .84.84 0 010-1.217L16 12.826H2.87c-.522 0-.87-.348-.87-.87 0-.521.348-.869.87-.869H16z" />
        </svg>
    );
}

const MemoIconAlignRight = React.memo(IconAlignRight);
export default MemoIconAlignRight;
