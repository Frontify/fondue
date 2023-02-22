import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconGridRegular12Filled from './IconGridRegular12Filled';
import IconGridRegular12 from './IconGridRegular12';
import IconGridRegular16Filled from './IconGridRegular16Filled';
import IconGridRegular16 from './IconGridRegular16';
import IconGridRegular20Filled from './IconGridRegular20Filled';
import IconGridRegular20 from './IconGridRegular20';
import IconGridRegular24Filled from './IconGridRegular24Filled';
import IconGridRegular24 from './IconGridRegular24';
import IconGridRegular32Filled from './IconGridRegular32Filled';
import IconGridRegular32 from './IconGridRegular32';

const IconGridRegular = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconGridRegular12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconGridRegular12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconGridRegular16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconGridRegular16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconGridRegular20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconGridRegular20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconGridRegular24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconGridRegular24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconGridRegular32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconGridRegular32 {...props} />}
        </span>
    );
};
IconGridRegular.displayName = 'FondueIconGridRegular';

export default memo(IconGridRegular);
