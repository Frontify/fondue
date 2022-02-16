import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperplane20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPaperplane20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.216 13.203 2.03 10.946a.702.702 0 0 1-.02-1.217L15.65 1.76c.453-.264 1.016.07 1.016.603v15.276c0 .522-.542.857-.994.615l-4.677-2.505-3.703 2.471c-.45.3-1.047-.027-1.05-.577l-.026-4.439Zm.524-1.287-2.984-1.608 9.147-5.344-6.163 6.951Zm8.568-6.279-3.412 9.026 3.412 1.827V5.637Zm-4.766 8.755-2.95 1.968-.018-3.317 6.064-6.841-3.096 8.19Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPaperplane20);
export default Memo;
