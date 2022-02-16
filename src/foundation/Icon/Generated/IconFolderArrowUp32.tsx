import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFolderArrowUp32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFolderArrowUp32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M16.878 22.176v-6.283l1.657 1.637a.795.795 0 0 0 .628.27.892.892 0 0 0 .63-.27.856.856 0 0 0 .259-.629.856.856 0 0 0-.26-.629l-3.074-3.054a.833.833 0 0 0-.309-.28.922.922 0 0 0-.788-.02.833.833 0 0 0-.3.22l-3.134 3.134a.844.844 0 0 0-.269.639c.007.24.097.446.27.619.172.173.382.26.628.26a.856.856 0 0 0 .629-.26l1.657-1.657v6.303c0 .24.086.446.26.62a.868.868 0 0 0 .638.259c.24 0 .446-.087.619-.26a.845.845 0 0 0 .26-.619Z" />
                <path
                    fillRule="evenodd"
                    d="M26.247 8.099h-8.98l-.668-2.142c-.17-.537-.51-.997-1.025-1.381C15.06 4.192 14.518 4 13.95 4H6.766c-.569 0-1.114.192-1.635.576-.522.384-.868.844-1.037 1.381L2.76 10.241a2.352 2.352 0 0 0-.07.334 1.051 1.051 0 0 0 0 .31.471.471 0 0 0-.022.15v13.46c0 .86.299 1.59.898 2.188.598.599 1.328.898 2.187.898h20.495c.845 0 1.57-.3 2.177-.898a2.96 2.96 0 0 0 .91-2.188v-13.31c0-.86-.304-1.59-.91-2.188a2.989 2.989 0 0 0-2.177-.898ZM14.71 7.039l.254 1.06H5.752l.254-1.06a1.33 1.33 0 0 1 .483-.702 1.25 1.25 0 0 1 .783-.287h6.172c.276 0 .537.095.783.287.245.192.406.426.483.703ZM4.716 23.483V12.198c0-.568.2-1.052.599-1.45.399-.4.882-.6 1.45-.6h18.47c.567 0 1.05.2 1.45.6.4.398.599.882.599 1.45v11.284c0 .568-.2 1.052-.6 1.45-.398.4-.882.6-1.45.6H6.765c-.568 0-1.051-.2-1.45-.6a1.97 1.97 0 0 1-.599-1.45Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconFolderArrowUp32);
export default Memo;
