import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeading20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHeading20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8.333 11.943H6.836V9.038H3.997v2.905H2.5V5h1.497v2.777h2.84V5h1.496v6.943ZM2.361 14.72a.694.694 0 1 1 0-1.388H17.64a.694.694 0 0 1 0 1.388H2.361Zm9.272-2.777h1.45V5h-1.45L10 6.165v1.378l1.562-1.104h.07v5.504Z"
            />
        </svg>
    );
}

const Memo = memo(IconHeading20);
export default Memo;
