import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlayFrame12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlayFrame12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M4.462 5.557v2.634c.02.308.166.556.42.676a.76.76 0 0 0 .342.077.7.7 0 0 0 .45-.157L7.6 7.473a.758.758 0 0 0 .323-.618.741.741 0 0 0-.343-.625L5.63 4.936a.758.758 0 0 0-.751-.048c-.267.154-.417.396-.417.67Zm2.674 1.301L5.231 5.595 5.23 8.16l1.906-1.303Z" />
                <path d="M2.154 1.35h7.692c.637 0 1.154.517 1.154 1.154v6.923c0 .637-.517 1.154-1.154 1.154H2.154A1.154 1.154 0 0 1 1 9.427V2.504c0-.637.517-1.154 1.154-1.154Zm-.385 2.692v5.385c0 .212.172.385.385.385h7.692a.385.385 0 0 0 .385-.385V4.042H1.769Zm8.462-.769H1.769v-.77c0-.212.172-.384.385-.384h7.692c.213 0 .385.172.385.385v.77Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlayFrame12);
export default Memo;
