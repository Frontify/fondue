import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLightning20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLightning20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.91 8.38c-.2-.498-.57-.746-1.11-.746h-3.308l1.654-4.33c.227-.594.076-1.064-.454-1.41-.53-.346-1.021-.297-1.475.146l-8.512 8.301c-.379.368-.468.798-.268 1.29.2.491.565.737 1.095.737h3L5.78 16.665c-.227.594-.081 1.07.438 1.427.519.356 1.01.318 1.475-.114l8.918-8.301c.4-.368.5-.8.3-1.297Zm-7.628 2.805h-4.75l8.512-8.302-2.286 5.934H15.8L6.883 17.12l2.4-5.934Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLightning20);
export default Memo;
