import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSubmit(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSubmit"
            {...props}
        >
            <path d="M18.955 10.462h-6.186a.767.767 0 01-.769-.77V3.538H6.877A1.82 1.82 0 005.045 5.35v13.3a1.82 1.82 0 001.819 1.812h10.272c1 0 1.819-.814 1.819-1.818v-8.182zm0-1.539v-.177l-5.41-5.063v5.24h5.41zM3.5 5.645A3.65 3.65 0 017.157 2h6.062c.5 0 1.196.273 1.564.62l5.059 4.76c.363.343.658 1.024.658 1.528v9.45A3.643 3.643 0 0116.853 22H7.147A3.649 3.649 0 013.5 18.355V5.645zm6.624 9.321l.863 1.052 2.95-2.95a.916.916 0 111.295 1.296l-3.664 3.663a.916.916 0 01-1.355-.066l-1.505-1.832a.916.916 0 111.416-1.163z" />
        </svg>
    );
}

const MemoIconSubmit = React.memo(IconSubmit);
export default MemoIconSubmit;
