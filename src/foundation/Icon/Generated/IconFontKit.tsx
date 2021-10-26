import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconFontKit(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFontKit"
            {...props}
        >
            <path d="M12.714 15.942h1.243v1.417h-3.914v-1.417h1.243v-5.05H9.468v.923H8.039v-2.34H15.961v2.34h-1.429v-.924h-1.818v5.051zM8.43 6.333v-1.42c0-.78.64-1.413 1.428-1.413h4.286c.789 0 1.428.633 1.428 1.413v1.42h5c.79 0 1.429.635 1.429 1.417v11.333c0 .783-.64 1.417-1.429 1.417H3.43A1.423 1.423 0 012 19.083V7.75c0-.782.64-1.417 1.429-1.417h5zm-5 1.417v11.333H20.57V7.75H3.43zm6.428-2.833v1.416h4.286V4.917H9.857z" />
        </svg>
    );
}

const MemoIconFontKit = React.memo(IconFontKit);
export default MemoIconFontKit;
