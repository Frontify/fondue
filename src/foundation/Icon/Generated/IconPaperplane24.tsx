import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperplane24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPaperplane24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m7.46 15.844-5.025-2.708a.842.842 0 0 1-.024-1.461l16.37-9.564c.543-.317 1.219.084 1.219.723v18.331c0 .627-.65 1.03-1.193.739l-5.613-3.006-4.443 2.965c-.54.36-1.257-.033-1.26-.693l-.031-5.326Zm.628-1.545-3.58-1.93 10.975-6.412-7.395 8.342ZM18.37 6.764l-4.095 10.831 4.095 2.193V6.764ZM12.65 17.27l-3.538 2.362-.024-3.98 7.278-8.21-3.716 9.828Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPaperplane24);
export default Memo;
