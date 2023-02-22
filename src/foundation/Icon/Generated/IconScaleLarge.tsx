import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconScaleLarge12 from './IconScaleLarge12';
import IconScaleLarge16 from './IconScaleLarge16';
import IconScaleLarge20 from './IconScaleLarge20';
import IconScaleLarge24 from './IconScaleLarge24';
import IconScaleLarge32 from './IconScaleLarge32';

const IconScaleLarge = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconScaleLarge12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconScaleLarge16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconScaleLarge20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconScaleLarge24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconScaleLarge32 {...props} />}
        </span>
    );
};
IconScaleLarge.displayName = 'FondueIconScaleLarge';

export default memo(IconScaleLarge);
