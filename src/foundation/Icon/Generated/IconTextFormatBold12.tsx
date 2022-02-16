import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatBold12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextFormatBold12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8.744 4.171c0-1.348-1-2.171-2.837-2.171H3v8h2.953C7.988 10 9 9.189 9 7.657c0-.868-.535-1.646-1.698-1.76.942-.137 1.442-.891 1.442-1.726Zm-3.907-.537h.896c.825 0 1.116.355 1.116.777 0 .469-.29.778-.919.778H4.837V3.634Zm2.28 3.897c0 .549-.42.846-1.187.846H4.837v-1.68H5.92c.825 0 1.197.263 1.197.834Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatBold12);
export default Memo;
