import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCampaignActivity(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCampaignActivity"
            {...props}
        >
            <path d="M16.09 4.928H7.91v.74a.913.913 0 0 1-.91.918.913.913 0 0 1-.91-.918v-.74H4.309a.773.773 0 0 0-.77.776V9.09h16.924V5.704a.773.773 0 0 0-.77-.776H17.91v.74a.913.913 0 0 1-.909.918.913.913 0 0 1-.91-.918v-.74Zm1.82-1.552h1.782A2.318 2.318 0 0 1 22 5.704v13.968A2.318 2.318 0 0 1 19.692 22H4.308A2.318 2.318 0 0 1 2 19.672V5.704a2.318 2.318 0 0 1 2.308-2.328H6.09v-.459C6.09 2.411 6.498 2 7 2s.91.41.91.917v.459h8.18v-.459c0-.506.408-.917.91-.917s.91.41.91.917v.459Zm2.552 7.266H3.538v9.03c0 .429.345.776.77.776h15.384c.425 0 .77-.347.77-.776v-9.03Zm-6.702 2.173a.903.903 0 0 1 1.285 0 .923.923 0 0 1 0 1.297l-3.636 3.669a.904.904 0 0 1-1.345-.067L8.57 15.88a.923.923 0 0 1 .126-1.29.904.904 0 0 1 1.28.126l.856 1.053 2.928-2.954Z" />
        </svg>
    );
}

const Memo = memo(IconCampaignActivity);
export default Memo;
