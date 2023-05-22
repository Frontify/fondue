import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDoAndDont12 from './IconDoAndDont12';
import IconDoAndDont16 from './IconDoAndDont16';
import IconDoAndDont20 from './IconDoAndDont20';
import IconDoAndDont24 from './IconDoAndDont24';
import IconDoAndDont32 from './IconDoAndDont32';

const IconDoAndDont = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDoAndDont12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDoAndDont16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDoAndDont20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDoAndDont24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDoAndDont32 {...props} />}
        </span>
    );
};
IconDoAndDont.displayName = 'FondueIconDoAndDont';

export default memo(IconDoAndDont);
