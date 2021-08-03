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

function IconSnippet(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconSnippet"
            {...props}
        >
            <path d="M10.789 16.522a.77.77 0 01-1.424-.582l3.461-8.462a.77.77 0 111.424.583l-3.461 8.461zm5.309-.86l3.994-3.635-3.998-3.692a.77.77 0 111.043-1.13l4.616 4.261a.77.77 0 01-.005 1.135L17.133 16.8a.77.77 0 11-1.035-1.138zm-12.19-3.635l3.994 3.635A.77.77 0 116.867 16.8l-4.615-4.2a.77.77 0 01-.005-1.134l4.616-4.262a.77.77 0 011.043 1.13l-3.998 3.693z" />
        </svg>
    );
}

const MemoIconSnippet = React.memo(IconSnippet);
export default MemoIconSnippet;
