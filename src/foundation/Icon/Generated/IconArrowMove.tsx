import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowMove12 from './IconArrowMove12';
import IconArrowMove16 from './IconArrowMove16';
import IconArrowMove20 from './IconArrowMove20';
import IconArrowMove24 from './IconArrowMove24';
import IconArrowMove32 from './IconArrowMove32';

const IconArrowMove = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowMove12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowMove16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowMove20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowMove24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowMove32 {...props} />}
        </span>
    );
};
IconArrowMove.displayName = 'FondueIconArrowMove';

export default memo(IconArrowMove);
