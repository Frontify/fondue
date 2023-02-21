import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconExclamationMarkCircle12Filled from './IconExclamationMarkCircle12Filled';
import IconExclamationMarkCircle12 from './IconExclamationMarkCircle12';
import IconExclamationMarkCircle16Filled from './IconExclamationMarkCircle16Filled';
import IconExclamationMarkCircle16 from './IconExclamationMarkCircle16';
import IconExclamationMarkCircle20Filled from './IconExclamationMarkCircle20Filled';
import IconExclamationMarkCircle20 from './IconExclamationMarkCircle20';
import IconExclamationMarkCircle24Filled from './IconExclamationMarkCircle24Filled';
import IconExclamationMarkCircle24 from './IconExclamationMarkCircle24';
import IconExclamationMarkCircle32Filled from './IconExclamationMarkCircle32Filled';
import IconExclamationMarkCircle32 from './IconExclamationMarkCircle32';

const IconExclamationMarkCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconExclamationMarkCircle12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconExclamationMarkCircle12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconExclamationMarkCircle16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconExclamationMarkCircle16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconExclamationMarkCircle20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconExclamationMarkCircle20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconExclamationMarkCircle24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconExclamationMarkCircle24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconExclamationMarkCircle32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconExclamationMarkCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconExclamationMarkCircle = memo(IconExclamationMarkCircle);
MemoizedIconExclamationMarkCircle.displayName = 'FondueIconExclamationMarkCircle';

export default MemoizedIconExclamationMarkCircle;
