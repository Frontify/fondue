import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconListNumbers12 from './IconListNumbers12';
import IconListNumbers16 from './IconListNumbers16';
import IconListNumbers20 from './IconListNumbers20';
import IconListNumbers24 from './IconListNumbers24';
import IconListNumbers32 from './IconListNumbers32';

const IconListNumbers = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconListNumbers12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconListNumbers16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconListNumbers20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconListNumbers24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconListNumbers32 {...props} />}
        </span>
    );
};
IconListNumbers.displayName = 'FondueIconListNumbers';

export default memo(IconListNumbers);
