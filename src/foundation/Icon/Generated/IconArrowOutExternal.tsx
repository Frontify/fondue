import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowOutExternal12 from './IconArrowOutExternal12';
import IconArrowOutExternal16 from './IconArrowOutExternal16';
import IconArrowOutExternal20 from './IconArrowOutExternal20';
import IconArrowOutExternal24 from './IconArrowOutExternal24';
import IconArrowOutExternal32 from './IconArrowOutExternal32';

const IconArrowOutExternal = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowOutExternal12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowOutExternal16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowOutExternal20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowOutExternal24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowOutExternal32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowOutExternal = memo(IconArrowOutExternal);
MemoizedIconArrowOutExternal.displayName = 'FondueIconArrowOutExternal';

export default MemoizedIconArrowOutExternal;
