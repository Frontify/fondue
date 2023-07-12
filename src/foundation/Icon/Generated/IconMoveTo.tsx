import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMoveTo12 from './IconMoveTo12';
import IconMoveTo16 from './IconMoveTo16';
import IconMoveTo20 from './IconMoveTo20';
import IconMoveTo24 from './IconMoveTo24';
import IconMoveTo32 from './IconMoveTo32';

const IconMoveTo = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMoveTo12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMoveTo16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMoveTo20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMoveTo24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMoveTo32 {...props} />}
        </span>
    );
};
IconMoveTo.displayName = 'FondueIconMoveTo';

export default memo(IconMoveTo);
