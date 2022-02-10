import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentCheck20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDocumentCheck20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.362 12.366a.763.763 0 0 1 1.074.106l.72.876 2.458-2.458a.763.763 0 1 1 1.079 1.08L9.64 15.021a.763.763 0 0 1-1.13-.055L7.257 13.44a.763.763 0 0 1 .105-1.075Z" />
                <path
                    fillRule="evenodd"
                    d="M2.917 4.704a3.042 3.042 0 0 1 3.047-3.037h5.052c.417 0 .997.227 1.303.516l4.216 3.967c.303.285.548.853.548 1.273v7.875a3.036 3.036 0 0 1-3.039 3.035H5.956a3.04 3.04 0 0 1-3.04-3.037V4.704Zm7.724 4.014h5.154v6.818c0 .837-.681 1.515-1.515 1.515H5.72c-.837 0-1.516-.68-1.516-1.51V4.459c0-.834.68-1.51 1.527-1.51H10v5.129a.64.64 0 0 0 .64.64Zm5.154-1.43v.148h-4.507V3.069l4.507 4.219Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentCheck20);
export default Memo;
