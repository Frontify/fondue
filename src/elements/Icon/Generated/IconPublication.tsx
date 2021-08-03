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

function IconPublication(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconPublication"
            {...props}
        >
            <path d="M15.483 5.957L4.508 12.369l3.58 1.93 7.395-8.342zm2.887.807l-4.095 10.831 4.095 2.193V6.764zM12.65 17.27l3.716-9.828-7.278 8.21.024 3.98 3.538-2.362zm-5.19-1.426l-5.025-2.708a.842.842 0 01-.024-1.461l16.37-9.564c.543-.317 1.219.084 1.219.723v18.331c0 .627-.65 1.03-1.193.739l-5.613-3.006-4.443 2.965c-.54.36-1.257-.033-1.26-.693l-.031-5.326z" />
        </svg>
    );
}

const MemoIconPublication = React.memo(IconPublication);
export default MemoIconPublication;
