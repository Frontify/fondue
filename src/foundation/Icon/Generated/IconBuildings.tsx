import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBuildings12 from './IconBuildings12';
import IconBuildings16 from './IconBuildings16';
import IconBuildings20 from './IconBuildings20';
import IconBuildings24 from './IconBuildings24';
import IconBuildings32 from './IconBuildings32';

const IconBuildings = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBuildings12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBuildings16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBuildings20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBuildings24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBuildings32 {...props} />}
        </span>
    );
};

const MemoizedIconBuildings = memo(IconBuildings);
MemoizedIconBuildings.displayName = 'FondueIconBuildings';

export default MemoizedIconBuildings;
