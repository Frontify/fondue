import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSnippet(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconSnippet"
            {...props}
        >
            <path d="M10.789 16.522a.77.77 0 0 1-1.424-.582l3.461-8.462a.77.77 0 1 1 1.424.583l-3.461 8.461Zm5.309-.86 3.994-3.635-3.998-3.692a.77.77 0 1 1 1.043-1.13l4.616 4.261a.77.77 0 0 1-.005 1.135L17.133 16.8a.77.77 0 1 1-1.035-1.138Zm-12.19-3.635 3.994 3.635A.77.77 0 1 1 6.867 16.8l-4.615-4.2a.77.77 0 0 1-.005-1.134l4.616-4.262a.77.77 0 0 1 1.043 1.13l-3.998 3.693Z" />
        </svg>
    );
}

const Memo = memo(IconSnippet);
export default Memo;
