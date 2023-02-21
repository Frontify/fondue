import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFlag12 from './IconFlag12';
import IconFlag16 from './IconFlag16';
import IconFlag20 from './IconFlag20';
import IconFlag24 from './IconFlag24';
import IconFlag32 from './IconFlag32';

const IconFlag = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFlag12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFlag16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFlag20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFlag24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFlag32 {...props} />}
        </span>
    );
};

const MemoizedIconFlag = memo(IconFlag);
MemoizedIconFlag.displayName = 'FondueIconFlag';

export default MemoizedIconFlag;
