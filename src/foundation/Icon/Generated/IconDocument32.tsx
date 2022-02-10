import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocument32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDocument32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.542 2.667a4.867 4.867 0 0 0-4.875 4.86v16.946a4.865 4.865 0 0 0 4.862 4.86h12.942a4.857 4.857 0 0 0 4.862-4.855V11.876c0-.672-.393-1.58-.877-2.037L19.71 3.494c-.49-.462-1.419-.826-2.086-.826H9.542Zm15.73 11.282h-8.247A1.023 1.023 0 0 1 16 12.923V4.718H9.169a2.425 2.425 0 0 0-2.442 2.415v17.734a2.424 2.424 0 0 0 2.425 2.415h13.696a2.428 2.428 0 0 0 2.425-2.424v-10.91Zm0-2.052v-.236L18.06 4.91v6.986h7.213Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocument32);
export default Memo;
