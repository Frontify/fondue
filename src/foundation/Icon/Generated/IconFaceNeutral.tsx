import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFaceNeutral12Filled from './IconFaceNeutral12Filled';
import IconFaceNeutral12 from './IconFaceNeutral12';
import IconFaceNeutral16Filled from './IconFaceNeutral16Filled';
import IconFaceNeutral16 from './IconFaceNeutral16';
import IconFaceNeutral20Filled from './IconFaceNeutral20Filled';
import IconFaceNeutral20 from './IconFaceNeutral20';
import IconFaceNeutral24Filled from './IconFaceNeutral24Filled';
import IconFaceNeutral24 from './IconFaceNeutral24';
import IconFaceNeutral32Filled from './IconFaceNeutral32Filled';
import IconFaceNeutral32 from './IconFaceNeutral32';

const IconFaceNeutral = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconFaceNeutral12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconFaceNeutral12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconFaceNeutral16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFaceNeutral16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconFaceNeutral20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFaceNeutral20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconFaceNeutral24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFaceNeutral24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconFaceNeutral32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFaceNeutral32 {...props} />}
        </span>
    );
};
IconFaceNeutral.displayName = 'FondueIconFaceNeutral';

export default memo(IconFaceNeutral);
