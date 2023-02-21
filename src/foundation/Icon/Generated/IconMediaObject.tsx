import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObject12 from './IconMediaObject12';
import IconMediaObject16 from './IconMediaObject16';
import IconMediaObject20 from './IconMediaObject20';
import IconMediaObject24 from './IconMediaObject24';
import IconMediaObject32 from './IconMediaObject32';

const IconMediaObject = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObject12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObject16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObject20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObject24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObject32 {...props} />}
        </span>
    );
};

const MemoizedIconMediaObject = memo(IconMediaObject);
MemoizedIconMediaObject.displayName = 'FondueIconMediaObject';

export default MemoizedIconMediaObject;
