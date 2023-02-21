import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCountry12 from './IconCountry12';
import IconCountry16 from './IconCountry16';
import IconCountry20 from './IconCountry20';
import IconCountry24 from './IconCountry24';
import IconCountry32 from './IconCountry32';

const IconCountry = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCountry12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCountry16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCountry20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCountry24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCountry32 {...props} />}
        </span>
    );
};

const MemoizedIconCountry = memo(IconCountry);
MemoizedIconCountry.displayName = 'FondueIconCountry';

export default MemoizedIconCountry;
