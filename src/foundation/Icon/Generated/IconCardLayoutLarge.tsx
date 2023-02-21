import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCardLayoutLarge12 from './IconCardLayoutLarge12';
import IconCardLayoutLarge16 from './IconCardLayoutLarge16';
import IconCardLayoutLarge20 from './IconCardLayoutLarge20';
import IconCardLayoutLarge24 from './IconCardLayoutLarge24';
import IconCardLayoutLarge32 from './IconCardLayoutLarge32';

const IconCardLayoutLarge = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCardLayoutLarge12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCardLayoutLarge16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCardLayoutLarge20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCardLayoutLarge24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCardLayoutLarge32 {...props} />}
        </span>
    );
};

const MemoizedIconCardLayoutLarge = memo(IconCardLayoutLarge);
MemoizedIconCardLayoutLarge.displayName = 'FondueIconCardLayoutLarge';

export default MemoizedIconCardLayoutLarge;
