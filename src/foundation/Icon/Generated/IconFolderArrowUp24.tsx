import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFolderArrowUp24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFolderArrowUp24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.659 16.632V11.92l1.242 1.227c.13.14.287.207.472.202a.67.67 0 0 0 .471-.202.642.642 0 0 0 .195-.471.642.642 0 0 0-.195-.472l-2.305-2.29A.649.649 0 0 0 12 9.63c-.1 0-.195.02-.284.06a.625.625 0 0 0-.225.164l-2.35 2.35c-.14.14-.207.3-.202.48a.657.657 0 0 0 .202.463c.13.13.287.195.471.195a.642.642 0 0 0 .472-.195l1.242-1.242v4.727c0 .18.065.335.195.464.13.13.29.195.479.195.18 0 .334-.065.464-.195a.634.634 0 0 0 .195-.464Z" />
                <path
                    fillRule="evenodd"
                    d="M19.686 6.074H12.95l-.501-1.606c-.127-.403-.383-.748-.768-1.036-.386-.288-.792-.432-1.218-.432H5.074c-.426 0-.835.144-1.226.432-.391.288-.65.633-.777 1.036L2.069 7.68c-.023.081-.04.165-.052.25a.79.79 0 0 0 0 .234.353.353 0 0 0-.017.112v10.095c0 .645.225 1.192.674 1.641.449.45.996.674 1.64.674h15.372c.633 0 1.177-.225 1.632-.674.455-.449.682-.996.682-1.64V8.388c0-.645-.227-1.192-.682-1.641a2.241 2.241 0 0 0-1.632-.674Zm-8.653-.794.19.794H4.314l.19-.794a.998.998 0 0 1 .363-.527.938.938 0 0 1 .587-.216h4.629c.207 0 .403.072.587.216.184.144.305.32.363.527ZM3.537 17.61V9.15c0-.426.15-.79.45-1.089a1.48 1.48 0 0 1 1.087-.449h13.852c.426 0 .788.15 1.088.45.3.299.449.662.449 1.088v8.462c0 .426-.15.79-.45 1.088-.299.3-.661.45-1.087.45H5.074c-.426 0-.788-.15-1.088-.45a1.479 1.479 0 0 1-.449-1.088Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconFolderArrowUp24);
export default Memo;
