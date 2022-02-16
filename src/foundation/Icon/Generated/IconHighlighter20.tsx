import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconHighlighter20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHighlighter20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M14.982 2.961a1.667 1.667 0 0 0-2.256-.093L5.585 8.921c-.217.183-.383.42-.483.685l-1.244 3.313a.833.833 0 0 0 .18.87l-1.416 1.326-.072.079c-.86.935-.196 2.445 1.073 2.445H4.88c.351 0 .691-.127.956-.357l.93-.808c.211.117.466.14.7.052l3.312-1.245c.265-.1.501-.266.685-.482l6.052-7.141a1.667 1.667 0 0 0-.093-2.256l-2.44-2.44Zm1.557 3.325-2.44-2.44a.417.417 0 0 0-.565-.024L6.676 9.635l4.073 4.073 5.813-6.858a.417.417 0 0 0-.023-.564Zm-11.417 6.82.89-2.367 3.633 3.633-2.368.89-2.155-2.155Zm.734 2.502-.934-.934-1.411 1.321-.041.045a.208.208 0 0 0 .153.349H4.88a.21.21 0 0 0 .137-.051l.84-.73Z"
                    clipRule="evenodd"
                />
                <path d="M10.916 16.222a.625.625 0 1 0 0 1.25h4.248a.625.625 0 0 0 0-1.25h-4.248Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHighlighter20);
export default Memo;
