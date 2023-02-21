import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFaceExtraHappy12 from './IconFaceExtraHappy12';
import IconFaceExtraHappy16 from './IconFaceExtraHappy16';
import IconFaceExtraHappy20 from './IconFaceExtraHappy20';
import IconFaceExtraHappy24 from './IconFaceExtraHappy24';
import IconFaceExtraHappy32 from './IconFaceExtraHappy32';

const IconFaceExtraHappy = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFaceExtraHappy12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFaceExtraHappy16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFaceExtraHappy20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFaceExtraHappy24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFaceExtraHappy32 {...props} />}
        </span>
    );
};

const MemoizedIconFaceExtraHappy = memo(IconFaceExtraHappy);
MemoizedIconFaceExtraHappy.displayName = 'FondueIconFaceExtraHappy';

export default MemoizedIconFaceExtraHappy;
