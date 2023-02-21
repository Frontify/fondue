import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPuzzle12 from './IconPuzzle12';
import IconPuzzle16 from './IconPuzzle16';
import IconPuzzle20 from './IconPuzzle20';
import IconPuzzle24 from './IconPuzzle24';
import IconPuzzle32 from './IconPuzzle32';

const IconPuzzle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPuzzle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPuzzle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPuzzle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPuzzle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPuzzle32 {...props} />}
        </span>
    );
};

const MemoizedIconPuzzle = memo(IconPuzzle);
MemoizedIconPuzzle.displayName = 'FondueIconPuzzle';

export default MemoizedIconPuzzle;
