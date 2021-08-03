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

function IconCollectionLarge(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconCollectionLarge"
            {...props}
        >
            <path d="M10.35 8.65h4.3V5.7h-4.3v2.95zm0 1.7v2.8h4.3v-2.8h-4.3zm9.95-1.7V6a.3.3 0 00-.3-.3h-3.65v2.95h3.95zm0 1.7h-3.95v2.8h3.95v-2.8zM8.65 5.7H4a.3.3 0 00-.3.3v7.15h4.95V5.7zM3.7 14.85V18a.3.3 0 00.3.3h16a.3.3 0 00.3-.3v-3.15H3.7zM4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
    );
}

const MemoIconCollectionLarge = React.memo(IconCollectionLarge);
export default MemoIconCollectionLarge;
