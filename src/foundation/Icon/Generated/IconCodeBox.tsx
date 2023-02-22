import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCodeBox12 from './IconCodeBox12';
import IconCodeBox16 from './IconCodeBox16';
import IconCodeBox20 from './IconCodeBox20';
import IconCodeBox24 from './IconCodeBox24';
import IconCodeBox32 from './IconCodeBox32';

const IconCodeBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCodeBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCodeBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCodeBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCodeBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCodeBox32 {...props} />}
        </span>
    );
};
IconCodeBox.displayName = 'FondueIconCodeBox';

export default memo(IconCodeBox);
