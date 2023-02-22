import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPin12Filled from './IconPin12Filled';
import IconPin12 from './IconPin12';
import IconPin16Filled from './IconPin16Filled';
import IconPin16 from './IconPin16';
import IconPin20Filled from './IconPin20Filled';
import IconPin20 from './IconPin20';
import IconPin24Filled from './IconPin24Filled';
import IconPin24 from './IconPin24';
import IconPin32Filled from './IconPin32Filled';
import IconPin32 from './IconPin32';

const IconPin = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconPin12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconPin12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconPin16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPin16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconPin20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPin20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconPin24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPin24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconPin32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPin32 {...props} />}
        </span>
    );
};
IconPin.displayName = 'FondueIconPin';

export default memo(IconPin);
