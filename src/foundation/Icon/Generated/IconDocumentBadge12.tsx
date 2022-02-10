import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentBadge12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDocumentBadge12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.172 2.823C2.172 1.816 2.998 1 4.017 1h3.059c.252 0 .604.137.79.31l2.552 2.38c.183.171.332.512.332.764v4.725A1.83 1.83 0 0 1 8.91 11H4.012a1.833 1.833 0 0 1-1.84-1.823v-.073a1.366 1.366 0 0 1-.922-1.286c0-.594.385-1.099.922-1.286v-3.71Zm.78 6.502v-.143h3.367c.764 0 1.382-.61 1.382-1.364 0-.753-.618-1.363-1.382-1.363H2.951v-3.78c0-.5.412-.906.925-.906H6.46v3.077c0 .214.174.385.388.385H9.97v4.09a.915.915 0 0 1-.917.91H3.869a.913.913 0 0 1-.918-.906ZM9.97 4.373v.089H7.24v-2.62l2.73 2.53ZM2.172 7.818c0-.25.206-.454.46-.454H6.32c.255 0 .46.203.46.454a.458.458 0 0 1-.46.455H2.632a.458.458 0 0 1-.46-.455Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentBadge12);
export default Memo;
