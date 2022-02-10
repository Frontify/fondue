import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentText24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDocumentText24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.153 17.454c0 .503.409.91.913.91h8.22a.911.911 0 0 0 .912-.91.911.911 0 0 0-.913-.909H8.066a.911.911 0 0 0-.913.91Zm.913-2.727a.911.911 0 0 1-.913-.909c0-.502.409-.909.913-.909h8.22c.503 0 .912.407.912.91a.911.911 0 0 1-.913.908H8.066Zm-.913-4.545c0 .502.409.909.913.909h1.37a.911.911 0 0 0 .913-.91.911.911 0 0 0-.913-.908h-1.37a.911.911 0 0 0-.913.909Z" />
                <path
                    fillRule="evenodd"
                    d="M6.587 2A3.089 3.089 0 0 0 3.5 5.081V18.92A3.087 3.087 0 0 0 6.598 22h10.804c1.707 0 3.098-1.375 3.098-3.072V8.773c0-.427-.253-1.011-.566-1.305l-5.243-4.936C14.375 2.235 13.779 2 13.352 2H6.587Zm6.182 8.461h6.186v8.469c0 .846-.69 1.532-1.542 1.532H6.587a1.536 1.536 0 0 1-1.542-1.532V5.07c0-.846.698-1.532 1.55-1.532H12v6.154c0 .428.344.77.77.77Zm6.186-1.538v-.177l-5.41-5.063v5.24h5.41Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentText24);
export default Memo;
