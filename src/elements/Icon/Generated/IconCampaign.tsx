import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconCampaign(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
            <path d="M9.5 14.581h-.833v6.595a.829.829 0 01-.834.824H5.68a.832.832 0 01-.81-.633L3.133 14.18A2.464 2.464 0 012 12.108V7.987c0-1.366 1.12-2.473 2.5-2.473h6.667l4.908-3.237c.766-.505 1.801-.3 2.312.457.182.271.28.59.28.915v12.798c0 .91-.747 1.648-1.667 1.648a1.68 1.68 0 01-.925-.277l-4.908-3.237H9.5zm-1.667-1.648v-5.77H4.5a.829.829 0 00-.833.824v4.121c0 .456.373.825.833.825h3.333zM6.337 20.35H7v-5.77H4.945l1.392 5.77zM9.5 7.163v5.77h2.171L17 16.447V3.649l-5.329 3.514H9.5zm11.667 0c.46 0 .833.373.833.833v4.103a.833.833 0 11-1.667 0V7.996c0-.46.373-.833.834-.833z" />
        </svg>
    );
}

const MemoIconCampaign = React.memo(IconCampaign);
export default MemoIconCampaign;
