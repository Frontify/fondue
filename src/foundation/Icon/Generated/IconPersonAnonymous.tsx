import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPersonAnonymous12 from './IconPersonAnonymous12';
import IconPersonAnonymous16 from './IconPersonAnonymous16';
import IconPersonAnonymous20 from './IconPersonAnonymous20';
import IconPersonAnonymous24 from './IconPersonAnonymous24';
import IconPersonAnonymous32 from './IconPersonAnonymous32';

const IconPersonAnonymous = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPersonAnonymous12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPersonAnonymous16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPersonAnonymous20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPersonAnonymous24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPersonAnonymous32 {...props} />}
        </span>
    );
};
IconPersonAnonymous.displayName = 'FondueIconPersonAnonymous';

export default memo(IconPersonAnonymous);
