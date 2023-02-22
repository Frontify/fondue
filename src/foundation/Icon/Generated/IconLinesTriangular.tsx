import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLinesTriangular12 from './IconLinesTriangular12';
import IconLinesTriangular16 from './IconLinesTriangular16';
import IconLinesTriangular20 from './IconLinesTriangular20';
import IconLinesTriangular24 from './IconLinesTriangular24';
import IconLinesTriangular32 from './IconLinesTriangular32';

const IconLinesTriangular = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLinesTriangular12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLinesTriangular16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLinesTriangular20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLinesTriangular24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLinesTriangular32 {...props} />}
        </span>
    );
};
IconLinesTriangular.displayName = 'FondueIconLinesTriangular';

export default memo(IconLinesTriangular);
