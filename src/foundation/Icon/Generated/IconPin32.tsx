import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPin32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m19.944 16.128-.705.48-.142.84-.719 4.23a1 1 0 0 1-1.693.54l-6.903-6.903a1 1 0 0 1 .54-1.694l4.23-.718.84-.143.48-.704 3.784-5.566a1 1 0 0 1 1.534-.145l4.464 4.465a1 1 0 0 1-.144 1.534l-5.566 3.784ZM9.987 11.65l4.23-.719 3.785-5.565a3 3 0 0 1 4.602-.435l4.465 4.465a3 3 0 0 1-.435 4.602l-5.566 3.784-.718 4.23c-.408 2.402-3.357 3.342-5.079 1.62l-2.723-2.723a.914.914 0 0 1-.021.022L5.72 27.738a1 1 0 0 1-1.414-1.414l6.807-6.807a.914.914 0 0 1 .022-.022L8.368 16.73c-1.722-1.723-.782-4.671 1.62-5.08Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin32);
