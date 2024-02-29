/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconClipboard } from '@frontify/fondue-icons';
import { useState } from 'react';

type CopyButtonProps = {
    onClick: (successCallback: () => void) => void;
};
export const CopyCodeButton = ({ onClick }: CopyButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copiedSuccessfully, setCopiedSuccessfully] = useState(false);
    const handleButtonClick = () => {
        onClick(() => {
            setCopiedSuccessfully(true);
            setTimeout(() => {
                setCopiedSuccessfully(false);
            }, 3000);
        });
    };
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleButtonClick}
            className="tw-absolute tw-rounded-br tw-mx-2 tw-bottom-2 tw-right-0 tw-text-sm tw-text-text-weak "
        >
            <div
                className={`tw-transition-all tw-duration-500 tw-flex tw-overflow-hidden tw-absolute tw-right-0 tw-bottom-0 ${copiedSuccessfully ? '-tw-translate-y-full tw-opacity-0' : 'tw-opacity-1'}`}
            >
                <span
                    className={`tw-pr-2 tw-transition-all tw-duration-500 tw-whitespace-nowrap  ${isHovered ? 'tw-opacity-100' : 'tw-translate-x-full tw-opacity-0'}`}
                >
                    Copy to clipboard
                </span>
                <div className="tw-bg-[#011627] tw-z-10">
                    <IconClipboard size={20} />
                </div>
            </div>
            <div
                className={`tw-transition-all tw-duration-500 tw-flex tw-overflow-hidden tw-absolute tw-right-0 tw-bottom-0 ${!copiedSuccessfully ? 'tw-translate-y-full tw-opacity-0' : 'tw-opacity-1'}`}
            >
                <span className={'tw-pr-2 tw-whitespace-nowrap'}>Copied Successfully</span>
                <div className="tw-bg-[#011627] tw-z-10">
                    <IconCheckMark size={20} />
                </div>
            </div>
        </button>
    );
};
