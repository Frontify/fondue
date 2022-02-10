import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentArrowRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDocumentArrowRight20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.38 10.71a.628.628 0 0 0-.02.887l.704.758-3.494-.04a.65.65 0 0 0-.646.62.604.604 0 0 0 .61.627l3.486.04-.784.728a.635.635 0 0 0-.03.888.628.628 0 0 0 .888 0l1.877-1.784a.658.658 0 0 0 .2-.444.62.62 0 0 0-.175-.45l-1.728-1.819a.635.635 0 0 0-.888-.011Z" />
                <path
                    fillRule="evenodd"
                    d="M2.917 4.704a3.042 3.042 0 0 1 3.047-3.037h5.052c.417 0 .997.227 1.303.516l4.216 3.967c.303.285.548.853.548 1.273v7.875a3.036 3.036 0 0 1-3.039 3.035H5.956a3.04 3.04 0 0 1-3.04-3.037V4.704Zm7.724 4.014h5.154v6.818c0 .837-.681 1.515-1.515 1.515H5.72c-.837 0-1.516-.68-1.516-1.51V4.459c0-.834.68-1.51 1.527-1.51H10v5.129a.64.64 0 0 0 .64.64Zm5.154-1.43v.148h-4.507V3.069l4.507 4.219Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentArrowRight20);
export default Memo;
