import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAlignRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAlignRight"
            {...props}
        >
            <path d="M22 3.865v16.27c0 .478-.39.865-.87.865a.867.867 0 01-.87-.865V3.865c0-.478.39-.865.87-.865s.87.387.87.865zm-6 7.222l-4.609-4.609a.84.84 0 010-1.217.84.84 0 011.218 0l6.087 6.087a.84.84 0 010 1.217l-6.087 6.087a.84.84 0 01-1.218 0 .84.84 0 010-1.217L16 12.826H2.87c-.522 0-.87-.348-.87-.87 0-.521.348-.869.87-.869H16z" />
        </svg>
    );
}

const MemoIconAlignRight = React.memo(IconAlignRight);
export default MemoIconAlignRight;
