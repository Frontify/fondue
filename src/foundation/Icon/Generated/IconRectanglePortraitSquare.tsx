import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconRectanglePortraitSquare12 from './IconRectanglePortraitSquare12';
import IconRectanglePortraitSquare16 from './IconRectanglePortraitSquare16';
import IconRectanglePortraitSquare20 from './IconRectanglePortraitSquare20';
import IconRectanglePortraitSquare24 from './IconRectanglePortraitSquare24';
import IconRectanglePortraitSquare32 from './IconRectanglePortraitSquare32';

const IconRectanglePortraitSquare = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconRectanglePortraitSquare12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconRectanglePortraitSquare16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconRectanglePortraitSquare20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconRectanglePortraitSquare24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconRectanglePortraitSquare32 {...props} />}
        </span>
    );
};

const MemoizedIconRectanglePortraitSquare = memo(IconRectanglePortraitSquare);
MemoizedIconRectanglePortraitSquare.displayName = 'FondueIconRectanglePortraitSquare';

export default MemoizedIconRectanglePortraitSquare;
