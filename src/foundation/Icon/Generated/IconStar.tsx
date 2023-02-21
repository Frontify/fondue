import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStar12Filled from './IconStar12Filled';
import IconStar12 from './IconStar12';
import IconStar16Filled from './IconStar16Filled';
import IconStar16 from './IconStar16';
import IconStar20Filled from './IconStar20Filled';
import IconStar20 from './IconStar20';
import IconStar24Filled from './IconStar24Filled';
import IconStar24 from './IconStar24';
import IconStar32Filled from './IconStar32Filled';
import IconStar32 from './IconStar32';

const IconStar = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconStar12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconStar12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconStar16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStar16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconStar20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStar20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconStar24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStar24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconStar32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStar32 {...props} />}
        </span>
    );
};

const MemoizedIconStar = memo(IconStar);
MemoizedIconStar.displayName = 'FondueIconStar';

export default MemoizedIconStar;
