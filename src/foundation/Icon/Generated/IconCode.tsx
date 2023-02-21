import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCode12 from './IconCode12';
import IconCode16 from './IconCode16';
import IconCode20 from './IconCode20';
import IconCode24 from './IconCode24';
import IconCode32 from './IconCode32';

const IconCode = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCode12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCode16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCode20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCode24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCode32 {...props} />}
        </span>
    );
};

const MemoizedIconCode = memo(IconCode);
MemoizedIconCode.displayName = 'FondueIconCode';

export default MemoizedIconCode;
