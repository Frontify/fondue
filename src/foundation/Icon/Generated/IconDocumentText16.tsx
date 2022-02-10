import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentText16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDocumentText16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4.769 11.636c0 .335.272.607.609.607h5.479a.607.607 0 0 0 .609-.607.607.607 0 0 0-.61-.605H5.379a.607.607 0 0 0-.61.605Zm.609-1.818a.607.607 0 0 1-.61-.606c0-.334.273-.606.61-.606h5.479c.336 0 .609.272.609.606a.607.607 0 0 1-.61.606H5.379Zm-.609-3.03c0 .335.272.606.609.606h.913a.607.607 0 0 0 .609-.606.607.607 0 0 0-.61-.606h-.912a.607.607 0 0 0-.61.606Z" />
                <path
                    fillRule="evenodd"
                    d="M4.392 1.333a2.06 2.06 0 0 0-2.059 2.055v9.225c0 1.137.925 2.054 2.066 2.054h7.202a2.059 2.059 0 0 0 2.066-2.048v-6.77c0-.285-.169-.674-.377-.87l-3.496-3.29a1.493 1.493 0 0 0-.892-.356h-4.51Zm4.121 5.642h4.123v5.645c0 .564-.46 1.021-1.027 1.021H4.392a1.024 1.024 0 0 1-1.028-1.02V3.38c0-.565.465-1.022 1.033-1.022H8v4.103c0 .285.23.513.513.513Zm4.123-1.026V5.83L9.03 2.456v3.493h3.607Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentText16);
export default Memo;
