import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentBadge20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDocumentBadge20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.62 4.704c0-1.678 1.376-3.037 3.075-3.037h5.098c.421 0 1.007.227 1.316.516l4.254 3.967c.306.285.554.853.554 1.273v7.875c0 1.676-1.371 3.035-3.067 3.035H6.687c-1.694 0-3.067-1.364-3.067-3.037v-.122a2.276 2.276 0 0 1-1.537-2.144c0-.99.642-1.831 1.537-2.143V4.704Zm1.3 10.838v-.24h5.612c1.272 0 2.304-1.017 2.304-2.272s-1.032-2.273-2.304-2.273H4.919v-6.3c0-.833.686-1.508 1.54-1.508h4.31v5.128c0 .356.289.64.646.64h5.202v6.82c0 .836-.688 1.514-1.53 1.514H6.45c-.845 0-1.53-.68-1.53-1.51Zm11.697-8.254v.148h-4.55V3.069l4.55 4.219ZM3.62 13.03c0-.418.343-.757.768-.757h6.144c.424 0 .768.339.768.757a.763.763 0 0 1-.768.758H4.388a.763.763 0 0 1-.768-.758Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentBadge20);
export default Memo;
