import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCampaign(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCampaign"
            {...props}
        >
            <path d="M9.5 14.581h-.833v6.595a.829.829 0 0 1-.834.824H5.68a.832.832 0 0 1-.81-.633L3.133 14.18A2.464 2.464 0 0 1 2 12.108V7.987c0-1.366 1.12-2.473 2.5-2.473h6.667l4.908-3.237c.766-.505 1.801-.3 2.312.457.182.271.28.59.28.915v12.798c0 .91-.747 1.648-1.667 1.648a1.68 1.68 0 0 1-.925-.277l-4.908-3.237H9.5Zm-1.667-1.648v-5.77H4.5a.829.829 0 0 0-.833.824v4.121c0 .456.373.825.833.825h3.333ZM6.337 20.35H7v-5.77H4.945l1.392 5.77ZM9.5 7.163v5.77h2.171L17 16.447V3.649l-5.329 3.514H9.5Zm11.667 0c.46 0 .833.373.833.833v4.103a.833.833 0 1 1-1.667 0V7.996c0-.46.373-.833.834-.833Z" />
        </svg>
    );
}

const Memo = memo(IconCampaign);
export default Memo;
