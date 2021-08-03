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

function IconMovePage(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconMovePage"
            {...props}
        >
            <path d="M18.955 10.462h-6.186a.767.767 0 01-.769-.77V3.538H6.877c-1.016 0-1.832.811-1.832 1.812v13.3c0 .995.815 1.812 1.819 1.812h10.272c1 0 1.819-.814 1.819-1.818v-8.182zm0-1.539v-.177l-5.41-5.063v5.24h5.41zM3.5 5.645A3.65 3.65 0 017.157 2h6.062c.5 0 1.196.273 1.564.62l5.059 4.76c.363.343.658 1.024.658 1.528v9.45A3.643 3.643 0 0116.853 22H7.147A3.649 3.649 0 013.5 18.355V5.645zm8.933 8.272a.753.753 0 01.023-1.065.762.762 0 011.066.014l2.074 2.182c.145.15.214.346.209.54a.79.79 0 01-.24.533l-2.252 2.14a.754.754 0 01-1.066 0c-.276-.285-.268-.77.037-1.065l.94-.873-4.182-.048a.725.725 0 01-.733-.753.78.78 0 01.775-.744l4.192.048-.843-.909z" />
        </svg>
    );
}

const MemoIconMovePage = React.memo(IconMovePage);
export default MemoIconMovePage;
