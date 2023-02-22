import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStackHorizontalAltFour12 from './IconStackHorizontalAltFour12';
import IconStackHorizontalAltFour16 from './IconStackHorizontalAltFour16';
import IconStackHorizontalAltFour20 from './IconStackHorizontalAltFour20';
import IconStackHorizontalAltFour24 from './IconStackHorizontalAltFour24';
import IconStackHorizontalAltFour32 from './IconStackHorizontalAltFour32';

const IconStackHorizontalAltFour = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconStackHorizontalAltFour12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStackHorizontalAltFour16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStackHorizontalAltFour20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStackHorizontalAltFour24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStackHorizontalAltFour32 {...props} />}
        </span>
    );
};
IconStackHorizontalAltFour.displayName = 'FondueIconStackHorizontalAltFour';

export default memo(IconStackHorizontalAltFour);
