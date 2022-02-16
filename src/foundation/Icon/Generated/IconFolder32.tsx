import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFolder32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFolder32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.266 8.099h8.981c.845 0 1.57.3 2.177.898a2.96 2.96 0 0 1 .91 2.188v13.31c0 .86-.304 1.59-.91 2.188a2.989 2.989 0 0 1-2.177.898H5.752c-.86 0-1.589-.3-2.187-.898-.6-.599-.898-1.328-.898-2.188v-13.46c0-.054.007-.104.023-.15a1.051 1.051 0 0 1 0-.31 2.22 2.22 0 0 1 .069-.334l1.335-4.284c.17-.537.515-.997 1.037-1.381C5.652 4.192 6.197 4 6.766 4h7.184c.568 0 1.11.192 1.624.576.514.384.856.844 1.025 1.381l.667 2.142Zm-2.302 0-.254-1.06a1.331 1.331 0 0 0-.483-.702 1.251 1.251 0 0 0-.783-.287H7.272a1.25 1.25 0 0 0-.783.287 1.33 1.33 0 0 0-.483.703l-.254 1.059h9.212ZM4.716 23.482V12.198c0-.568.2-1.052.599-1.45.399-.4.882-.6 1.45-.6h18.47c.567 0 1.05.2 1.45.6.4.398.599.882.599 1.45v11.284c0 .568-.2 1.052-.6 1.45-.398.4-.882.6-1.45.6H6.765c-.568 0-1.051-.2-1.45-.6a1.97 1.97 0 0 1-.599-1.45Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFolder32);
export default Memo;
