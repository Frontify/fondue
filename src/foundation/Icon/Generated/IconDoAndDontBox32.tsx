import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDontBox32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDoAndDontBox32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M25.725 20.79a.88.88 0 0 0-1.243.02l-2.46 2.537-.646-.73a.88.88 0 0 0-1.316 1.166l1.275 1.44a.879.879 0 0 0 1.29.03l3.12-3.22a.88.88 0 0 0-.02-1.243ZM7.32 7.32a.88.88 0 0 0 0 1.243l.87.87-.87.87a.88.88 0 0 0 1.243 1.244l.87-.87.87.87a.88.88 0 0 0 1.244-1.244l-.87-.87.87-.87a.88.88 0 0 0-1.244-1.243l-.87.87-.87-.87a.88.88 0 0 0-1.243 0Z" />
                <path
                    fillRule="evenodd"
                    d="M14.838 5.743A6.593 6.593 0 1 0 4.892 14.2v9.493c0 .708.25 1.312.751 1.813.501.5 1.105.751 1.813.751h9.705a6.593 6.593 0 1 0 9.946-8.456V8.309a2.47 2.47 0 0 0-.75-1.813 2.47 2.47 0 0 0-1.813-.752h-9.706Zm-8.1 9.61A6.593 6.593 0 0 0 15.64 7.59h8.904c.218 0 .352.056.507.211.155.155.21.29.21.508v8.338a6.593 6.593 0 0 0-8.902 7.764H7.457a.633.633 0 0 1-.507-.21.633.633 0 0 1-.21-.508v-8.338ZM22.74 27.576a4.835 4.835 0 1 0 0-9.67 4.835 4.835 0 0 0 0 9.67ZM9.26 14.095a4.835 4.835 0 1 0 0-9.67 4.835 4.835 0 0 0 0 9.67Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDontBox32);
export default Memo;
