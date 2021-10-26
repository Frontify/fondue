import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCallout(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 25"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCallout"
            {...props}
        >
            <path d="M14 20.74a1.975 1.975 0 100-3.95 1.975 1.975 0 000 3.95zm0-14.814c-.818 0-1.481.663-1.481 1.481 0 .044.008.084.012.125h-.008l.591 7.176h.005a.888.888 0 00.88.816c.467 0 .844-.36.883-.816h.005l.59-7.176h-.008c.004-.041.012-.081.012-.125 0-.818-.663-1.481-1.482-1.481zm12.543 12.227L17.735 2.59C16.79.92 15.463 0 14.001 0c-1.464 0-2.79.92-3.736 2.59L1.457 18.153c-.94 1.664-1.045 3.283-.294 4.56.75 1.276 2.223 1.978 4.144 1.978h17.387c1.921 0 3.392-.702 4.143-1.978.752-1.276.647-2.896-.294-4.56zm-1.395 3.588c-.366.62-1.237.975-2.391.975H5.244c-1.154 0-2.026-.356-2.391-.975-.367-.621-.251-1.55.313-2.548l8.871-15.658c.563-.991 1.278-1.56 1.964-1.56.685 0 1.4.569 1.961 1.56l8.87 15.658c.566.998.681 1.927.316 2.548z" />
        </svg>
    );
}

const MemoIconCallout = React.memo(IconCallout);
export default MemoIconCallout;
