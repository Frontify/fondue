import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSpeakerOff24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSpeakerOff24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.286 9.75h.584l.43-.396 3.2-2.939v11.17l-3.2-2.94-.43-.395H5a.5.5 0 0 1-.5-.5v-3.5a.5.5 0 0 1 .5-.5h2.286ZM3 10.25a2 2 0 0 1 2-2h2.286l4.037-3.71c.642-.589 1.677-.134 1.677.737v13.446c0 .87-1.035 1.326-1.677.737l-4.037-3.71H5a2 2 0 0 1-2-2v-3.5Zm17.782-1.03a.75.75 0 0 1 0 1.06L19.062 12l1.72 1.721a.75.75 0 0 1-1.06 1.061L18 13.062l-1.72 1.72a.75.75 0 0 1-1.061-1.06L16.94 12l-1.72-1.72a.75.75 0 1 1 1.06-1.061L18 10.94l1.721-1.72a.75.75 0 0 1 1.061 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSpeakerOff24);
