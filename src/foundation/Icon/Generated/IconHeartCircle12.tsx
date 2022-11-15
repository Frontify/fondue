import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeartCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHeartCircle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm-8.398-.365c-.073-.311-.037-.603.308-.949.238-.237.4-.28.476-.29a.568.568 0 0 1 .324.07 1.748 1.748 0 0 1 .498.404l.001.002a1 1 0 0 0 1.582 0v-.001a1.746 1.746 0 0 1 .498-.404.568.568 0 0 1 .325-.071c.076.01.238.053.475.29.346.346.382.638.308.95-.092.392-.384.865-.84 1.366A10.11 10.11 0 0 1 6 8.363a10.11 10.11 0 0 1-1.557-1.362c-.456-.5-.748-.973-.84-1.366ZM6 4.26s.296-.39.764-.646c.522-.288 1.258-.41 2.032.365C11.194 6.376 6 9.572 6 9.572S.806 6.376 3.203 3.98c.775-.774 1.51-.653 2.033-.365.468.257.764.646.764.646Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconHeartCircle12);
