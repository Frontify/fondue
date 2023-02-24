import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLightning12Filled from './IconLightning12Filled';
import IconLightning12 from './IconLightning12';
import IconLightning16Filled from './IconLightning16Filled';
import IconLightning16 from './IconLightning16';
import IconLightning20Filled from './IconLightning20Filled';
import IconLightning20 from './IconLightning20';
import IconLightning24Filled from './IconLightning24Filled';
import IconLightning24 from './IconLightning24';
import IconLightning32Filled from './IconLightning32Filled';
import IconLightning32 from './IconLightning32';

const IconLightning = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconLightning12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconLightning12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconLightning16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLightning16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconLightning20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLightning20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconLightning24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLightning24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconLightning32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLightning32 {...props} />}
        </span>
    );
};
IconLightning.displayName = 'FondueIconLightning';

export default memo(IconLightning);
