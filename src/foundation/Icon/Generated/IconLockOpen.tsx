import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLockOpen12Filled from './IconLockOpen12Filled';
import IconLockOpen12 from './IconLockOpen12';
import IconLockOpen16Filled from './IconLockOpen16Filled';
import IconLockOpen16 from './IconLockOpen16';
import IconLockOpen20Filled from './IconLockOpen20Filled';
import IconLockOpen20 from './IconLockOpen20';
import IconLockOpen24Filled from './IconLockOpen24Filled';
import IconLockOpen24 from './IconLockOpen24';
import IconLockOpen32Filled from './IconLockOpen32Filled';
import IconLockOpen32 from './IconLockOpen32';

const IconLockOpen = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconLockOpen12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconLockOpen12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconLockOpen16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLockOpen16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconLockOpen20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLockOpen20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconLockOpen24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLockOpen24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconLockOpen32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLockOpen32 {...props} />}
        </span>
    );
};
IconLockOpen.displayName = 'FondueIconLockOpen';

export default memo(IconLockOpen);
