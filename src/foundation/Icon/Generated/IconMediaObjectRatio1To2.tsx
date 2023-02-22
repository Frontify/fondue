import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectRatio1To212 from './IconMediaObjectRatio1To212';
import IconMediaObjectRatio1To216 from './IconMediaObjectRatio1To216';
import IconMediaObjectRatio1To220 from './IconMediaObjectRatio1To220';
import IconMediaObjectRatio1To224 from './IconMediaObjectRatio1To224';
import IconMediaObjectRatio1To232 from './IconMediaObjectRatio1To232';

const IconMediaObjectRatio1To2 = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectRatio1To212 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectRatio1To216 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectRatio1To220 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectRatio1To224 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio1To232 {...props} />}
        </span>
    );
};
IconMediaObjectRatio1To2.displayName = 'FondueIconMediaObjectRatio1To2';

export default memo(IconMediaObjectRatio1To2);
