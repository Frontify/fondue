import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFaceSad12Filled from './IconFaceSad12Filled';
import IconFaceSad12 from './IconFaceSad12';
import IconFaceSad16Filled from './IconFaceSad16Filled';
import IconFaceSad16 from './IconFaceSad16';
import IconFaceSad20Filled from './IconFaceSad20Filled';
import IconFaceSad20 from './IconFaceSad20';
import IconFaceSad24Filled from './IconFaceSad24Filled';
import IconFaceSad24 from './IconFaceSad24';
import IconFaceSad32Filled from './IconFaceSad32Filled';
import IconFaceSad32 from './IconFaceSad32';

const IconFaceSad = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconFaceSad12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconFaceSad12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconFaceSad16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFaceSad16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconFaceSad20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFaceSad20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconFaceSad24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFaceSad24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconFaceSad32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFaceSad32 {...props} />}
        </span>
    );
};

const MemoizedIconFaceSad = memo(IconFaceSad);
MemoizedIconFaceSad.displayName = 'FondueIconFaceSad';

export default MemoizedIconFaceSad;
