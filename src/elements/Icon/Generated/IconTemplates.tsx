import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTemplates(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTemplates"
            {...props}
        >
            <path d="M5.407 8.398l6.612 3.389L18.6 8.4l-6.597-3.502-6.596 3.5zM12 19.108l8.74-4.515a.859.859 0 011.167.397.905.905 0 01-.386 1.2L12.4 20.9a.848.848 0 01-.8 0l-9.12-4.71a.905.905 0 01-.387-1.2.859.859 0 011.167-.397L12 19.107zm0-3.573l8.74-4.514a.859.859 0 011.167.397.905.905 0 01-.386 1.199l-9.121 4.71a.848.848 0 01-.8 0l-9.12-4.71a.905.905 0 01-.387-1.2.859.859 0 011.167-.396L12 15.535zM12.403 3.1l8.514 4.52a.905.905 0 01-.01 1.591l-8.498 4.373a.85.85 0 01-.778 0L3.098 9.21a.904.904 0 01-.01-1.592L11.603 3.1a.85.85 0 01.799 0z" />
        </svg>
    );
}

const MemoIconTemplates = React.memo(IconTemplates);
export default MemoIconTemplates;
