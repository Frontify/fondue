import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAssets(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAssets"
            {...props}
        >
            <path d="M12.371 16.198h5.781c.638 0 1.182-.234 1.631-.701.45-.467.674-1.028.674-1.682v-7.87c0-.654-.225-1.212-.674-1.672-.449-.46-.993-.691-1.63-.691H5.847c-.638 0-1.182.23-1.631.69a2.307 2.307 0 0 0-.674 1.673v7.87c0 .667.225 1.231.674 1.692.449.46.993.69 1.63.69h2.305v2.925c0 .213.059.347.176.4.117.053.254.007.41-.14l3.633-3.184ZM6.61 17.78h-.761a3.682 3.682 0 0 1-1.504-.31 3.79 3.79 0 0 1-1.221-.852 4.135 4.135 0 0 1-.82-1.251A3.869 3.869 0 0 1 2 13.835v-7.89c0-.547.1-1.061.303-1.542.202-.48.475-.898.82-1.252a3.868 3.868 0 0 1 1.22-.84c.47-.208.97-.311 1.505-.311h12.304c.534 0 1.035.103 1.504.31a3.868 3.868 0 0 1 2.041 2.093c.202.48.303.995.303 1.542v7.89c0 .547-.1 1.058-.303 1.532a4.135 4.135 0 0 1-.82 1.251 3.79 3.79 0 0 1-1.22.851c-.47.207-.97.31-1.505.31h-4.96l-4.395 3.686c-.6.507-1.113.654-1.543.44-.43-.214-.645-.72-.645-1.522V17.78Zm.782-6.308c-.43 0-.795-.157-1.094-.47-.3-.314-.45-.685-.45-1.112 0-.44.15-.814.45-1.121.3-.308.664-.461 1.094-.461.416 0 .774.153 1.074.46.3.308.45.681.45 1.122 0 .427-.15.798-.45 1.111-.3.314-.658.47-1.074.47Zm4.609 0c-.43 0-.794-.157-1.094-.47-.3-.314-.449-.685-.449-1.112 0-.44.15-.814.45-1.121.299-.308.663-.461 1.093-.461.43 0 .794.153 1.094.46.3.308.449.681.449 1.122 0 .427-.15.798-.45 1.111-.299.314-.663.47-1.093.47Zm4.61 0c-.417 0-.775-.157-1.075-.47-.3-.314-.45-.685-.45-1.112 0-.44.15-.814.45-1.121.3-.308.658-.461 1.074-.461.43 0 .795.153 1.094.46.3.308.45.681.45 1.122 0 .427-.15.798-.45 1.111-.3.314-.664.47-1.094.47Z" />
        </svg>
    );
}

const Memo = memo(IconAssets);
export default Memo;
