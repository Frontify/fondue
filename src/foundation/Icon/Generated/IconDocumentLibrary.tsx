import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentLibrary(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
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
            name="IconDocumentLibrary"
            {...props}
        >
            <path d="M5.846 4.498A3.292 3.292 0 019.13 1.485h5.465c.451 0 1.079.247 1.41.559l4.56 4.292c.328.308.594.922.594 1.376v8.52a3.283 3.283 0 01-3.006 3.27 3.284 3.284 0 01-3.276 3.013h-8.75a3.29 3.29 0 01-3.288-3.286V7.77a3.29 3.29 0 013.006-3.273zm1.382-.013h4.374c.451 0 1.078.247 1.41.559l.485.456V2.872H8.88c-.91 0-1.64.72-1.651 1.613zm7.662 2.326l.972.915h3.904v-.16L14.89 3.002v3.81zm2.446 2.302l.236.223c.328.308.594.922.594 1.376v7.415a1.64 1.64 0 001.6-1.638V9.113h-2.43zm-.564 3h-5.576a.692.692 0 01-.693-.693V5.872H5.885a1.64 1.64 0 00-1.651 1.633v11.99a1.64 1.64 0 001.639 1.633h9.26c.902 0 1.64-.734 1.64-1.639v-7.376zm0-1.387v-.16l-4.876-4.564v4.724h4.876z" />
        </svg>
    );
}

const MemoIconDocumentLibrary = React.memo(IconDocumentLibrary);
export default MemoIconDocumentLibrary;
